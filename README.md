# Ipes

Find your user country and ip informations

## Installation

Run this command when will be installing `ipes` package to your project.

```shell
npm install ipes
```

## Usage

Find ip information

```js
import { Ipes } from 'ipes';

const lookup = new Ipes();
const myIp = await lookup.get_ip_info(); // returned ipinfo.io/json object
```

Find country information

```js
const myCountry = await lookup.get_country_info(); // dr5h - countries-states-cities-database
```