/* global localStorage */

const storageKey = 'GstatCampaign';


export function getCampaignId(params) {
  let result = null;
  try {
    const stored = localStorage.getItem(storageKey);
    result = JSON.parse(stored).CampaignNumber;
  }
  catch (error) {
    // fails silently
  }
  return result;
}
