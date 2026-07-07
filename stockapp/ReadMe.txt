npm create vite@latest my-react-app -- --template react
How to run the file
cd stockapp
npm run dev

in test-app folder
run following command
python -m uvicorn test:app --reload
python trading.py

username -admin
password-123
then do Login

On Dashboard Page main stock details will be visible in Chart View(Line Chart and Candlestick chart)

Watchlist Tab shows the list of all stocks and by clicking on the watchlist button that stock will be added in DB 
and will be visible in "Stocks WatchList" section in the same page view.
Same stocks can't be added in the  Watchlist DB.

Under the Buy tab there is a provision of buying stocks. You need to put the Quantity in input box, click on Buy button the 
stocks are now bought and will be visible in "Purchased Stocks" section in the same page view.

In the "Purchased Stocks" section there is an input box for selling stocks.If you want to sell the stocks add its quantity
here and click on sell.The stocks will be sold and sold stocks details will be added in DB.

The purchased stocklist is also be visible under "Holding Tab" with some more details of the stocks.

There is be a provision of add and withdraw balance from the account.
"Add and withdraw Form" is be there and current balance is visible in the web app.

There is theme change option as well in the website.

About Us and Contact page is also available.

At the top there is an input box. By giving the symbol name of the stocks we can search the stocks.

At last, click on Logout and user will be asked to again provide login details.

Concepts Used for creating the web app:
React with vite
Tailwind css
Recharts
@coreui/icons
Axios

Python SqLite


