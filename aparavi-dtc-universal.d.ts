/**
 * TypeScript declarations for Aparavi DTC Universal Client
 */

declare class AparaviDTC {
  /**
   * Create a new AparaviDTC instance
   * @param apiKey - Your Aparavi DTC API key
   * @param apiBaseUrl - Base URL for the API (defaults to 'https://eaas.aparavi.com')
   */
  constructor(apiKey: string, apiBaseUrl?: string);

  /**
   * Start the PII anonymization pipeline
   */
  startPIIPipeline(): Promise<void>;

  /**
   * Send text for PII anonymization
   * @param textData - Text containing PII to anonymize
   * @returns Anonymized text
   */
  sendText(textData: string): Promise<string>;

  /**
   * Clean up the pipeline and resources
   */
  tearDown(): Promise<void>;
}

export = AparaviDTC;
