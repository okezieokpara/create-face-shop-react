React product grid
==================

This is my submission to the Creatella take-home assignment. It is built with
React.



[Here](questions.md) is the original question
for the take home assignment.

To run this app, first clone the repository on your local machine. Then run the
following commands:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm install
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Start the server application:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm start-server
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Start the client application:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm start
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The server application runs on `localhost:3000`.
The client application runs on `localhost:4349`. This can be modified by changing the `PORT` value in the `.env` file.

This will start a local development server. Go to `localhost:4349` to see the
app running.

The features implemented are:

-   Product list grid

-   Product sorting using the following parameters: size, price, id. These are
    sorted in ascending order. There is an option for descending order, but it
    is currently disabled, since the API does not implement it

-   The font sizes of faces are displayed based on the “size” attribute of the
    product

-   The prices are formatted in dollars e.g \$3.51

-   The date field is relative e.g “3 days ago” but if more than 7 days, then
    the full date is displayed.

-   The product grid automatically loads more products as the users scrolls down

-   At the end of the catalouge, the message: “\~end of catalogue\~” is
    displayed.

### Ad features

-   Ads are displayed after every 20 products.

-   Ads are randomized and are guaranteed to be unique

