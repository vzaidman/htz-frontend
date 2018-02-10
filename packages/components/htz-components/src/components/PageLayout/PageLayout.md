<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [PageLayout examples](#pageLayout-examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### PageLayout examples

```jsx
<PageLayout slots={{
 header: [
   {
     inputTemplate: 'com.htz.NavigationElementResp',
     contentId: '7.3598394',
     contentName: 'Article Page Navigation'
   },
 ],
   topwidesecondary
:
 [
   {
     articleType: 'regularArticle',
     mobileTitle: 'קוריאה המאוחדת ואתלט נטול חולצה בלטו בטקס הפתיחה של משחקי החורף',
     title: 'קוריאה המאוחדת ואתלט נטול חולצה בלטו בטקס הפתיחה של משחקי החורף',
     subtitle: 'אולימפיאדת החורף בפיונגצ\'אנג יצאה לדרך רשמית עם טקס פתיחה שהציג תמונה פסטורלית של קוריאה השלמה, כמו גם לוחם טקוואנדו לשעבר ששחזר את הצלחתו מריו באותו מעמד. אלכסיי ביצ\'נקו נשא את הדגל הישראלי',
     authors: [
       {
         email: 'itamar.katzir@haaretz.co.il',
         showInNewsLetterAlerts: false,
         displayAuthorPage: false,
         inputTemplate: 'com.tm.Author',
         contentId: '1.4525607',
         contentName: 'איתמר קציר'
       }
     ],
     pubDate: 'Feb 9, 2018 2:38:45 PM',
     modDate: 'Feb 9, 2018 2:38:25 PM',
     body: [
       {
         alt: 'צפון ודרום קוריאה במשחקי החורף',
         credit: 'David J. Phillip/אי־פי ',
         title: 'אתלטים מדרום וצפון קוריאה צועדים יחד בטקס הפתיחה',
         aspects: {
           regular: {
             width: 1939,
             height: 1454,
             x: 220,
             y: 41
           },
           headline: {
             width: 2171,
             height: 1262,
             x: 29,
             y: 53
           },
           belgrade: {
             width: 2073,
             height: 654,
             x: 127,
             y: 306
           },
           landscape: {
             width: 2069,
             height: 895,
             x: 131,
             y: 155
           },
           square: {
             width: 1466,
             height: 1466,
             x: 261,
             y: 8
           }
         },
         isAnimated: false,
         imgArray: [
           {
             imgName: 'image/1938464726.jpg',
             version: '1518179073'
           }
         ],
         imageType: 'image',
         inputTemplate: 'com.tm.Image',
         contentId: '1.5806207',
         contentName: 'צפון ודרום'
       },
       {
         attributes: [],
         tag: 'p',
         content: [
           {
             attributes: [
               {
                 key: 'text',
                 value: 'המשחקים האולימפיים בפיונגצ\'אנג יצאו היום (שישי) לדרך באופן רשמי, עם טקס הפתיחה המסורתי. כיאה למשחקים שיציגו משלחת של דרום קוריאנים וצפון קוריאנים הצועדים ביחד - ואפילו מתחרים (יותר נכון מתחרות יחד) בנבחרת הוקי הנשים - מארגני הטקס שמו דגש על מסרים של שלום ואחווה, והציגו אותם דרך ההיסטוריה והפולקור של קוריאה. הטקס היה רווי בתלבושות מסורתיות, דמויות וחיות עתיקות (כמו הפניקס הקוריאני, חצי אדם-חצי ציפור המופיע רק בעיתות שלום), וסמלים מסורתיים של איזון.'
               }
             ],
             tag: '#text'
           }
         ]
       },
       {
         attributes: [],
         tag: 'p',
         content: [
           {
             attributes: [
               {
                 key: 'text',
                 value: 'לאחר שלושה קטעים אמנותיים קצרים באופן יחסי, החלה צעדת המשלחות לתוך האיצטדיון האולימפי. הנבחרת ה-60 שנכנסה היתה ישראל, מובלת על ידי נושא הדגל אלכסיי ביצ\'נקו, שרק הבוקר '
               }
             ],
             tag: '#text'
           },
           {
             attributes: [
               {
                 key: 'href',
                 value: 'https://www.haaretz.co.il/sport/hayom/LIVE-1.5806004'
               },
               {
                 key: 'target',
                 value: '_blank'
               }
             ],
             tag: 'a',
             content: [
               {
                 attributes: [
                   {
                     key: 'text',
                     value: 'סיפק הופעה נפלאה'
                   }
                 ],
                 tag: '#text'
               }
             ]
           },
           {
             attributes: [
               {
                 key: 'text',
                 value: ' בתחרות הקבוצתית בהחלקה אמנותית וסיים במקום השני במקצה הריקוד הקצר. המשלחת הישראלית, שמונה עשרה ספורטאים, היא הגדולה אי פעם למשחקי החורף.'
               }
             ],
             tag: '#text'
           }
         ]
       },
       {
         elementType: 'relatedArticles',
         articles: [
           {
             url: 'https://www.haaretz.co.il/sport/other/.premium-1.5805741',
             inputTemplate: 'com.htz.StandardArticle',
             contentId: '1.5805741',
             contentName: 'ישראל יוצאת לאולימפיאדת החורף בתקווה לחזור עם מדליות, וקצת קהל'
           },
           {
             url: 'https://www.haaretz.co.il/sport/other/1.5764850',
             inputTemplate: 'com.htz.StandardArticle',
             contentId: '1.5764850',
             contentName: 'פיטה טאפטופואה, הכוכב חסר החולצה מריו, מגיע למשחקי החורף'
           }
         ]
       },
       {
         alt: 'המשלחת הישראלית צועדת בפיונגצ\'אנג',
         credit: 'Sean Haffey/אי־פי ',
         title: 'המשלחת הישראלית צועדת בפיונגצ\'אנג',
         aspects: {
           regular: {
             width: 2133,
             height: 1599,
             x: 67,
             y: 0
           },
           headline: {
             width: 2176,
             height: 1266,
             x: 24,
             y: 19
           },
           belgrade: {
             width: 2157,
             height: 676,
             x: 33,
             y: 533
           },
           landscape: {
             width: 2129,
             height: 919,
             x: 71,
             y: 176
           },
           square: {
             width: 1704,
             height: 1704,
             x: 210,
             y: 57
           }
         },
         isAnimated: false,
         imgArray: [
           {
             imgName: 'image/65099162.jpg',
             version: '1518178720'
           }
         ],
         imageType: 'image',
         inputTemplate: 'com.tm.Image',
         contentId: '1.5806200',
         contentName: 'ישראל'
       },
       {
         attributes: [],
         tag: 'p',
         content: [
           {
             attributes: [
               {
                 key: 'text',
                 value: 'כמה מדינות לפני ישראל, נכנסה משלחת הספורטאים הרוסים שייתחרו תחת הדגל האולימפי. המשלחת הענקית,  שלא הובלה על ידי נושא דגל רוסי אלא על ידי פעילה מקומית, זכתה לתשואות רבות מהקהל. '
               }
             ],
             tag: '#text'
           }
         ]
       },
       {
         attributes: [],
         tag: 'p',
         content: [
           {
             attributes: [
               {
                 key: 'text',
                 value: 'הטקס כולו נערך בקור של מינוס שלוש מעלות, שממשיכות לצנוח ככל שמתקדם הערב. בסך הכל משתתפות במשחקים 91 מדינות, להן לוקח בסך הכל 56 דקות בדיוק לצעוד לתוך האיצטדיון. הרגע הגדול של קוריאה הגיע בסוף התהלוכה: אחרונה חביבה צעדה המארחת, תחת דגל מאוחד, כששני אתלטים - אחד  מהדרום ואחת מהצפון - נושאים את הדגל שמציג את תמונתה של קוריאה השלמה. הספורטאים צעדו במשלחת זה לצד זה, לבושים בלבן, מנופפים כולם בדגלים קטנים הנושאים את אותו הסמל. '
               }
             ],
             tag: '#text'
           }
         ]
       },
       {
         attributes: [],
         tag: 'p',
         content: [
           {
             attributes: [
               {
                 key: 'text',
                 value: 'אבל עם כל הכבוד לקוריאה, הרגע שבאמת "ישבור את האינטרנט" הגיע כמה דקות קודם לכן:'
               }
             ],
             tag: '#text'
           },
           {
             attributes: [
               {
                 key: 'href',
                 value: 'https://www.haaretz.co.il/sport/other/1.5764850'
               }
             ],
             tag: 'a',
             content: [
               {
                 attributes: [
                   {
                     key: 'text',
                     value: ' פיטה טאופטופואה,'
                   }
                 ],
                 tag: '#text'
               }
             ]
           },
           {
             attributes: [
               {
                 key: 'text',
                 value: ' לוחם הטקוואנדו שייצג את טונגה בריו והעפיל גם למשחקי פיונג\'צאנג כגולש סקי, נשא שוב את הדגל - ושוב עלה בחצאית מסורתית וללא חולצה, כשפלג גופו העליון משוח בשמן, חרף התנאים הקרירים. שיהיה לו בהצלחה בתחרויות.'
               }
             ],
             tag: '#text'
           }
         ]
       },
       {
         content: '<blockquote class="twitter-tweet" data-lang="he"><p lang="en" dir="ltr">He&#39;s done it again! Surely he must be freezing! 😳<a href="https://twitter.com/PitaTaufatofua?ref_src=twsrc%5Etfw">@PitaTaufatofua</a> looks even more oiled-up than he did at Rio 2016! 😂 <a href="https://t.co/En25KyaRIe">pic.twitter.com/En25KyaRIe</a></p>&mdash; Eurosport UK (@Eurosport_UK) <a href="https://twitter.com/Eurosport_UK/status/961937936819347457?ref_src=twsrc%5Etfw">9 בפברואר 2018</a></blockquote>',
         embedType: 'single tweet',
         elementType: 'embedElement',
         inputTemplate: 'com.polobase.TwitterEmbed',
         contentId: '7.7386950',
         contentName: 'פיטה'
       }
     ],
     inputTemplate: 'com.htz.StandardArticle',
     contentId: '1.5806192',
     contentName: 'קוריאה המאוחדת ואתלט נטול חולצה בלטו בטקס הפתיחה של משחקי החורף'
   },
   {
     id: 'haaretz.co.il.web.textlink.1',
     className: 'ad--d h-hidden h-tar',
     audianceTarget: 'all',
     hideOnSite: false,
     inputTemplate: 'com.polobase.DfpBannerElement',
     contentId: '7.3539480',
     contentName: 'haaretz.co.il.web.textlink.1'
   },
   {
     inputTemplate: 'com.mouse.ChronicalBoardElement',
     contentId: '7.3982349',
     contentName: 'Chronicles Board'
   },
   {
     contentLists: [
       {
         inputTemplate: 'com.mouse.StoryRelatedAndReviewsElement',
         contentId: '7.3982351',
         contentName: 'Story Relates And Reviews Element'
       }
     ],
     viewMode: 'mousecontext',
     hideOnSite: false,
     inputTemplate: 'com.tm.ElementGroup',
     contentId: '7.4526763',
     contentName: 'ביקורת וכתבות - עכבר העיר'
   },
   {
     id: 'haaretz.co.il.web.inread',
     className: 'inread',
     audianceTarget: 'nonPaying',
     hideOnSite: false,
     inputTemplate: 'com.polobase.DfpBannerElement',
     contentId: '7.3631980',
     contentName: 'haaretz.co.il.web.inread'
   },
   {
     inputTemplate: 'com.polobase.OutbrainElement',
     contentId: '7.3539483',
     contentName: 'outbrain'
   },
   {
     inputTemplate: 'com.polobase.ClickTrackerBannersWrapper',
     contentId: '7.7206136',
     contentName: 'תוכן מקודם- עמוד כתבה- מתחת לאאוטבריין'
   },
   {
     inputTemplate: 'com.tm.CommentsElement',
     contentId: '7.7386931',
     contentName: 'Comments'
   },
   {
     contentLists: [
       {
         title: 'הכתבות הנקראות היום באתר',
         view: 'Manchester',
         hasPagination: false,
         hideOnSite: false,
         inputTemplate: 'com.tm.ListElement',
         contentId: '7.3603762',
         contentName: 'כתבות שאולי פספסתם בסוף דף הכתבה - לא לגעת בבקשה'
       }
     ],
     viewMode: 'general',
     hideOnSite: false,
     inputTemplate: 'com.tm.ElementGroup',
     contentId: '7.3603766',
     contentName: 'כתבות שאולי פספסתם בסוף דף הכתבה - גלובלי, לא לגעת'
   },
   {
     id: 'Haaretz.co.il.Web.LargeRectangle.1',
     style: 'text-align:center;',
     className: 'ad h-hidden',
     audianceTarget: 'all',
     hideOnSite: false,
     inputTemplate: 'com.polobase.DfpBannerElement',
     contentId: '7.3539487',
     contentName: 'Haaretz.co.il.Web.LargeRectangle.1'
   },
   {
     contentLists: [
       {
         inputTemplate: 'com.tm.element.List',
         contentId: '7.4606647',
         contentName: 'עכבר העיר - כרטיסים להופעות והצגות '
       }
     ],
     viewMode: 'mousecontext',
     hideOnSite: false,
     inputTemplate: 'com.tm.ElementGroup',
     contentId: '7.4484235',
     contentName: 'כרטיסים להופעות והצגות'
   },
 ],
   aside
:
 [
   {
     contentLists: [
       {
         inputTemplate: 'com.mouse.MouseTodayTodo',
         contentId: '7.3997579',
         contentName: 'מה עושים היום'
       }
     ],
     viewMode: 'mousecontext',
     hideOnSite: false,
     inputTemplate: 'com.tm.ElementGroup',
     contentId: '7.4483517',
     contentName: 'לוח אירועים עכבר העיר עמודה שמאלית - מדורי'
   },
   {
     contentLists: [
       {
         title: 'הכתבות המומלצות באתר',
         view: 'Tokyo',
         hasPagination: false,
         hideOnSite: false,
         inputTemplate: 'com.tm.ListElement',
         contentId: '7.4264542',
         contentName: 'הכתבות המומלצות באתר'
       },
       {
         contentLists: [
           {
             inputTemplate: 'com.polobase.ClickTrackerBannersWrapper',
             contentId: '7.3700163',
             contentName: '300.600 קליק טראקר הארץ עבור אד בלוקר'
           }
         ],
         viewMode: 'general',
         hideOnSite: false,
         inputTemplate: 'com.tm.ElementGroup',
         contentId: '7.3700162',
         contentName: '300.600 קליק טראקר הארץ עבור אד בלוקר'
       },
       {
         id: 'Haaretz.co.il.Web.HalfPage.1',
         style: 'margin-bottom:24px;',
         className: 'ad h-hidden js-dfp-resp-refresh',
         audianceTarget: 'all',
         hideOnSite: false,
         inputTemplate: 'com.polobase.DfpBannerElement',
         contentId: '7.3539470',
         contentName: 'Haaretz.co.il.Web.HalfPage.1'
       },
       {
         inputTemplate: 'com.tm.newsLetterQuickRegistrationController',
         contentId: '7.3598461',
         contentName: 'מפסק ראשי - הרשמה לדיוורים (פותח / סוגר בכל האתר)'
       },
       {
         inputTemplate: 'com.tm.newsLetterQuickRegistrationRespAuto',
         contentId: '7.3598459',
         contentName: 'הרשמה מהירה לדיוור - אוטומטי על פי מדור'
       },
       {
         contentLists: [
           {
             inputTemplate: 'com.tm.ArticleTagsElement',
             contentId: '7.3553014',
             contentName: 'tags'
           }
         ],
         viewMode: 'general',
         hideOnSite: false,
         inputTemplate: 'com.tm.ElementGroup',
         contentId: '7.3553236',
         contentName: 'Tags'
       },
       {
         contentLists: [],
         viewMode: 'general',
         hideOnSite: false,
         inputTemplate: 'com.tm.ElementGroup',
         contentId: '7.3561669',
         contentName: 'סקר חדש'
       },
       {
         title: 'עוד כתבות מומלצות',
         view: 'Bangkok',
         hasPagination: false,
         hideOnSite: false,
         inputTemplate: 'com.tm.ListElement',
         contentId: '7.3552989',
         contentName: 'עוד כתבות נקראות'
       },
     ],
     viewMode: 'general',
     hideOnSite: false,
     inputTemplate: 'com.tm.ElementGroup',
     contentId: '7.4332270',
     contentName: 'טור שמאל של דף כתבה 1'
   },
   {
     afterElementsIncludeHTML: '</div>',
     beforeElementsIncludeHTML: '<div class=\'ad\'>',
     contentLists: [
       {
         inputTemplate: 'com.polobase.OutbrainElement',
         contentId: '7.4286196',
         contentName: 'htz all AR_10'
       }
     ],
     viewMode: 'general',
     hideOnSite: false,
     inputTemplate: 'com.tm.ElementGroup',
     contentId: '7.4330826',
     contentName: 'תוכן שיווקי outbrain all sections'
   },
   {
     contentLists: [
       {
         inputTemplate: 'com.tm.GridElementGroup',
         contentId: '7.7381298',
         contentName: 'תוכן מקודם - רביעייה בעמודה שמאלית הארץ- חדש'
       }
     ],
     viewMode: 'general',
     hideOnSite: false,
     inputTemplate: 'com.tm.ElementGroup',
     contentId: '7.3539473',
     contentName: 'תוכן מקודם- רביעיה בעמודה שמאלית- הארץ '
   },
   {
     contentLists: [
       {
         contentLists: [
           {
             inputTemplate: 'com.polobase.ClickTrackerBannersWrapper',
             contentId: '7.3700160',
             contentName: '300.250 קליק טראקר הארץ עבור אד בלוקר'
           }
         ],
         viewMode: 'general',
         hideOnSite: false,
         inputTemplate: 'com.tm.ElementGroup',
         contentId: '7.3700154',
         contentName: '300.250 קליק טראקר הארץ עבור אד בלוקר'
       },
       {
         id: 'Haaretz.co.il.Web.Box.1',
         className: 'ad js-dfp-resp-refresh placeholder--250--l-to-xl placeholder--60—s placeholder--90—m ',
         audianceTarget: 'all',
         hideOnSite: false,
         inputTemplate: 'com.polobase.DfpBannerElement',
         contentId: '7.3602750',
         contentName: 'HomePage Haaretz.co.il.Web.Box.1'
       },
       {
         contentLists: [
           {
             view: 'Bangkok',
             hasPagination: false,
             hideOnSite: false,
             inputTemplate: 'com.tm.ListElement',
             contentId: '7.3605417',
             contentName: 'עוד כתבות נקראות'
           }
         ],
         viewMode: 'general',
         hideOnSite: false,
         inputTemplate: 'com.tm.ElementGroup',
         contentId: '7.3607059',
         contentName: 'עוד כתבות נקראות'
       },
       {
         id: 'Haaretz.co.il.Web.Box.2',
         className: 'ad h-hidden js-dfp-resp-refresh',
         audianceTarget: 'all',
         hideOnSite: false,
         inputTemplate: 'com.polobase.DfpBannerElement',
         contentId: '7.3539478',
         contentName: 'Haaretz.co.il.Web.Box.2'
       },
       {
         contentLists: [
           {
             title: 'מתכונים לחנוכה',
             view: 'HongKong',
             hasPagination: false,
             hideOnSite: false,
             inputTemplate: 'com.tm.ListElement',
             contentId: '7.4174431',
             contentName: 'מתכונים לחנוכה'
           }
         ],
         viewMode: 'general',
         hideOnSite: false,
         inputTemplate: 'com.tm.ElementGroup',
         contentId: '7.4174430',
         contentName: 'מתכונים לחנוכה'
       },
       {
         contentLists: [
           {
             title: 'חשיפה: בלוג הצילום',
             view: 'HongKong',
             hasPagination: false,
             hideOnSite: false,
             inputTemplate: 'com.tm.ListElement',
             contentId: '7.3605024',
             contentName: 'בלוג צילום'
           },
           {
             title: 'מתכונים לחנוכה',
             view: 'HongKong',
             hasPagination: false,
             hideOnSite: false,
             inputTemplate: 'com.tm.ListElement',
             contentId: '7.3735340',
             contentName: 'מתכונים לחנוכה'
           },
           {
             title: 'הפוסט החם בבלוגים',
             view: 'HongKong',
             hasPagination: false,
             hideOnSite: false,
             inputTemplate: 'com.tm.ListElement',
             contentId: '7.3604506',
             contentName: 'הפוסט החם בבלוגים'
           },
           {
             title: 'הכתבה הנקראת בספורט',
             view: 'Bangkok',
             hasPagination: false,
             hideOnSite: false,
             inputTemplate: 'com.tm.ListElement',
             contentId: '7.3619974',
             contentName: 'אובייקט ספורט בדף כתבה'
           }
         ],
         viewMode: 'general',
         hideOnSite: false,
         inputTemplate: 'com.tm.ElementGroup',
         contentId: '7.3605023',
         contentName: 'בלוג צילום + בלוגיה + ספורט'
       },
       {
         inputTemplate: 'com.polobase.OutbrainElement',
         contentId: '7.3551211',
         contentName: 'side-outbrain'
       },
       {
         contentLists: [],
         viewMode: 'general',
         hideOnSite: false,
         inputTemplate: 'com.tm.ElementGroup',
         contentId: '7.3597357',
         contentName: 'פיד הפייסבוק של האר'
       }
     ],
     viewMode: 'general',
     hideOnSite: false,
     inputTemplate: 'com.tm.ElementGroup',
     contentId: '7.4332277',
     contentName: 'טור שמאל של דף כתבה 2'
   }
 ],
   main
:
 [
   {
     inputTemplate: 'com.tm.PageTitle',
     contentId: '7.3550774',
     contentName: 'Section Page Title'
   },
   {
     inputTemplate: 'com.htz.ArticleHeaderElement',
     contentId: '7.3550773',
     contentName: 'Article Element'
   }
 ],
   bottom
:
 [
   {
     view: 'Zagreb',
     hasPagination: false,
     hideOnSite: false,
     inputTemplate: 'com.tm.ListElement',
     contentId: '7.3611812',
     contentName: 'אולי פספסתם בסוף כתבה'
   }
 ],
   footer
:
 [
   {
     code: '<script> setTimeout(function() { $(document).ready( function() { if (typeof UllUtil !== \'undefined\') { UllUtil.init(new Date(2018, 1, 1)); } }); }, 3000); </script>',
     hideOnSite: false,
     inputTemplate: 'com.tm.HtmlElement',
     contentId: '7.7358567',
     contentName: 'uliel initialization script'
   },
   {
     headList: [
       {
         inputTemplate: 'com.polobase.Pair',
         contentId: '1.1154392',
         contentName: 'מערכת'
       },
       {
         inputTemplate: 'com.polobase.Pair',
         contentId: '1.680951',
         contentName: 'הנהלה'
       },
       {
         inputTemplate: 'com.polobase.Pair',
         contentId: '1.1435828',
         contentName: 'אודות הארץ'
       },
       {
         inputTemplate: 'com.polobase.Pair',
         contentId: '1.1532898',
         contentName: 'דרושים'
       },
       {
         inputTemplate: 'com.polobase.Pair',
         contentId: '1.1470980',
         contentName: 'צור קשר'
       },
       {
         inputTemplate: 'com.polobase.Pair',
         contentId: '1.1469338',
         contentName: '<b>עשה מינוי</b>'
       },
       {
         inputTemplate: 'com.polobase.Pair',
         contentId: '1.4305285',
         contentName: 'ביטול מינוי דיגיטלי'
       },
       {
         inputTemplate: 'com.polobase.Pair',
         contentId: '1.1991734',
         contentName: 'שאלות ותשובות'
       },
       {
         inputTemplate: 'com.polobase.Pair',
         contentId: '1.2003793',
         contentName: '<b>פרסם אצלנו</b>'
       }
     ],
     columns: [
       {
         inputTemplate: 'com.tm.FooterColumnElement',
         contentId: '1.1158330',
         contentName: 'מדורים'
       },
       {
         inputTemplate: 'com.tm.FooterColumnElement',
         contentId: '1.1470651',
         contentName: 'כלים שימושיים'
       },
       {
         inputTemplate: 'com.tm.FooterColumnElement',
         contentId: '1.1154103',
         contentName: 'עכבר העיר'
       },
       {
         inputTemplate: 'com.tm.FooterColumnElement',
         contentId: '1.1156668',
         contentName: 'TheMarker'
       },
       {
         inputTemplate: 'com.tm.FooterColumnElement',
         contentId: '1.1445389',
         contentName: 'שיתופי פעולה'
       }
     ],
     creditList: [
       {
         inputTemplate: 'com.polobase.Pair',
         contentId: '1.680954',
         contentName: 'Web design by Roni Arie'
       }
     ],
     inputTemplate: 'com.tm.FooterElement',
     contentId: '7.1283189',
     contentName: 'Haaretz Footer'
   },
 ]
}}/>
```
