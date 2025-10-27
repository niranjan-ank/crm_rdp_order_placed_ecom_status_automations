// utils/apiConfig.js
const Headers = () => ({
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9",
    "Authorization": `Bearer ${process.env.BEARER_TOKEN}`,
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://crm-rdp.honebi.online",
    "Referer": "https://crm-rdp.honebi.online/",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
    "channel": "admin",
    "source": "honebi",
    "x-request-id": "66b3ece9-bc03-4b04-ad53-30b83c3ee031",
    "x-requestor": "honebi"
});

const Payload = {
    page: 1,
    page_size: 25,
    source: "Honebi",
    search: {
        keys: ["code", "customer_mobile"],

        
        // value: ""
    }
};

module.exports = { Headers, Payload };
