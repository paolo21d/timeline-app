variable "system_name_with_environment" {
  type        = string
  description = "name of system with environment, e.g. system-dev"
}

variable "cidr" {
  type        = string
  description = "The CIDR block for the VPC."
}

variable "public_subnets" {
  description = "List of public subnets"
}

#variable "private_subnets" {
#  description = "List of private subnets"
#}

variable "availability_zones" {
  description = "List of availability zones"
}
