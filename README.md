# CSV-Parser

## Purpose
To refresh my JavaScript / writing script skils, I decided to complete a tech test that was previously sent to those applying to those applying for a junior developer role.

The task is to create a script to parse a CSV and output to a JSON. The full challenge can read within the `challenge.txt` document.

## Setup

In order to make a local clone of this project, within your terminal you will need to run `git clone https://github.com/code-emad/CSV-Parser.git`

Once the files have been cloned, you will need change directory into the project directory and run `npm install` which will install the dependencies listed within the package.json file. 

## Usage
To run the script, make sure you have a valid* csv file named `inputCSV.csv` in the root directory (an example csv has been included which is a csv following the challenge document example). 

Within the terminal, run `node csvParser.js`.

After a successful run the script will create a json file named `processedProducts.json` and the terminal will log `Function run complete!`.

*The CSV must have the columns for SKU,Colour,Size

## Tests
Relevent tests have been created and are within the `__tests__` folder. Tests can be run with the command `npm run test`.

The tests are built using Jest, and cover core functionality such as CSV reading and product processing logic.

## Challenges Faced
<in>Caching</in>
While writing tests, I encountered inconsistent results—some tests passed individually but failed when run together. After debugging with console logs and researching the issue (including asking ChatGPT), I discovered the problem stemmed from module caching when using require.

To resolve this, I adjusted how modules were imported and restructured the logic slightly to avoid state retention between tests

<in>Staying focused</in>
Whilst I do enjoy writing scripts, an issue for me was sitting down and getting on with it. I found that after work I was too tired to progress with it and on the weekends I was procrastinating. Sometimes when I came to an issue, if I did not find the answer quickly I would get distracted and want to look at something else. I don't think it helped that it was good weather during the weekends that I worked on this. This made me come back to this project periods of leave which meant I had to refresh my memory before carrying on.

To try and reduce this, I tried to remove distraction froms my room and keep my workspace in a clean tidy manner. This helped me to an extent and when I got started I was able to get chunks done.

## Dependencies
| Package     | Description                                                               |
| ----------- | ------------------------------------------------------------------------- |
| csv-parser  | Package to read csv and parse in to an array|
| Jest        | JavaScript testing framework                                                             |

## Minimum Versions
Node v22.14.0 or higher
