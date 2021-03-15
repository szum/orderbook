## What would you add to your solution if you had more time?

I would make the specs for the Web Socket and reducers more robust with added mock builders. Would have loved to put more love into the design of the app itself. Adding coloured delta bars to display the change in sizes. A notification system for handling the state of the websocket connection (connected, closed, reopened) would have have been nice as well

## What would you have done differently if you knew this page was going to get thousands of views per second vs per week?

I would try to reduce the build size as much as possible. You can run the Webpack bundle analyzer to see which components are contributing the most to the size of the bundle. For a mature app you typically would want to see if you can replace libraries/external dependencies with vanilla JS, since this is a small app atm I opted for as little libraries as possible. Webpack also has a compression plugin that can gzip the bundle file to reduce the size as well.

## What was the most useful feature that was added to the latest version of your chosen language?

Recently it's been a joy to use React's Context API with the useContext hook. It's made managing a global state store incredibly lean and easy to maintain . All of the Websocket logic is contained in the WebsocketContext, it handles connection, disconnection, as well as reconnection. Components can subscribe to the data coming into the context's state without having to resort to prop drilling or Redux (which can be verbose with a lot of unnecessary boilerplate for a small app like this).

Please include a snippet of code that shows how you've used it.

Context Provider: 
https://github.com/szum/orderbook/blob/main/src/components/WebSocketContext/WebSocketContext.tsx

Using the useContext hook:
https://github.com/szum/orderbook/blob/main/src/pages/ProductFeedPage/ProductFeedPage.tsx

## How would you track down a performance issue in production? Have you ever had to do this?

I would test the actual production build of the app. In Chrome Devtools you can record the performance of an app as you're performing certain actions to measure and see if there any bottlenecks in the rendering process. In React you can also use the Profiler API and wrap a Profiler component around a tree of components that are suspect.

In the past I've also used Locust to load test applications, this sort of testing is more about testing the server but could be a good tool to see if the app's performance issues stem from the backend.

## Can you describe common security concerns to consider for a frontend developer?

On the frontend side, since you are mainly developing the client, everything that gets stored in the client browser (localStorage, sessionStorage, cookies) can be possible changed or manipulated by a bad actor. To protect against cross site scripting, I would avoid dangerouslySetInnerHTML in React since it automatically sanitizes inputs so that users cannot insert scripts. Defining the Content-Security-Policy HTTP header would also be something to consider so that you can whitelist the scripts you want running.

I would also specify the Content-Type option headers in any requests just to ensure that the content being sent over is a specific type for the server to interpret safely. Any requests made to the server should be using a randomized session token to make sure the user is making an authenticated request, and their session isn't being hijacked and used by another user.

If there are any publicly facing endpoints like a login or registration, I would add in a captcha to the form to guard against DDOS attacks. If there is a password recovery feature, it's also important that when a password reset request is confirmed that we don't show any details about the user or whether the password reset email has been sent or not. This is an easy vector for attackers to run email lists to see who may be registered as a user.

It is also important to review NPM packages before adding them to the project. Making sure that they have a good history and are maintained by trusted third parties. NPM also allows you to run security audits to assess dependencies for security vulnerabiltiies, so reviewing and acting on these reports is a high priority. 

## How would you improve the API that you just used?

Without knowing the context of the backend, I would say that the frontend client should have as little business logic as possible because it exposes the application to bugs/incongruences between the data being served and what's actually being displayed. It also makes it harder to cover with specs, it makes the app size bigger, and it can feel redundant if the business logic is being duplicated from the backend. If I could request an improvement it would be to have the Total column calculated for each price level, and also have the entry levels sorted in the order they are meant to be displayed in.
