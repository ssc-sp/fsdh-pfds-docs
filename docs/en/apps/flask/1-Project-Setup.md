# Project Setup 

Here we will be setting up things you will need to make a Flask based web application. Flask is widely regarded as one of if not the easiest web framework. We will be making a quick data visualizer turning a spreadsheet containing seal stomach contents into an interactive map that dislays gender, age , and stomach contents in an easily understandable and viewable way. 

The example project for this tutorial is the [Seal Checker 9000](https://poc.fsdh-dhsf.science.cloud-nuage.canada.ca/app/FEWSC/) 

Although the tutorial includes most of the code but following along on [the repository for the project](https://github.com/HamSamm/Harp-Seal-Checker) is advised. 

This assumes you already have (and are running) WSL (Windows Subsystem for Linux) and have VSC (Visual Studio Code). 

Lets set up the environment you need!

Run the following commands in your terminal

**1:** Updates software packages (Just in case)
```  
sudo apt update && sudo apt upgrade
```

**2:** Installs python3, python3-pip, python3-venv, git if you don't already have them.
```
sudo apt install python3 python3-pip python3-venv git
```

**3:** Create the project folder
>Don't name this Your-Project-Name. Name it something relivant to your project. 
>
>If you made your github project already then refer to step 3.5 
```
mkdir ~/Your-Project-Name
```

**3.5:** Or ideally clone your github project. 
```
git clone https://github.com/username/repository.git
```

**4:** Moves to your project directory (Replace "Your-Project-Name" with your project name) 
>You should see your directory location added to the command line
```
cd ~/Your-Project-Name
```

**5:** Creates an python environment 
```
python3 -m venv .venv
```

**6:** Activates that environemnt 
>You should see (.venv) added to the command line
```
source .venv/bin/activate
```

**7:** Install flask
```
pip install flask
```

**8:** Checks if flask was installed
```
python3 -m flask --version
```

**9:** Now open Visual Studio Code. Initally you should do this in the ubuntu terminal but after you can access through the pop-up box that appears when you right click Visual Studio Code in your taskbar. 
```
code .
```
>Note: This step assumes you are in the correct directory. Refer to step 4 if it didn't work. If refering to step 4 didn't work, just close the terminal, shutdown wsl using Windows PowerShell with the command
> ``` wsl --shutdown ```
>Then refer to step 4 again.


**10:** Create your requirements file  
Before installing packages, we will create a `requirements.txt` file in our root folder. Using a requirements file lets you install the same versions of the packages on your computer as we will later on the FSDH cloud server.

Create a file named `requirements.txt` in your project folder and add the following dependencies:

> Though not technically required yet, you can just manually download each of the packages while making the web app. 

```text
Flask>=3.0.0
pandas>=2.0.0
numpy<2.0.0
folium>=0.15.0
azure-storage-blob>=12.0.0
```

**11:** Install all packages  
Run this command in your terminal while the virtual environment (.venv) is active:

```bash
pip install -r requirements.txt
```