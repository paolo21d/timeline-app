variable "system_name" {
  type        = string
  description = "the name of your stack, e.g. \"demo\""
  default     = "timeline-app"
}

variable "environment" {
  type        = string
  description = "the name of your environment, e.g. \"prod\""
}

variable "aws_region" {
  type        = string
  description = "AWS region to launch servers."
  default     = "eu-west-1"
}

variable "vpc_cidr" {
  type        = string
  description = "The CIDR block for the VPC."
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "a comma-separated list of availability zones, defaults to all AZ of the region, if set to something other than the defaults, both private_subnets and public_subnets have to be defined as well"
  default     = ["eu-west-1a", "eu-west-1b"]
}

variable "private_subnets" {
  description = "a list of CIDRs for private subnets in your VPC, must be set if the cidr variable is defined, needs to have as many elements as there are availability zones"
  default     = ["10.0.0.0/20", "10.0.32.0/20"]
}

variable "public_subnets" {
  description = "a list of CIDRs for public subnets in your VPC, must be set if the cidr variable is defined, needs to have as many elements as there are availability zones"
  default     = ["10.0.16.0/20", "10.0.48.0/20"]
}

variable "db_username" {
  description = "User name for database"
}

variable "db_password" {
  description = "Password for database"
}