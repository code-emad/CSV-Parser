# CSV-Parser

## Purpose
To get re-familiar with JavaScript / writing scripts, I decided to complete a tech test that was previously sent to those applying to those applying for a junior developer role.

The challenge is to create a script to parse a CSV and output to a JSON. The full challenge can read within the challenge.txt document.

## Setup

In order to make a local clone of this project, within your terminal you will need to run `git clone https://github.com/code-emad/CSV-Parser.git`

Once the files have been cloned, you will need change directory into the project directory and run `npm install` which will install the dependencies listed within the package.json file. 

## Usage
To run the script, make sure you have a valid* csv file in the root directory (an example csv has been included which is a csv following the challenge document example). 

Within the terminal, run `node csvParser.js`.

Once the script has been run, a json file will be created named `processedProducts.json`. A sucessful run of the script would result in `Function run complete!` logged in the terminal.

## Tests
Relevent tests have been created and are within the `__tests__` folder. Tests can be run with the command `npm run test`.

## Challenges Faced
<u>Caching</u>
When writing the tests, I found that some tests were failing when ran together but individually they passed. It took me a while to discover what went wrong as I initially thought that there was an error with the tests that I wrote. After some debugging using console logs I realised this was not the case. 

I did some googling / a chatgpt query and discovered it was to do with the function that I wrote. I learnt that there can be some caching issues when using function `require`. To overcome this I replaced `require` with `path.join`. 

<u>itting down and working on the script</u>
Whilst I do enjoy writing scripts, an issue for me was sitting down and getting on with it. I found that after work I was too tired to progress with it and on the weekends I was procrastinating. Sometimes when I came to an issue, if I did not find the answer quickly I would get distracted and want to look at something else. I don't think it helped that it was good weather during the weekends that I worked on this. This made me come back to this project periods of leave which meant I had to refresh my memory before carrying on.

To try and reduce this, I tried to remove distraction froms my room and keep my workspace in a clean tidy manner. This helped me to an extent and when I got started I was able to get chunks done.

## Dependencies
| Package     | Description                                                               |
| ----------- | ------------------------------------------------------------------------- |
| csv-parser  | Package to read csv and parse in to an array|
| Jest        | JavaScript testing framework                                                             |

## Minimum Versions
Node v22.14.0
