<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [PageLayout examples](#pageLayout-examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### PageLayout examples

```jsx
<StandardArticlePageLayout
  seoData= {{
    metaTitle: "מטפלת בקשישה נפצעה בינוני מדקירה ביבנאל; בנה של המטופלת נעצר בחשד לתקיפה - משפט ופלילים",
    metaDescription: "צוותי מגן דוד אדום מצאו את האשה בבית הקשישה עם פצע דקירה בצווארה וסימני אלימות בפלג גופה העליון, החשוד נמלט מהמקום ונעצר. היא פונתה לבית החולים פוריה בטבריה, מצבה יציב",
    metaKeywords: [
    "אלימות"      
    ],
    canonicalLink: "https://www.haaretz.co.il/news/law/.premium-1.5807945",
    ogDescription: "***",
    ogImages: [ ]
  }}
  slots={{
     preHeader: [
       {
         code: "<div class=\"email-activation-strip h-hidden\" id=\"email-activation-strip\"> <p class=\"l-wrapper email__text\"> <a>טרם ביצעת אימות לכתובת הדוא\"ל שלך. לאימות כתובת הדואל שלך&nbsp; <span data-stat-action =\"81\" data-stat-info =\"modal--email-activation-sent\" class=\"js-btn--submit-email btn btn--tight btn--b\">לחצו כאן</span> </a> </p> </div> <script> $('#email-activation-strip .js-btn--submit-email').on('click', function() { $('#email-activation-strip > p > a').css('visibility', 'hidden'); }); $(document).ready(function() { ActivationUtil.activate(); ActivationUtil.setCheckInterval(0); // when to check with server (0 - always, as long as users tmsso cookie property 'emailValidity' is 'notValid') ActivationUtil.setPopupInterval(1800000); // 1800000 is the default hard-coded value ActivationUtil.setFreq(1); // 0.3 is the default hard-coded value }); </script> <div class=\"l-fluid--b promo-wrapper\" id=\"top-prom-ban\">	<div class=\"promo\"> <p class=\"l-wrapper promo__text\"> <a class=\"js-GaTm-event\" data-stat-action=\"17\" data-banner-id=\"hp-header-blue-strip\" href=\"https://www.haaretz.co.il/promotions-page\">לקרוא ללא הגבלה, רק עם מינוי דיגיטלי בהארץ&nbsp;&nbsp;<button class=\"btn btn--tight btn--a\">לגישה מלאה</button> </a> </p> </div>	</div> <script> if (CookieUtil.getCookie('HtzPusr')) { $('#top-prom-ban').addClass('h-hidden'); } else { $('#top-prom-ban').removeClass('h-hidden'); } </script>	",
         hideOnSite: false,
         inputTemplate: "com.tm.HtmlElement",
         contentId: "7.1583",
         contentName: "top promotion banner	"
       },
       {
         code: "	<div class=\"l-fluid--b promo-wrapper h-hidden\" id=\"top-prom-ban\"> <div class=\"l-wrapper--c\"> <div class=\"promo island--flush\"> <p class=\"promo__text\"> <a href=\"/promotions-page\">המהדורה הדיגיטלית של הארץ&nbsp;<span class=\"h-hidden--s-and-m\">- באתר בסמרטפון ובאייפד&nbsp;</span>- חודש ראשון ב-4.90₪ בלבד&nbsp;<button class=\"btn btn--tight btn--a\">נסו עכשיו</button> </a> </p> </div> </div> </div> <script> if (CookieUtil.getCookie('HtzPusr')) { $('#top-prom-ban').addClass('h-hidden'); } else { $('#top-prom-ban').removeClass('h-hidden'); } </script>",
         hideOnSite: false,
         inputTemplate: "com.tm.HtmlElement",
         contentId: "7.1687",
         contentName: "promotion banner"
       },
       {
         links: [
           {
             subtitle: "אם אין בו פרחים",
             teaserDateSource: "article",
             teaserDate: "Sep 4, 2014 11:53:40 AM",
             inputTemplate: "com.tm.TeaserElement",
             contentId: "7.1730",
             contentName: "אז מה שווה כל סיפור האהבה הזה"
           },
           {
             teaserDateSource: "article",
             teaserDate: "Jun 15, 2014 5:13:24 PM",
             inputTemplate: "com.tm.TeaserElement",
             contentId: "7.1665",
             contentName: "יאיר לפיד יודע הכי טוב!"
           },
           {
             articleType: "regularArticle",
             articleTypeFromModel: "regularArticle",
             inputTemplate: "com.htz.StandardArticle",
             contentId: "1.1259",
             contentName: "מתחת לקליפת הפלדה של מתן חודורוב"
           },
           {
             articleType: "regularArticle",
             articleTypeFromModel: "regularArticle",
             inputTemplate: "com.htz.StandardArticle",
             contentId: "1.1205",
             contentName: "אוקראינה: מדינה קרועה עם קופה מרוקנת"
           },
           {
             teaserDate: "Sep 10, 2014 11:36:01 AM",
             inputTemplate: "com.tm.TeaserElement",
             contentId: "7.1760",
             contentName: "סטאלון מפסיד, אודיה רש עולה"
           }
         ],
         inputTemplate: "com.htz.NavigationElementResp",
         contentId: "7.1597",
         contentName: "Responsive navigation"
       }
     ],
     header: [
       {
         inputTemplate: "com.polobase.JSONListsWrapper",
         contentId: "7.1962",
         contentName: "אוסקה"
       },
       {
         afterElementsIncludeHTML: "<div class=\"cb h-cb\"></div> </div> </div>",
         beforeElementsIncludeHTML: "<div class=\"topSectionBanners\" style=\"width: 100%; font-size: 0;\"> <div name=\"dcPlazma\" id=\"dcPlazma\"></div> <div id=\"\" align=\"center\" class=\"xx xx--c\">",
         contentLists: [
           {
             id: "Haaretz.co.il.Web.Plazma",
             style: "vertical-align: top; height: 100%; width: auto; padding: 0px 0px 5px;",
             className: "js-dfp-resp-refresh h-dib js-plazma placeholder--90--m-to-xl placeholder--60--s",
             audianceTarget: "all",
             hideOnSite: false,
             inputTemplate: "com.polobase.DfpBannerElement",
             contentId: "7.4208",
             contentName: "Haaretz.co.il.Web.Plazma - Section"
           },
           {
             id: "haaretz.co.il.web.slider",
             audianceTarget: "nonPaying",
             hideOnSite: false,
             inputTemplate: "com.polobase.DfpBannerElement",
             contentId: "7.4207",
             contentName: "haaretz.co.il.web.slider"
           },
           {
             id: "Haaretz.co.il.Web.ruler",
             style: "position: fixed;width: 100%;z-index: 9999;bottom: 0;",
             className: "h-hidden",
             audianceTarget: "nonPaying",
             hideOnSite: false,
             inputTemplate: "com.polobase.DfpBannerElement",
             contentId: "7.4206",
             contentName: "Haaretz.co.il.Web.ruler"
           },
           {
             id: "Haaretz.co.il.Web.HalfPage.floating_x",
             style: "width:0px;height:0px;overflow:hidden;",
             className: "js-dfp-resp-refresh",
             audianceTarget: "nonPaying",
             hideOnSite: false,
             inputTemplate: "com.polobase.DfpBannerElement",
             contentId: "7.4205",
             contentName: "Haaretz.co.il.Web.HalfPage.floating_x"
           }
         ],
         viewMode: "general",
         hideOnSite: false,
         inputTemplate: "com.tm.ElementGroup",
         contentId: "7.4204",
         contentName: "DFP plazma wrapper - Articles"
       }
     ],
     postHeader: [
       {
         inputTemplate: "com.tm.PageTitle",
         contentId: "7.2048",
         contentName: "Bread crumbs"
       },
       {
         inputTemplate: "com.htz.ArticleHeaderElement",
         contentId: "7.1587",
         contentName: "Article Header"
       }
     ],
     aside: [
       {
         contentLists: [
           {
             inputTemplate: "com.tm.ArticleTagsElement",
             contentId: "7.1936",
             contentName: "אלמנט תגיות"
           }
         ],
         viewMode: "general",
         hideOnSite: false,
         inputTemplate: "com.tm.ElementGroup",
         contentId: "7.2881",
         contentName: "Tags"
       },
       {
         title: "הונג קונג",
         view: "HongKong",
         hasPagination: false,
         hideOnSite: false,
         inputTemplate: "com.tm.ListElement",
         contentId: "7.1676",
         contentName: "הונג קונג"
       },
       {
         inputTemplate: "com.tm.TabViewElement",
         contentId: "7.1671",
         contentName: "הפופולריות ממש"
       },
       {
         title: "בנגקוק",
         view: "Bangkok",
         hasPagination: false,
         hideOnSite: false,
         inputTemplate: "com.tm.ListElement",
         contentId: "7.1582",
         contentName: "בנגקוק"
       },
       {
         view: "Tokyo",
         hasPagination: false,
         hideOnSite: false,
         inputTemplate: "com.tm.ListElement",
         contentId: "7.1580",
         contentName: "טוקיו א"
       }
     ],
     article: [
       {
         articleType: "regularArticle",
         mobileTitle: "\"לעבור את הגבול\": מלודרמה רומנטית פוליטית שתוקפת את מארין לה פן",
         title: "\"לעבור את הגבול\": מלודרמה רומנטית פוליטית שתוקפת את מארין לה פן",
         subtitle: "אחות חסרת ניסיון פוליטי המשתכנעת לרוץ לראשות עיר מטעם מפלגה ימנית עומד במרכז הסרט הצרפתי \"לעבור את הגבול\". למרות חולשותיו כדאי לצפות בו בגלל המסר שהוא מבקש להעביר",
         authors: [
           {
             showInNewsLetterAlerts: false,
             displayAuthorPage: false,
             inputTemplate: "com.tm.Author",
             contentId: "1.1748",
             contentName: "רמי ליבני"
           }
         ],
         pubDate: "Feb 4, 2018 5:21:03 PM",
         modDate: "Feb 4, 2018 5:20:35 PM",
         body: [
           {
             alt: "הכנרת, באוקטובר 2017",
             credit: "גיל אליהו",
             title: "הכנרת, באוקטובר 2017",
             aspects: {
               regular: {
                 width: 1819,
                   height: 1364,
                   x: 358,
                   y: 30
               },
               headline: {
                 width: 2196,
                   height: 1277,
                   x: 4,
                   y: 0
               },
               belgrade: {
                 width: 2189,
                   height: 689,
                   x: 11,
                   y: 705
               },
               landscape: {
                 width: 2196,
                   height: 946,
                   x: 4,
                   y: 256
               },
               square: {
                 width: 1390,
                   height: 1390,
                   x: 659,
                   y: 4
               },
               vertical: {
                 width: 1183,
                   height: 1386,
                   x: 1017,
                   y: 8
               }
             },
               isAnimated: false,
                       imgArray: [
                     {
                       imgName: "image/1528332423.jpg",
                       version: "1518468418"
                     }
                   ],
                   imageType: "image",
                   inputTemplate: "com.tm.Image",
                   contentId: "1.5811062",
                   contentName: "הכנרת, באוקטובר 2017"
           },
           {
             attributes: [ ],
             tag: "p",
             content: [
               {
                 attributes: [
                   {
                     key: "text",
                     value: "אינני נוהג לרוב להתווכח עם קובעי השמות בעברית לסרטים, בין השאר משום שבהשוואה לשנים בהן בגרתי, המצב כיום הוא לרוב סביר בהחלט. אבל במקרה הנוכחי עלי להתעכב על השם העברי, \"לעבור את הגבול\", שניתן לסרטו של הבמאי הבלגי לוקה בלוו, שעובד בצרפת, מאחר שהוא עלול להטעות. במקור נקרא הסרט \"Chez Nous\", כלומר \"אצלנו\", ובאנגלית ניתן לו השם \"This Is Our Land\". לשם העברי אין כל קשר לעלילת הסרט, אלא אם כן מישהו יתעקש שיש לו משמעות סימבולית רופפת, והוא עלול לעורר רושם שזהו סרט פעולה או עוסק במצוקת הפליטים. הוא לא זה ולא זה, אלא מלודרמה רומנטית פוליטית שתוקפת את החזית הלאומית, מפלגתה של מארין לה פן."
                   }
                 ],
                 tag: "#text"
               }
             ]
           },
           {
             attributes: [ ],
             tag: "p",
             content: [
               {
                 attributes: [
                   {
                     key: "text",
                     value: "בלוו התפרסם ב–2002 כאשר יצר טרילוגיה שהדמויות בה נעו מסרט לסרט, אך כל אחד מסרטיה פעל בז'אנר אחר — המלודרמה, הקומדיה והמותחן. יתרה מכך, הסרטים יצאו לאקרנים במקביל והצופים יכלו להחליט באיזה סדר הם רוצים לצפות בהם. סרטיו הבאים, אלה שראיתי, היו בעלי אופי ייחודי פחות, כולל סרטו הנוכחי. אך גם בהם אפשר היה להבחין ביכולתו של בלוו (שגם הופיע כשחקן בסרטים רבים). סרטו החדש, שיצא לאקרנים בצרפת כחודשיים לפני הבחירות לנשיאות, מעניין בעיקר בגלל הניסיון ליצור קולנוע פופולרי בעל מסר פוליטי חזיתי. התוצאה חורקת מבחינות רבות, אך בגלל הניסיון שנעשה בה, ומוקד המתקפה הניצבת במרכז עלילתה, היא שווה צפייה."
                   }
                 ],
                 tag: "#text"
               }
             ]
           },
           {
             attributes: [ ],
             tag: "p",
             content: [
               {
                 attributes: [
                   {
                     key: "href",
                     value: "https://www.haaretz.co.il/gallery/cinema/.premium-1.3195435"
                   }
                 ],
                 tag: "a",
                 content: [
                   {
                     attributes: [
                       {
                         key: "text",
                         value: "הסרט"
                       }
                     ],
                     tag: "#text"
                   }
                 ]
               },
               {
                 attributes: [
                   {
                     key: "text",
                     value: " מתרחש בעיר קטנה בצפון צרפת ובמרכזו פולין דיאה (אמילי דקן), אחות העושה ביקורי בית. פולין, גרושה ואם לשניים, מטפלת גם באביה הקומוניסט (פטריק דקאם), שהיה פעיל בארגון ועדי עובדים, אך כעת מצבו הגופני מידרדר. לעומת אביה, פולין חסרה כל תודעה פוליטית. היא מעולם לא הצביעה, דבר שהופך אותה לטרף קל לפיליפ ברתייה (אנדרה דיסולייה), הרופא המכובד של אביה. הרופא, בעל דעות ימניות, עובד למען המפלגה הלאומית המתחדשת, מפלגה פיקטיבית שבראשה ניצבת אנייס דורגל (קתרין ז'אקוב). עם תסרוקתה הבלונדינית והתנהלותה המתכתית אין ספק כי היא בת דמותה של "
                   }
                 ],
                 tag: "#text"
               },
               {
                 attributes: [
                   {
                     key: "href",
                     value: "https://www.haaretz.co.il/news/world/europe-elections-2017/CARD-1.4033383?page=M1"
                   }
                 ],
                 tag: "a",
                 content: [
                   {
                     attributes: [
                       {
                         key: "text",
                         value: "מארין לה פן"
                       }
                     ],
                     tag: "#text"
                   }
                 ]
               },
               {
                 attributes: [
                   {
                     key: "text",
                     value: "."
                   }
                 ],
                 tag: "#text"
               }
             ]
           },
           {
             attributes: [ ],
             tag: "p",
             content: [
               {
                 attributes: [
                   {
                     key: "text",
                     value: "מאחר שפולין נאת המראה אהובה על הכל בעיר שהיא גרה בה וחסרת עמדה פוליטית, ברתייה משכנע אותה לרוץ למשרת ראש העיר מטעם מפלגתה של אנייס. פולין, שאינה חסרת ידע כללי בפוליטיקה הצרפתית, נרתעת מההצעה לרוץ מטעם מפלגה ימנית וגזענית. היא גם חוששת מהאופן שבו אביה יגיב אם תסכים להצעה. אך ברתייה המיומן והחלקלק משכנע אותה שלמפלגה הלאומית המתחדשת כבר אין הקו הקיצוני שהיה לה בעבר, ושכל מטרתה היא להיטיב עם אותם צרפתים, כמו פולין, למשל, שהיו לשקופים בצרפת כיום. פולין משתכנעת ומסכימה לרוץ."
                   }
                 ],
                 tag: "#text"
               }
             ]
           },
           {
            alt: "נתניהו בישיבת הממשלה השבועית, בתחילת השבוע",
            credit: "אמיל סלמן",
            title: "נתניהו בישיבת הממשלה השבועית, בתחילת השבוע",
            aspects: {
              regular: {
                width: 1942,
                  height: 1456,
                  x: 258,
                  y: 12
              },
              headline: {
                width: 2200,
                  height: 1277,
                  x: 0,
                  y: 56
              },
              belgrade: {
                width: 2200,
                  height: 690,
                  x: 0,
                  y: 369
              },
              landscape: {
                width: 2200,
                  height: 949,
                  x: 0,
                  y: 194
              },
              square: {
                width: 1461,
                  height: 1460,
                  x: 592,
                  y: 8
              },
              vertical: {
                width: 1227,
                  height: 1440,
                  x: 731,
                  y: 28
              }
            },
            isAnimated: false,
            imgArray: [
              {
                imgName: "image/2151933599.jpg",
                version: "1518556356"
              }
            ],
            imageType: "image",
            inputTemplate: "com.tm.Image",
            contentId: "1.5821197",
            contentName: "נתניהו בישיבת הממשלה השבועית, בתחילת השבוע"
            },
           {
             attributes: [ ],
             tag: "p",
             content: [
               {
                 attributes: [
                   {
                     key: "text",
                     value: "אחת הבעיות המרכזיות של סרטו של בלוו נעוצה בדמותה של הגיבורה שלה. היא מעוררת הזדהות בשל הופעתה של דקן, אך הנאיביות שלה ונכונותה להיענות למניפולציות שברתייה ואנייס מפעילים עליה משרות תחושה של חוסר אמינות, בעיקר בגלל הצגתה כאשה חזקה ואינטליגנטית. באחת הסצינות המוצלחות מקבלים פולין ופעיליה הוראות כיצד לפנות לתושבי העיר (למשל, לא להתווכח עם המתנגדים למפלגה הלאומית המתחדשת, ותמיד לחייך), והם אף משכנעים את פולין לצבוע את שערה החום לבלונד, כי בלונד הוא צבע מסביר פנים יותר, לטענתם. בסרט, דרך דמותה של פולין, מנסה בלוו לתאר את האופן שבו המפלגות הימניות הקיצוניות מתמרנות את בוחריהן הפוטנציאליים, המגיעים במקרה הזה מהשוליים של צרפת, שבהם יש ללה פן תמיכה רחבה. יש לסרט גם רלוונטיות מעבר לימין הקיצוני באירופה. הוא מעורר מחשבות בנוגע לציבור הרחב שבחר בדונלד טראמפ כנשיא ארצות הברית."
                   }
                 ],
                 tag: "#text"
               }
             ]
           },
           {
             attributes: [ ],
             tag: "p",
             content: [
               {
                 attributes: [
                   {
                     key: "text",
                     value: "הבעיה המאפיינת את עיצוב דמותה של פולין מטה את הסרט לסכמטיות. היא באה לידי ביטוי בכך שדווקא בתו של קומוניסט היא זו שמתגייסת לטובת הימין הקיצוני. אך סכמטיות זו מאפיינת אף יותר את האגף הרומנטי של הסרט. לעיר חוזר סטפן, המכונה סטאנקו (גיום גואי), שהיה חברה של פולין בנעוריה ובין השניים מתפתח רומן. הסרט מגלה מיד מה שפולין אינה יודעת: שסטפן השתייך לארגון ניאו־נאצי ועדיין מנהיג מיליציה הפועלת נגד מהגרים ומיעוטים נוספים (מפתיע, אגב, שהיא אינה מתייחסת לקעקוע הגדול על גבו, שהוא בעל אופי פשיסטי מובהק). הקשר המתחדש בין פולין לסטפן מטריד את ברתייה ואנייס, מאחר שסטפן פעל פעם בשירותה של המפלגה של אנייס, והמפלגה רוצה להתנער מטיפוסים כמותו. צריך להיפטר מסטפן לפני שפולין תגלה מי הוא, וכאן נכנס לסרט מרכיב של מותחן."
                   }
                 ],
                 tag: "#text"
               }
             ]
           },
           {
             attributes: [ ],
             tag: "p",
             content: [
               {
                 attributes: [
                   {
                     key: "text",
                     value: "הסרט אינו מציג את הסיפור ואת הסוגיות העולות ממנו בצורה המשוכללת והצלולה ביותר. אך הניסיון המתקיים בו, על מעלותיו ומגבלותיו, עשוי לשמש דוגמה מעניינת לאופן שבו אפשר ליצור את השילוב בין קולנוע פופולרי שנושא אמירה פוליטית, שהיא לעתים נוקבת."
                   }
                 ],
                 tag: "#text"
               }
             ]
           },
           {
             attributes: [ ],
             tag: "p",
             content: [
               {
                 attributes: [ ],
                 tag: "strong",
                 content: [
                   {
                     attributes: [
                       {
                         key: "text",
                         value: "\"לעבור את הגבול\". בימוי: לוקה בלוו; תסריט: לוקה בלוו, ז'רום לרואה; צילום: פייריק גאנטלמי איל; מוזיקה: פרדריק ורשוואל; שחקנים: אמילי דקן, גיום גואי, אנדרה דיסולייה, קתרין ז'אקוב, פטריק דקרם"
                       }
                     ],
                     tag: "#text"
                   }
                 ]
               }
             ]
           },
           {
             elementType: "relatedArticles",
             articles: [ ]
           }
         ],
         inputTemplate: "com.htz.StandardArticle",
         contentId: "1.6712",
         contentName: "\"לעבור את הגבול\": מלודרמה רומנטית פוליטית שתוקפת את מארין לה פן"
       },
       {
         id: "Haaretz.co.il.Web.LargeRectangle.1",
         style: "text-align:center;",
         className: "ad h-hidden",
         audianceTarget: "all",
         hideOnSite: false,
         inputTemplate: "com.polobase.DfpBannerElement",
         contentId: "7.6732",
         contentName: "Haaretz.co.il.Web.LargeRectangle.1"
       },
       {
         inputTemplate: "com.tm.CommentsElement",
         contentId: "7.7418",
         contentName: "Comments"
       }
     ],
     footer: [
       {
         headList: [
           {
             inputTemplate: "com.polobase.Pair",
             contentId: "1.463",
             contentName: "דרושים"
           },
           {
             inputTemplate: "com.polobase.Pair",
             contentId: "1.464",
             contentName: "הנהלה"
           }
         ],
         creditList: [
           {
             inputTemplate: "com.polobase.Pair",
             contentId: "1.465",
             contentName: "UI by Netcraft"
           },
           {
             inputTemplate: "com.polobase.Pair",
             contentId: "1.466",
             contentName: "Design by Design Factory"
           }
         ],
         inputTemplate: "com.tm.FooterElement",
         contentId: "7.292",
         contentName: "Footer"
       },
       {
         inputTemplate: "com.tm.DisclaimerElement",
         contentId: "7.347",
         contentName: "Disclaimer"
       }
     ]
 }}/>
```
