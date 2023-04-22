variable "system_name_with_environment" {
  type        = string
  description = "name of system with environment, e.g. system-dev"
}

variable "vpc_id" {
  type        = string
  description = "The VPC ID"
}

variable "subnets" {
  description = "Comma separated list of subnet IDs"
}

variable "alb_listener_port" {
  type        = number
  description = "Port on which listener will listen"
}