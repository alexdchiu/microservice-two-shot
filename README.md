# Wardrobify

Team:

* Bryant Irawan - shoes
* Alex Chiu - hats

## Design

## Shoes microservice

Explain your models and integration with the wardrobe
microservice, here.

## Hats microservice

My models are Hats and LocationVO. I made Location a VO because once I created an instance of a Location within the Wardrobe microservice, within the context of the hats microservice, the Location was not changing. Therefore I believed that it should be a VO once it entered the Hats microservice. The hat model is an entity in the hats microservice since this could be changed within the microservices model. 
