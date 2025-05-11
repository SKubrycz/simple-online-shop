# Simple online shop

## Approach
The most significant part of the task provided was data persistence and manipulation. I decided to make a custom React hook that could be attached to where needed, making the storage more reusable and covenient.
Project folder structure divides components into two groups: ones which provide a whole page view (/page) and smaller elements (/components), such as CartItem which are contained in page components.
Based on the task, there are four mandatory pages. There is also an additional one that leads to the product list. Items to choose from are mapped according to the state variable. The item amount is displayed in the ShoppingCart view and is limited to maximum of 99.
Every page has their redirecting links to move on to another one or go back to the previous. Once the user has filled the shopping cart, there is a possibility to go to the summary and then order confirmation. If the user proceeds to the OrderConfirmation view, another state displays the products summary and the shopping cart is cleared.
The whole process of identifying products for modification was based on products IDs included in .json file.


## Launching the app
### Here are the steps which have to be taken in order to run the application:

> *After cloning the repository, inside /simple-online-shop directory*

NPM packages installation:
```console
npm install
```

Once all dependencies are installed, the app can be started:
```console
npm run dev
```

The app is served at: `http://localhost:5173/`
