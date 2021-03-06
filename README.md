# Assignment for junior developer application (Reaktor 2020)

### Table of Contents
- [Heroku link](https://github.com/ematan/warehouse-front#link-to-running-version-in-heroku)
- [Implemented features](https://github.com/ematan/warehouse-front#implemented-features)
- [Personal Comments](https://github.com/ematan/warehouse-front#personal-comments)
- [Instructions](https://github.com/ematan/warehouse-front#instructions)

Link to running version in heroku
--------------------------------
https://thawing-plateau-33439.herokuapp.com/
Note: pushed to heroku with devDependences, so Redux DevTools should function with the app now! :)

Implemented features
--------------

- fetch each item category from api
- fetch availability by manufacturer from api
- handle empty response by refetching
- save fetched data to store, refetch every 5 minutes
- filtering for each field
- limiting amount of shown items (load time for 1000+ items is unfortunately a bit long)
- simple UI elements with Semantic Ui React

Personal comments
-----------------

I have built this solution with the assumption that a warehouse workers would use a hardware of the size of a tablet or a pc. The UI is not good for mobile width hardware, since the information table would not fit in one row. If this was intended for mobile usage, a different formating of table might be required.

Error handling is admittedly left to minimal.

Personally I am happy to have solved at least some of the slow loading times by hiding fetching and mapping within hooks, but would be happy to hear about optimization more to limit the loading times to minimum.




Instructions
------------
Your client is a clothing brand that is looking for a simple web app to use in their warehouses. To do their work efficiently, the warehouse workers need a fast and simple listing page per product category, where they can check simple product and availability information from a single UI.

There are three product categories they are interested in for now: jackets, shirts, and accessories. Therefore, you should implement three web pages corresponding to those categories that list all the products in a given category. One requirement is to be easily able to switch between product categories quickly. You are free to implement any UI you want, as long as it can display multiple products at once in a straightforward and explicit listing. At this point, it is not necessary to implement filtering or pagination functionality on the page.

The client does not have a ready-made API for this purpose. Instead, they have two different legacy APIs that combined can provide the needed information. The legacy APIs are on critical-maintenance-only mode, and thus further changes to them are not possible. The client knows the APIs are not excellent, but they are asking you to work around any issues in the APIs in your new application. The client has instructed you that both APIs have an internal cache of about 5 minutes.

API documentation is as follows
-------------------------------

- `GET /products/:category` – Return a listing of products in a given category.
- `GET /availability/:manufacturer` – Return a list of availability info.
- The APIs are running at https://bad-api-assignment.reaktor.com/.

Your task is to implement a web application that fits the client brief and host the running solution somewhere where it can be accessed publically (e.g. Heroku). Please include a link to the source code and the running application in your application.

Some pointers you might want to take into account
-------------------------------------------------

- You can keep the UI side simpler than it would be in a real-life situation. You do not need to implement filtering, search, or pagination (unless you really want to).
- Be mindful of page loading speed and error handling in the application code itself, but using free hosting options with long-ish startup times on the first load is fine.
- The API is supposed to resemble working with a real-life legacy API. It has a built-in intentional failure case that you might run into while developing. To ease up reproducing the issue without needing to wait for the next random request failure, we provide a request header: `x-force-error-mode`. Set to `all` to force the failure to reproduce.