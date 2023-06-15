const cheerio = require("cheerio")
const axios = require("axios")

const timesOfIndia = async (req, res) => {
    let news = []
    const response = await axios("https://timesofindia.indiatimes.com/?from=mdr")
    const $ = cheerio.load(response.data)
    $(".atWBy.Q6d5H.grid_wrapper").children().each((index, element) => {
        const title = $(element).find("figcaption").text().trim()
        const descLink = $(element).find("a").attr("href")
        const source = "The Times Of India"
        if (!!title) {
            news.push({ title, descLink, source })
        }
    })
    res.json(news)
}

const theHindu = async (req, res) => {
    const news = []
    const response = await axios("https://www.thehindu.com/latest-news/")
    const $ = cheerio.load(response.data)
    $(".timeline-with-img").first().children().each((index, element) => {
        const title = $(element).find("h3.title a").text().trim()
        const genre = $(element).find("div.label").text().trim()
        const published = $(element).find("div.news-time.time").attr("data-published")
        const descLink = $(element).find(".title > a").attr("href")
        const source = "The Hindu"
        if (!!title) {
            news.push({ title, descLink, genre, source, published })
        }
    })
    $(".timeline-with-img").last().children().each((index, element) => {
        const title = $(element).find("h3.title a").text().trim()
        const genre = $(element).find("div.label").text().trim()
        const published = $(element).find("div.news-time.time").attr("data-published")
        const descLink = $(element).find(".title > a").attr("href")
        const source = "The Hindu"
        if (!!title) {
            news.push({ title, descLink, genre, source, published })
        }
    })
    res.json(news)
}

const hindustanTimes = async (req, res) => {
    const news = []
    const response = await axios("https://www.hindustantimes.com/latest-news")
    const $ = cheerio.load(response.data)
    const len = $("#dataHolder").children().each((index, element) => {
        const title = $(element).find("h3 > a").text().trim()
        const genre = $(element).find("div.secName > a").text().trim()
        const descLink = "https://www.hindustantimes.com" + $(element).find("h3 > a").attr("href")
        const published = $(element).find(".dateTime.secTime ").text().trim()
        const source = "Hindustan Times"
        if (!!title) {
            news.push({ title, descLink, genre, source, published })
        }
    })
    res.json(news)
}

const indianExpress = async (req, res) => {
    const news = []
    const response = await axios("https://indianexpress.com/latest-news/")
    const $ = cheerio.load(response.data)
    $(".nation").children().each((index, element) => {
        const title = $(element).find(".title").text()
        const published = $(element).find(".date").contents().text()
        const description = $(element).find("p").last().text()
        const descLink = $(element).find("a").first().attr("href")
        const source = "Indian Express"
        if (!!title) {
            news.push({ title, description, descLink, source, published })
        }
    })
    res.json(news)
}

const economicTimes = async (req, res) => {
    const news = []
    const response = await axios("https://economictimes.indiatimes.com/news/latest-news?from=mdr")
    const $ = cheerio.load(response.data)
    $(".data").children().each((index, element) => {
        const title = $(element).find("a").first().text()
        const published = $(element).find("span").contents().text()
        const description = $(element).find("p").last().text()
        const descLink = "https://economictimes.indiatimes.com" + $(element).find("a").first().attr("href")
        const source = "Economic Times"
        if (!!title) {
            news.push({ title, description, descLink, source, published })
        }
    })
    res.json(news)
}

module.exports = { theHindu, economicTimes, timesOfIndia, hindustanTimes, indianExpress }