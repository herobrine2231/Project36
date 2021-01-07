class Food
{

    constructor()
    {
        
        this.foodStock=0;
        this.lastFed;
        this.image=loadImage("images/Milk.png");

    }

    getFoodStock()
    {
            return this.foodStock;
    }

    updateFoodStock(foodStock)
    {
       this.foodStock=foodStock;
    }

    deductFoodStock()
    {
       if(this.foodStock>0)
       {
           this.foodStock= this.foodStock-1;
       }
    }

    getFedTime(lastFed)
    {
        this.lastFed=lastFed;
    }

    

    display()
    {
        background(46,139,87);
        fill(255,255,254);
        textSize(15);
        if(lastFed>=12)
         {
            text("Last Feed: "+ lastFed%12 + "PM", 400,30)
         }
        else if(lastFed==0)
        {
        text("Last Feed: 12 AM", 400,30);
         }
        else
        {
        text("Last Feed: " +lastFed +"AM", 400,30);
        }
        var x=80,y=100;

        imageMode(CENTER);
      //  image(this.image,100,100,50,50);

        if(this.foodStock!=0)
        {
            for(var i=0; i<this.foodStock; i++)
            {
                if(i%10==0)
                {
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }
    
    bedroom()
    {
      background(bedroomImage,550,500);
    
    }
    
       garden()
    {
      background(gardenImage,550,500);
      
    }
    
       washroom()
    {
      background(washroomImage,550,500);
    }
}