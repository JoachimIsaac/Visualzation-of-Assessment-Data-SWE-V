What is this application?(small intro):


What is the stack


How to set up the application locally?:
    #Go into your terminal ensure that you have node (npm) installed: 
        1) To check if node is installed type "node -v"
        2) If node is not installed Install node by following this link: https://nodejs.org/en/download/ this should also install npm (node packet manager) for you.
        3) Type "npm -v" to check if npm is installed;  if it is not install it with "npm install -g"
        4) If it is use this "npm install -g npm@latest" to updated it
        5) After node and npm is installed type in npm install, this should install all of frontend dependencies
        6) Then open up a terminal and type in the command "npm run dev" to run the frontend server
        7) If all dependencies have been downloaded the frontend server will run fine, if not try npm install --dev then try "npm run dev" again.
    #Now we need to install dependencies for the backend:
        1) Go into (cd from terminal) the data-visualization-test-api folder
        2)Ensure that you have the lastest version of python installed by typing "python --version" into your terminal
            -> If it is not installed download it here: https://www.python.org/downloads/
        3)Based on what ever alias your pip is set to type in "pip install -r requirements.txt" or "pip3 install -r requirements.txt" to install all the python dependencies. 
        4)In the case where this doesn't work you'll have to install these one at at a time:
            - pip/3 install tinydb
            - pip install fastapi
            - pip install uvicorn[standard]


How to set up the application remote server?:



How to use application general workflow:


Errors and what to do incase of them:

Must knows (like the untoucable db skeleton, what is it and what is it used for?)


Improvements or future updates (griffin auto reload)
