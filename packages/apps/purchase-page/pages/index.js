import React from 'react';
import { withRouter, } from 'next/router';
import { withData, pagePropTypes, } from '@haaretz/app-utils';
import { Button, LayoutContainer, LayoutRow, } from '@haaretz/htz-components';
import LandingList from '../components/LandingList/LandingList';
import LandingHeader from '../components/LandingHeader/LandingHeader';
import MainLayout from '../layouts/MainLayout';

export function Page({ host, url, router, }) {
  return (
    <MainLayout renderHeader={false} footerHasIllustration={false}>
      <LayoutRow bgc="white">
        <LandingHeader />
        <LayoutContainer
          bgc="white"
          miscStyles={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <LandingList
            // todo: get items dynamically
            items={[
              {
                title: 'מה מקבלים המנויים הדיגטליים של הארץ?',
                text:
                  'גישה חופשית לכל תכני הארץ באתר בעברית, באייפון ובאנדרואיד, פחות פרסומות ובאנרים, קבלת ניוזלטרים נושאיים יומיים או שבועיים, גישה מלאה לארכיון הדיגיטלי.',
              },
              {
                title: 'האם ניתן לקרוא את הארץ ללא רכישת מינוי?',
                text:
                  'כן. לאחר הרשמה לאתר ניתן לקרוא 6 כתבות בחודש בחינם. מומלץ לרכוש מינוי לאתר, כדי ליהנות מכל תכני הארץ ללא הגבלה.',
              },
              {
                title: 'באילו אמצעי תשלום ניתן לשלם עבור המינוי?',
                text:
                  'התשלום מתבצע בהוראת קבע מתחדשת באמצעות כרטיס אשראי או באמצעות PayPal.',
              },
            ]}
          />
          <Button
            href={{ pathname: '/promotions-page/stage1', }}
            asPath={`${router.asPath}/offers`}
            variant="salesOpaque"
            boxModel={{ hp: 3.5, vp: 1, }}
            miscStyles={{
              marginTop: '3rem',
              marginBottom: '11rem',
            }}
          >
            {/* todo: get dynamically */}
            לכל מסלולי המנויים
          </Button>
        </LayoutContainer>
      </LayoutRow>
    </MainLayout>
  );
}

Page.propTypes = pagePropTypes;

// todo: set up server for purchase page and use withData
export default withRouter(withData(Page));
// export default Page;
