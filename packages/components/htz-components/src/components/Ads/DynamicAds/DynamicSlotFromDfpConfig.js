import React from 'react';
import PropTypes from 'prop-types';
import DfpConfProvider from './DfpConfProvider';
import DynamicAdSlot from './DynamicAdSlot';
import getSectionPairFromLineage from '../utils/getSectionsFromLineage.js';

const DynamicSlotFromDfpConfig = ({ adSlotId, }) => (
  <DfpConfProvider>
    {
      data => {
        const slotConfig = data.dfpConfig.adSlotConfig[adSlotId];
        console.log('[CommentList] %o dfpConfig: %o', adSlotId, slotConfig);
        if (slotConfig) {
          const network = data.dfpConfig.adManagerConfig.network;
          const adUnitBase = data.dfpConfig.adManagerConfig.adUnitBase;
          const sectionIndicator = `${adSlotId}_section`;
          const [ section, subSection, ] = getSectionPairFromLineage(data.lineage)
            .map(s => s.toLowerCase());
          const adUnit = `${network}/${adUnitBase}/${adSlotId}/${sectionIndicator}/${sectionIndicator}.${section}/${sectionIndicator}.${section}.${subSection}`;
          return (
            <DynamicAdSlot id={adSlotId} adUnit={adUnit} sizes={slotConfig.adSizeMapping} />
          );
        }
        return null;
      }

    }
  </DfpConfProvider>
);

DynamicSlotFromDfpConfig.propTypes = {
  adSlotId: PropTypes.string.isRequired,
};

export default DynamicSlotFromDfpConfig;
