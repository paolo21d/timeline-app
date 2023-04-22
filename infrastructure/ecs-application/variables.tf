variable "full_app_name" {
  type        = string
  description = "Unique app name, e.g. system-dev-app1"
}

variable "region" {
  type        = string
  description = "the AWS region in which resources are created"
}

variable "vpc_id" {
  type        = string
  description = "The VPC ID"
}

variable "subnets" {
  type        = list
  description = "List of subnet IDs"
}

variable "alb_listener_arn" {
  type        = string
  description = "ID of created load balancer"
}

variable "alb_listener_port" {
  type        = number
  description = "ALB port on which this app will be served"
}

variable "alb_route_path" {
  type        = string
  description = "Base path to routing to application. All application endpoints must have this base path as context-path"
}

variable "health_check_path" {
  type        = string
  description = "Http path for task health check"
}

variable "ecs_cluster_id" {
  type        = string
  description = "ID of created ECS Cluster in which ECS Service will be created"
}
variable "ecs_cluster_name" {
  type        = string
  description = "Name of created ECS Cluster in which ECS Service will be created"
}

variable "container_port" {
  type        = number
  description = "Port of container"
}

variable "container_cpu" {
  type        = number
  description = "The number of cpu units used by the task"
}

variable "container_memory" {
  type        = number
  description = "The amount (in MiB) of memory used by the task"
}

variable "container_environment" {
  type        = list
  description = "The container environmnent variables"
}

variable "service_desired_count" {
  type        = number
  description = "Number of services running in parallel"
}

variable "ecs_task_role_policies" {
  type        = list(string)
  description = "ARNs of policies that will be attached to task role"
}