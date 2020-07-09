const chalk = require('chalk');

const MAX_WORKERS = 1000
const EVENTS_PER_MINUTE = 1

// simple way of giving one random color
// to each instance so that we can visually
// differentiate workers
class Logger {
  constructor() {
    this.logColor = chalk.hex(randomColor())
  }

  log(...args) {
    console.log(this.logColor(...args))
  }
}


function expDistribution(rate) {
  return - (1/rate) * Math.log(Math.random())
}

function getEventTime() {
  const timeToNextEvent = 60 * 1000 * expDistribution(EVENTS_PER_MINUTE)
  return timeToNextEvent
}



let bidId = 1
async function autobid() {
  const id = bidId
  bidId++
  const logger = new Logger()
  while (true) {
    const timeToNextEvent = getEventTime()
    await sleep(timeToNextEvent)
    logger.log(`${new Date().toISOString()} worker ${id}. bid start`)
    await bid()
    logger.log(`${new Date().toISOString()} worker ${id}. bid end`)
  }
}

async function main() {
  const workers = []
  for (let i = 0; i < MAX_WORKERS; i++) {
    workers.push(autobid())
  }

  return Promise.all(workers)
}

main().then(console.log, console.error)

// uncoment to check 100 exp random values
//function exampleEventTimes() {
  //for (let i = 0; i < 100; i++) {
    //const time = getEventTime()
    //console.log(time)
  //}
//}
//exampleEventTimes()


function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

function bid() {
  return new Promise(resolve => setTimeout(resolve, Math.random() * 1000))
}

function randomColor() {
  return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
}

