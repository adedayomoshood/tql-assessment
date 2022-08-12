# Details

This app is built with Typescript, by Adedayo Moshood, as an assessment for the TalentQL Pipeline Program.

## How does this work?

The app is built such that the current page is can be gotten from the url.

On load of the app, it get the current page from the url. If the page is not passed to the url or a string is passed to the page, it fetched the data for page 1. On fetch of the date, it stores the page number, and the result that was fetched in a global variable named `fetchedPageNumber` and `fetchedData` respectively.


The table is populated with a `populateTable` method, which accepts a users array and page number.

Depending on the page that was fetched, the `Previous` button is either disabled or enabled. If the currrent page is 1, the previous button is disabled while if it is above 1, the previous button is enabled.

I have a `goToPage` method, which accepts `direction`, either `next` or `previous` and handles the paginanion.

When the Next Button is clicked, it checks it the next page is equal to `fetchedPageNumber + 1`. If the page is, `populateTable` method is called and `fetchedData[page]` and `page` are passed to the method. If the page is not equal to `fetchedPageNumber + 1`, an API call is made to get the data for the page.

When the Previous Button is clicked, it checks it the previous page is equal to `fetchedPageNumber`. If the page is, `populateTable` method is called and `fetchedData[page]` and `page` are passed to the method. If the page is not`fetchedPageNumber`, an API call is made to get the data for the page.

During data fetching, the Next and Previous buttons are disabled, to prevent the user from clicking while data fetching is ongoing. There is also a loading indicator on the table to show the user that data fetching is ongoing.

When there's a network error or an API error, an alert is shown to let the user know what the error is.