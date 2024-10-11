# README

SETUP
</br>
In order to run this app You will need a mock database to fetch from since it has no backend. the localhost i am fetching from is port:8088 I have another repo in github with a mock database.json  file called vinyl-miner-api. I use json-server package.

I also am using Vite and running it on localhost:5173 

once those are running the app should be functional.

PURPOSE
</br>
As a vinyl collector myself I wanted to create a system that would make logging and organizing my collection way easier while also interacting with other vinyl collectors through means of liking and trading.

NAVIGATE
</br>

**signing in and registering**
</br>
As a user I want to be able to sign in as a user or create a profile if I am new to the site.
Given I am a new User I will click Not a member yet? and be navigated to the registry page then I can enter the necessary information to register

**Viewing and interacting with new vinyl additions**
</br>
As a  user, I  want to view other users additions to their collection so that I can interact with them by liking and possibly trading with them.  
  the user should be able to view all new additions to any users collection.
 Given the current user is logged in when he is on the home page he then will  see  all the new additions .  Given the user wants to see the  details of any vinyl created  by any user. When the user clicks the vinyl element of said vinyl then they will be showen a display of details and options to interact with it.


**Viewing profiles**
</br>
As a user I want to view other users profiles or my own so that I can interact with specific users.
Given a user is viewing an addition from another user when they click the name of said user then they will be navigated to said users profile.
Given the user is viewing a profile they will see information about the user and  be given the option to view his collection. When the user wants to see the viewed users collection then he should be able to navigate to his list of vinyl in his collection.

**Making new additions** 
</br>
As a user I want to be able to add to my collection so that others and I can view them.
New Items should show up in my collection when viewed by myself or others. 
Given I have added a new item to my collection when I view my collection then the new Item I just made should be displayed alongside the rest.
New Items should also show up in new additions for all users to see.
Given I have just made a new addition to my collection when other users are viewing all additions then  my new addition should be displayed.

Given I dont want to hunt down the info on the vinyl or the album art I can try to search spotify for the information by entering the artist and or album title then click search spotify. Then if spotify finds the information it will populate for you to confirm or edit.

**Editing and deleting items from collection**
</br>
As a user I want the capability to edit or delete any item in my collection. So that I keep my collection current and accurate.
Items in my collection that are viewed either in my collection or when looking at the details should give the option to edit or delete said item.
Given I am viewing all items  or just in  my collection when I navigate to the items details then I will  be given the option to delete said item or be able to navigate to a different view to edit the item
Given that I am viewing an item in another users collection I will not be able to edit or delete the item.


**Filtering through new additions**
</br>
As a user I want to be able to filter through all the new additions by genre and text so I can target specific items of my choosing.
Given I want to only view rock albums  when I change the genre filter only the items with the genre rock will appear.
Given I want to view a specific artist or album i can search the names that match and the items that match will only appear.


**Trading**
</br>
As a user I want to be able to trade items in my collection with items in others collections. That way I can further enhance my collection and other users can do the same.

Initiate a trade
Given I am viewing another users items in their collection I should be able to initiate a trade for that specific item in return I will offer an item in my collection then the other user will be notified of the trade and can accept or decline

Viewing pending trades and offers
Given I have made some trade offers I will be able to view all the pending trades. When the other user accepts a trade the items in question will go to my collection and  my offered item to the opposing users collection. If they decline the pending trade will go away.

Viewing trade offers from other users
Given other users have offered to trade for something in my collection I will be able to accept their trade or decline it.

**likes**
</br>
As a user I want to be able to show my enthusiasm for another users vinyl.
Given I like an item in someone else's vinyl collection I will be able to click the heart icon that will then add a like to the current vinyl. Then the total number of likes that is displayed next to the icon will increment. If I press the icon again it will remove that like and decrement the count.

**followers**
</br>
As a user I want to be able to follow my favorite Collectors so I can easly view there collection.
Given I am viewing a users collection I will be able to follow that user by clicking the follow button by said users name. Then that user will be added to my followers list which I can view in my profile page.

Given I want to know how many followers I or other users have have or I want to see how many people are following them or I. I will be able to see that when viewing their or my profile. by clicking the followers or following button I will be able to see the specific users.

Given I want to delete a follower I will be able to either click delete next to said follower in my following list or click unfollow in there collection page.