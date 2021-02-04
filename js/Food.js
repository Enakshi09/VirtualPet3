

class food{
     constructor(){
         this.foodStock=0
         this.lastFeed
         this.image=loadImage("images/milk.png")
     }
     updateFoodStock(foodStock){
     this.foodStock=foodStock
     }
     getFeedTime(lastFeed){
         this.lastFeed=lastFeed
     }
     getFoodStock(){
         return(this.foodStock)
     }
     deductFood(){
         if(this.foodStock>0){
             this.foodStock=this.foodStock-1
         }
     }
     bedroom(){
         background(bedroomImg,500,200)
     }
     garden(){
         background(gardenImg,500,200)
     }
     washroom(){
         background(washroomImg,500,200)
     }

     

     display(){
      var x = 80, y = 100
      imageMode(CENTER)
      image(this.image,720,220,70,70)
      if(this.foodStock!=0){
          for(var i = 0;i <this.foodStock;i++){
              if(i%10==0){
                  x=80
                  y=y+50 
              }
              image(this.image,x,y,50,50)
              x=x+30
          }
      }
     }
}
