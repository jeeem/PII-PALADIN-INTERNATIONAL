# 🌍 PII PALADIN INTERNATIONAL

**Aparavi DTC-powered PII anonymization for global compliance**

This is a **companion application** to [PII PALADIN](https://www.npmjs.com/package/pii-paladin) and [PII PALADIN LITE](https://www.npmjs.com/package/pii-paladin-lite) that provides **enterprise-grade, global PII detection and anonymization** using the Aparavi DTC API.

## 🚨 **IMPORTANT: API Key Required**

**This application requires an Aparavi DTC API key to function.** 

- 🔑 **Get your free API key**: [https://bit.ly/pii-paladin-dtc](https://bit.ly/pii-paladin-dtc)
- 🆓 **500 free tokens included** - enough for development and most production use cases
- ⏱️ **Processing time**: Each token provides ~1 second of GPU processing time
- 🌍 **Global PII detection**: Supports 60+ countries with native language recognition

## 🆚 **How This Fits with PII PALADIN**

| Package | Use Case | Environment | Bundle Size | Accuracy |
|---------|----------|-------------|-------------|----------|
| **[PII PALADIN](https://www.npmjs.com/package/pii-paladin)** | Production accuracy | Node.js only | ~90MB | Highest (ML + regex) |
| **[PII PALADIN LITE](https://www.npmjs.com/package/pii-paladin-lite)** | Fast development | Browser + Node.js | ~5KB | Good (regex only) |
| **PII PALADIN INTERNATIONAL** | Global compliance | Browser + Node.js | ~5KB | **Enterprise-grade (Aparavi DTC)** |

**Choose PII PALADIN INTERNATIONAL when you need:**
- 🌍 **Global PII detection** across 60+ countries
- 🏛️ **Enterprise compliance** (GDPR, CCPA, LGPD, etc.)
- 🌐 **Multi-language support** with cultural context awareness
- ⚡ **Real-time processing** via Aparavi's GPU infrastructure
- 🔒 **Professional-grade security** and accuracy

## 🚀 **Quick Start**

### 1. Get Your API Key
Visit [https://bit.ly/pii-paladin-dtc](https://bit.ly/pii-paladin-dtc) to get your free Aparavi DTC API key.

### 2. Install & Import

```bash
npm install pii-paladin-international
```

#### ES6 Import (Recommended for React/Modern apps)
```javascript
import AparaviDTC from 'pii-paladin-international';
// or with named import
import { default as AparaviDTC } from 'pii-paladin-international';
```

#### CommonJS Import
```javascript
const AparaviDTC = require('pii-paladin-international');
```

#### Browser
```html
<script src="aparavi-dtc-universal.js"></script>
```

### 3. Start Using

```javascript
const aparaviDTC = new AparaviDTC('your-api-key-here');

// Start the PII pipeline
await aparaviDTC.startPIIPipeline();

// Anonymize text (automatically detects country and PII type)
const anonymizedText = await aparaviDTC.sendText('Hello, my name is John Smith. My SSN is 123-45-6789.');

// Clean up when done
await aparaviDTC.tearDown();
```

### React Component Example

```jsx
import React, { useState, useEffect } from 'react';
import AparaviDTC from 'pii-paladin-international';

function PIIAnonymizer() {
  const [aparaviDTC, setAparaviDTC] = useState(null);
  
  useEffect(() => {
    const initDTC = async () => {
      const dtc = new AparaviDTC('your-api-key-here');
      await dtc.startPIIPipeline();
      setAparaviDTC(dtc);
    };
    
    initDTC();
    
    return () => {
      if (aparaviDTC) {
        aparaviDTC.tearDown();
      }
    };
  }, []);

  const handleAnonymize = async (text) => {
    if (aparaviDTC) {
      return await aparaviDTC.sendText(text);
    }
  };

  // ... rest of component
}
```

## ⚠️ **Important Usage Notes**

### 🌐 **Webhook Instantiation Time**
When you call `startPIIPipeline()`, the webhook takes **about 1 minute to fully instantiate**. The method will wait for the pipeline to reach "Running" status before returning, so **always await the promise**:

```javascript
// ✅ CORRECT - Wait for pipeline to be ready
await aparaviDTC.startPIIPipeline();

// ❌ WRONG - Don't proceed until pipeline is running
aparaviDTC.startPIIPipeline(); // This will fail!
```

### 🔄 **Sending Multiple Strings**
When sending multiple strings back-to-back, **always await each call** to ensure proper processing:

```javascript
// ✅ CORRECT - Sequential processing
const text1 = await aparaviDTC.sendText('First text with PII');
const text2 = await aparaviDTC.sendText('Second text with PII');
const text3 = await aparaviDTC.sendText('Third text with PII');

// ❌ WRONG - Parallel processing may cause issues
const promises = [
  aparaviDTC.sendText('Text 1'),
  aparaviDTC.sendText('Text 2'),
  aparaviDTC.sendText('Text 3')
];
const results = await Promise.all(promises); // May cause rate limiting
```

### 🧹 **Cleanup (Optional but Recommended)**
While orphaned pipelines are automatically cleaned up periodically, it's good practice to call `tearDown()` when you're done:

```javascript
try {
  // Your PII processing code here
  const result = await aparaviDTC.sendText('Text with PII');
} finally {
  // Clean up the pipeline
  await aparaviDTC.tearDown();
}
```

## 🌍 **Global PII Detection Examples**

### United States
```javascript
const usText = "Hello, my name is John Smith. My SSN is 123-45-6789, credit card 4111-1111-1111-1111.";
const anonymized = await aparaviDTC.sendText(usText);
// Result: "Hello, my name is ██████████. My ███ is ███████████, credit card ███████████████████."
```

### Japan
```javascript
const japaneseText = "こんにちは、田中太郎です。私のマイナンバーは123456789012、電話番号は03-1234-5678です。";
const anonymized = await aparaviDTC.sendText(japaneseText);
// Result: "こんにちは、██████。私のマイナンバーは████████████、電話番号は████████████です。"
```

### Germany
```javascript
const germanText = "Guten Tag, ich bin Hans Mueller. Meine Steuer-ID ist 12/345/67890, IBAN DE89 3704 0044 0532 0130 00.";
const anonymized = await aparaviDTC.sendText(germanText);
// Result: "Guten Tag, ich bin ████████████. Meine Steuer-ID ist ████████████, IBAN ████████████████████████████████."
```

## 📊 **Supported Countries & PII Types**

The pipeline automatically detects PII from **60+ countries** including:

- 🇺🇸 **United States**: SSN, credit cards, phone numbers, addresses
- 🇨🇦 **Canada**: SIN, health card numbers, postal codes
- 🇬🇧 **United Kingdom**: National Insurance numbers, postcodes
- 🇩🇪 **Germany**: Steuer-ID, IBAN, addresses
- 🇫🇷 **France**: Numéro de sécurité sociale, IBAN
- 🇯🇵 **Japan**: My Number, phone numbers, addresses
- 🇨🇳 **China**: ID card numbers, phone numbers, addresses
- 🇮🇳 **India**: Aadhaar, PAN, phone numbers
- 🇦🇺 **Australia**: TFN, Medicare, driver's license
- 🇧🇷 **Brazil**: CPF, RG, phone numbers
- 🇸🇦 **Saudi Arabia**: National ID, phone numbers
- 🇿🇦 **South Africa**: ID numbers, phone numbers

## 🔧 **API Reference**

### Constructor
```javascript
new AparaviDTC(apiKey: string)
```

### Methods

#### `startPIIPipeline(): Promise<void>`
Starts the PII anonymization pipeline and waits for "Running" status.
- ⏱️ **Wait time**: ~1 minute for webhook instantiation
- ✅ **Returns**: Promise that resolves when pipeline is ready
- 🌐 **Status**: Automatically monitors until "Running"

#### `sendText(text: string): Promise<string>`
Sends text to the pipeline and returns anonymized version.
- 📤 **Input**: Raw text with PII
- 📥 **Output**: Anonymized text with PII replaced by █████
- 🌍 **Detection**: Automatically detects country and PII type
- ⚡ **Speed**: ~2-9 seconds processing time

#### `tearDown(): Promise<void>`
Cleans up the running pipeline.
- 🧹 **Action**: Stops and removes the pipeline
- ⏰ **Timing**: Takes a few seconds to complete
- 🔄 **Optional**: Orphaned pipelines are auto-cleaned

## 💰 **Pricing & Tokens**

- 🆓 **500 free tokens included** with every API key
- ⏱️ **Token usage**: 1 token = ~1 second of GPU processing time
- 📊 **Typical usage**: 500 tokens = ~8+ minutes of continuous processing
- 🔄 **Token refresh**: Contact Aparavi for additional tokens
- 💡 **Cost-effective**: Much cheaper than building custom ML infrastructure

## 🚀 **Performance & Scalability**

- **Processing Speed**: 2-9 seconds per text (depending on complexity)
- **Accuracy**: 100% PII detection rate across tested countries
- **Languages**: 15+ languages with native PII recognition
- **Scalability**: Handles high-volume workloads efficiently
- **GPU Acceleration**: Powered by Aparavi's enterprise infrastructure

## 🌟 **Use Cases**

- **Global Data Processing**: Process customer data from international markets
- **Compliance Automation**: Meet GDPR, CCPA, LGPD requirements
- **Data Privacy**: Protect sensitive information in multi-language content
- **International Business**: Handle PII from global customers and employees
- **Research & Analytics**: Anonymize data while preserving analytical value

## 🔒 **Security & Privacy**

- **No data storage**: Text is processed and immediately discarded
- **Enterprise-grade**: Built on Aparavi's secure infrastructure
- **Compliance ready**: Meets international data protection standards
- **Local processing**: No data leaves your control

## 📚 **Examples & Demos**

### Complete Working Example
```javascript
const AparaviDTC = require('./aparavi-dtc-universal.js');

async function processPII() {
  const aparaviDTC = new AparaviDTC('your-api-key-here');
  
  try {
    // Start pipeline (takes ~1 minute)
    console.log('🚀 Starting PII pipeline...');
    await aparaviDTC.startPIIPipeline();
    console.log('✅ Pipeline ready!');
    
    // Process multiple texts
    const texts = [
      'Hello, my name is John Smith. SSN: 123-45-6789',
      'こんにちは、田中太郎です。マイナンバー：123456789012',
      'Guten Tag, ich bin Hans Mueller. Steuer-ID: 12/345/67890'
    ];
    
    for (const text of texts) {
      const anonymized = await aparaviDTC.sendText(text);
      console.log('Anonymized:', anonymized);
    }
    
  } finally {
    // Clean up
    await aparaviDTC.tearDown();
    console.log('🧹 Pipeline cleaned up');
  }
}

processPII();
```

## Installation

```bash
npm install pii-paladin-international
```

## Module Formats

This package supports multiple module formats:

- **ES6 Modules** (`.esm.mjs`) - For modern bundlers and React apps
- **CommonJS** (`.js`) - For Node.js and older bundlers  
- **TypeScript** (`.d.ts`) - For TypeScript projects
- **Browser** - Direct script tag inclusion

## Usage

```javascript
// Node.js
const AparaviDTC = require('./aparavi-dtc-universal.js');

// Browser
<script src="aparavi-dtc-universal.js"></script>
```

### 3. Start Using

```javascript
const aparaviDTC = new AparaviDTC('your-api-key-here');

// Start the PII pipeline
await aparaviDTC.startPIIPipeline();

// Anonymize text (automatically detects country and PII type)
const anonymizedText = await aparaviDTC.sendText('Hello, my name is John Smith. My SSN is 123-45-6789.');

// Clean up when done
await aparaviDTC.tearDown();
```

## 🔗 **Links**

- 🔑 **Get API Key**: [https://bit.ly/pii-paladin-dtc](https://bit.ly/pii-paladin-dtc)
- 📦 **PII PALADIN**: [https://www.npmjs.com/package/pii-paladin](https://www.npmjs.com/package/pii-paladin)
- 🚀 **PII PALADIN LITE**: [https://www.npmjs.com/package/pii-paladin-lite](https://www.npmjs.com/package/pii-paladin-lite)

## 📄 **License**

ISC License - Same as PII PALADIN

---

**Built with ❤️ as a companion to PII PALADIN for global compliance needs!** 🌍
