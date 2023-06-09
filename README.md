
1. Link to [greyluo.online](http://greyluo.online/)

  - Username/password info for logging into the site

       - Username: eliel

       - Password: Cse135sp2@23

2. Names of all members in your team

  - Eliel Granados Jimenez

  - Guidong Luo

  - Rudy Orahin



3. The password for user "grader" on your Apache server

  - IP Address: 206.189.198.16

  - Password: 12345


Main page: https://greyluo.online
Dashboard: https://reporting.greyluo.online
User account: user. Password:12345
Admin account: admin.Password: 114514

# Authentication:


The application uses JSON Web Tokens (JWT) and bcrypt for authentication. JWTs authenticate HTTP requests without continuously sending the user's credentials, instead a token is actually generated by the server when the user is logged in with correct credentials. This way the client stores and attaches to future requests from its browser. JWTs carry user’s credentials, including user roles, enabling role-based access control. This approach allows stateless authentication, which is appropriate for given applications containing login and admin privileges. In addition, the user's password is hashed using bcrypt during the authentication process when logging in and creating users by the administrator or root privileges. This method provides a high level of security as the original password cannot be derived from the hash which is what the application needs to authenticate. We also use middleware for verifying the role included in the token to manage access to specific endpoints like ‘/users’. The balanced security, efficiency, and data scalability with JWTs, providing a flexible way of handling  user states and permissions, while bcrypt is a secure way to store passwords. Final step on this operation is when the token is stored in the client’s localStorage, the application must ensure robust protection against Cross-Site Scripting (XSS) attacks.

# Dashboard
For our grid we opted to display whether or not the user has Cookies, javaScript, images, and CSS enabled. We thought displaying this information in a grid would make it easy to identify if there were any users that did not have any of these settings disabled and thereby allow us to troubleshoot if the issues users provide are related to browser settings. These are essential to have a seamless experience as a user. If there was a case where any of these was to be disabled, it would be easy to cross-check by session id, and let the user know to enable certain functionalities.

One of the choices we made was to display the different screen dimensions recorded from the users that visited our site. The reason we decided on this information is because it is useful in adapting our website to properly display on different screen sizes. This information is key when determining whether the user might be utilizing the website from a mobile device. The chart we decided on for this section was a bar chart, which easily shows the different dimensions that were recorded and their respective frequencies in a way that is easy to visually dissect. Compared to the one we did in HW3, we ordered the dimensions in decreasing order so that users can better compare the count among them and identify certain patterns.

Another metric we decided to measure is the different languages that were recorded for every user that visited the site. The reason we decided this information was important was because it allows our website to be more accessible to our users. Additionally, it allows for web developers to translate it into the appropriate language based on their target audiences. Our graph shows that the majority of our visitors have english set as their primary language. To display this we used a pie chart, because it was very easy to tell the difference in the two frequencies.


# Reporting

In the report, We chosen to analyze the screen dimensions to answer the question: How many users are using mobile devices? Understanding this is very useful as it helps us to know on what devices users prefer to use our website, and therefore decide how much effort we should put in to optimize the interface on mobile devices. We decided to use the pie chart because it’s intuitive to see the percentage of mobile users vs non-mobile users on our website. We chose screen width of 768px as the divider because it is a commonly used breakpoint in responsive web design for distinguishing between mobile and tablet devices. We also display the screen dimension as well as the screen type in the grid so that the user can see where the chart is coming from and how we decide if one is mobile or not. We make the grid paged so that it’s easier to go through data and allow a large set of data to fit in the page.

Notes: the button to user management is at the bottom of index.html
