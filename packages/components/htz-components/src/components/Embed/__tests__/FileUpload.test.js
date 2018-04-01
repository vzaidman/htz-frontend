import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';

import FileUpload from '../elements/FileUpload';

it('File upload ', () => {
  const snapshot = felaSnapshotter(
    <FileUpload
      content=""
      embedType="excel"
      elementType="embedElement"
      inputTemplate="com.polobase.fileUpload"
      contentId="7.4136"
      contentName="gdfjgh"
    />
  );
  expect(snapshot).toMatchSnapshot();
});
