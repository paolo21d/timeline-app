variable "system_name_with_environment" {
  type        = string
  description = "name of system with environment, e.g. system-dev"
}

variable "username" {
  description = "username for created DB"
}

variable "password" {
  description = "password for created DB"
}

variable "vpc_id" {
  description = "The VPC ID"
}

variable "subnets" {
  description = "Comma separated list of subnet IDs"
}