terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.57.0"
    }
  }
  #  backend "s3" {
  #    bucket         = "timeline-app-tfstate"
  #    encrypt        = true
  #    key            = "timeline-app-dev.tfstate"
  #    region         = "eu-west-1"
  #    dynamodb_table = "timeline-app-tflock"
  #  }
}

# Configure the AWS Provider
provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      System      = var.system_name
      Environment = var.environment
    }
  }
}

#####
# MODULES
#####
locals {
  system_name_with_environment = "${var.system_name}-${var.environment}"
}

module "vpc" {
  source                       = "./vpc"
  system_name_with_environment = local.system_name_with_environment
  cidr                         = var.vpc_cidr
  public_subnets               = var.public_subnets
  availability_zones           = var.availability_zones
}

module "alb" {
  source                       = "./alb"
  system_name_with_environment = local.system_name_with_environment
  vpc_id                       = module.vpc.id
  subnets                      = module.vpc.public_subnets
  alb_listener_port            = 80 #TODO parametrize this port!
}

module "ecs_cluster" {
  source                       = "./ecs-cluster"
  system_name_with_environment = local.system_name_with_environment
}

module "ecs_app_api" {
  source                = "./ecs-application"
  full_app_name         = "${local.system_name_with_environment}-api"
  region                = var.aws_region
  vpc_id                = module.vpc.id
  subnets               = module.vpc.public_subnets
  alb_listener_arn      = module.alb.load_balancer_listener_arn
  alb_listener_port     = 80 #TODO parametrize this port!
  alb_route_path        = "/api/*"
  health_check_path     = "/api/actuator/health"
  ecs_cluster_id        = module.ecs_cluster.cluster_id
  ecs_cluster_name      = module.ecs_cluster.cluster_name
  container_port        = 8080 #TODO parametrize
  container_environment = [
    {
      name  = "APP_PORT"
      value = 8080
    },
    {
      name  = "DB_URL"
      value = module.rds.address
    },
    {
      name  = "DB_PORT"
      value = module.rds.port
    },
    {
      name  = "DB_NAME"
      value = module.rds.name
    },
    {
      name  = "DB_USERNAME"
      value = module.rds.user_name
    },
    {
      name  = "DB_PASSWORD"
      value = module.rds.password
    }
  ]
  container_cpu          = 256
  container_memory       = 512
  service_desired_count  = 1
  ecs_task_role_policies = []
}

module "rds" {
  source                       = "./rds"
  system_name_with_environment = local.system_name_with_environment
  username                     = var.db_username
  password                     = var.db_password
  vpc_id                       = module.vpc.id
  subnets                      = module.vpc.public_subnets
}