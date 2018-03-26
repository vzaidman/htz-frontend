const mocks = {
  CommentsElement: () => ({
    comments: [
      {
        commentId: '19.1676',
        author: 'גכנגכנ',
        title: '',
        commentText: 'כגנגכנ\n<b>כגנגכנ<i>כגנגכנ</i></b>',
        publishingDateForDisplay: '11:48 06.02.2018',
        publishingDateSortable: '20180206114830',
        isEditorPick: 'false',
        subComments: null,
      },
      {
        commentId: '19.1614',
        author: 'מתן',
        title: 'מתקפות סייבר',
        commentText:
          "בשנים האחרונות אנחנו שומעים שוב ושוב על מתקפות סייבר באמצעות תוכנות זדוניות, התקני USB נגועים ופישינג ממוקד באמצעות אימיילים, אבל אלה רחוקים מלהיות ערוצי התקיפה היחידים, כפי שהדגימו חוקרים מאוניברסיטת תל אביב והטכניון לאחרונה. המחקר של ד&quot;ר ערן טרומר ואיתמר פיפמן מאוניברסיטת תל אביב ודניאל גנקין מהטכניון ואונ' ת&quot;א, מגלה שעם הציוד והתוכנה הנכונים, בצירוף האלגוריתמים המתאימים, לפעמים כל מה שצריך לעשות הוא להניח את היד על המחשב של הקורבן, כאילו בהיסח הדעת, לכמה שניות כדי לחשוף את מפתחות ההצפנה שלו.",
        publishingDateForDisplay: '12:19 29.09.2016',
        publishingDateSortable: '20160929121923',
        isEditorPick: 'false',
        subComments: null,
      },
    ],
    commentsPlusRate: {
      19.1614: 25,
    },
    commentsMinusRate: {
      19.1614: 5,
    },
    totalHits: 2,
  }),

  addComment: () => ({
    newCommentId: '12345',
    hash: 'abcde',
  }),

  Footer: () => ({
    head: [
      { text: 'מערכת', href: 'https://www.haaretz.co.il/misc/editors', },
      { text: 'הנהלה', href: 'https://www.haaretz.co.il/misc/management', },
      { text: 'אודות הארץ', href: 'https://www.haaretz.co.il/misc/about-haaretz', },
      { text: 'דרושים', href: 'https://www.haaretz.co.il/misc/jobs', },
      { text: 'צור קשר', href: 'https://www.haaretz.co.il/misc/contact-us', },
      { text: 'עשה מנוי', href: 'https://www.haaretz.co.il/promotions-page', },
      { text: 'ביטול מנוי דיגיטלי', href: 'https://www.haaretz.co.il/misc/contact-us', },
      { text: 'שאלות ותשובות', href: 'https://www.haaretz.co.il/misc/faq', },
      {
        text: 'פרסם אצלנו',
        href: 'https://www.haaretz.co.il/st/c/prod/global/mediaKit/haaretzHeb.html',
      },
    ],
    columns: [
      {
        title: 'מדורים',
        combineWithNextColumn: true,
        items: [
          {
            text: 'חדשות',
            href: 'https://www.haaretz.co.il/news',
          },
          {
            text: 'סרטים מומלצים',
            href: 'https://www.haaretz.co.il/misc/tags/movies-1.1653396',
          },
          {
            text: 'מזג אוויר',
            href: 'https://www.haaretz.co.il/news/weather',
          },
          {
            text: 'ספורט',
            href: 'https://www.haaretz.co.il/sport',
          },
          {
            text: 'פורים 2018',
            href: 'https://www.haaretz.co.il/gallery/purim',
          },
          {
            text: 'תחרות הסיפור הקצר',
            href: 'https://www.haaretz.co.il/short-story/1.5727927',
          },
        ],
      },
      {
        title: 'Haaretz.com',
        combineWithNextColumn: false,
        items: [
          {
            text: 'Israel - Syria rebels',
            href:
              'https://www.haaretz.com/israel-news/with-eye-on-iran-israel-increases-military-support-for-syrian-rebels-1.5826348',
          },
          {
            text: 'Freemasons',
            href:
              'https://www.haaretz.com/israel-news/MAGAZINE-not-a-cult-the-freemasons-want-you-unless-you-you-1.5824127',
          },
          {
            text: 'Kurds - Syria',
            href:
              'https://www.haaretz.com/middle-east-news/syria/.premium-with-nowhere-else-to-turn-syrian-kurds-will-have-to-embrace-assad-1.5828926',
          },
          {
            text: 'Netanyahu graft',
            href:
              'https://www.haaretz.com/israel-news/nix-sara-netanyahu-case-get-top-post-pm-s-confidant-offered-judge-1.5832137',
          },
          {
            text: 'Israel news',
            href: 'https://www.haaretz.com/israel-news',
          },
          {
            text: 'Middle East',
            href: 'https://www.haaretz.com/middle-east-news',
          },
          {
            text: 'Travel in Israel',
            href: 'https://www.haaretz.com/israel-news/travel',
          },
          {
            text: 'Jewish World',
            href: 'https://www.haaretz.com/jewish',
          },
          {
            text: 'Shabbat Times',
            href: 'https://www.haaretz.com/misc/shabbat-times',
          },
        ],
      },
      {
        title: 'כלים שימושיים',
        combineWithNextColumn: false,
        items: [
          {
            text: 'המייל האדום',
            href: 'https://www.haaretz.co.il/misc/redemail',
          },
          {
            text: 'מדיניות פרטיות',
            href: 'https://www.haaretz.co.il/misc/privacy-policy',
          },
          {
            text: 'חלון מבזקים',
            href: 'https://www.haaretz.co.il/misc/widget',
          },
          {
            text: 'ארכיון הארץ',
            href: 'https://www.haaretz.co.il/misc/1.767350',
          },
          {
            text: 'דיוור הארץ',
            href: 'https://www.haaretz.co.il/personal-area/newsletter',
          },
          {
            text: 'כל כותרות היום',
            href: 'https://www.haaretz.co.il/misc/all-headlines',
          },
          {
            text: 'צור קשר',
            href: 'https://www.haaretz.co.il/misc/contact-us',
          },
          {
            text: 'מודעות אבל',
            href: 'https://www.haaretz.co.il/misc/1.2768082',
          },
          {
            text: 'תנאי שימוש',
            href: 'https://www.haaretz.co.il/misc/terms-of-use',
          },
          {
            text: 'מינוי הארץ',
            href: 'https://www.haaretz.co.il/promotions-page',
          },
          {
            text: 'מינוי לעיתון',
            href: 'https://www.haaretz.co.il/misc/menuim',
          },
          {
            text: 'כנסים',
            href: 'http://conferences.themarker.com/',
          },
          {
            text: 'נגישות',
            href: 'https://www.haaretz.co.il/misc/accessibility',
          },
        ],
      },
      {
        title: 'עכבר העיר',
        combineWithNextColumn: false,
        items: [
          {
            text: 'פורים 2018',
            href: 'https://www.haaretz.co.il/gallery/purim',
          },
          {
            text: 'תחפושות לפורים לילדים',
            href: 'https://www.haaretz.co.il/gallery/purim/1.3156076',
          },
          {
            text: 'תחפושות לתינוקות',
            href: 'https://www.haaretz.co.il/gallery/purim/1.3155900',
          },
          {
            text: 'מתכונים לאוזני המן',
            href: 'https://www.haaretz.co.il/food/1.3156002',
          },
          {
            text: 'תהלוכות עדלאידע בפורים',
            href: 'https://www.haaretz.co.il/gallery/purim/1.3155908',
          },
          {
            text: 'מסיבות פורים',
            href: 'https://www.haaretz.co.il/gallery/night-life/1.3155822',
          },
        ],
      },
      {
        title: 'TheMarker',
        combineWithNextColumn: true,
        items: [
          {
            text: 'שוק ההון',
            href: 'https://www.themarker.com/markets',
          },
          {
            text: 'חדשות',
            href: 'https://www.themarker.com/allnews',
          },
          {
            text: 'גלובל',
            href: 'https://www.themarker.com/wallstreet',
          },
          {
            text: 'נדל"ן',
            href: 'https://www.themarker.com/realestate',
          },
          {
            text: 'TechNation',
            href: 'https://www.themarker.com/technation',
          },
          {
            text: 'MarkerWeek',
            href: 'https://www.themarker.com/markerweek',
          },
        ],
      },
      {
        title: 'Finance',
        combineWithNextColumn: false,
        items: [
          {
            text: 'ת"א 35',
            href: 'http://finance.themarker.com/home/?type=1&documentId=142',
          },
          {
            text: 'ת"א 125',
            href: 'http://finance.themarker.com/home/?type=1&documentId=137',
          },
          {
            text: 'מניית טבע',
            href: 'http://finance.themarker.com/quote/?mador=1&documentId=629014',
          },
          {
            text: 'מניית בזק',
            href: 'http://finance.themarker.com/quote/?mador=1&documentId=230011',
          },
        ],
      },
      {
        title: 'שיתופי פעולה',
        combineWithNextColumn: false,
        items: [
          {
            text: 'פגסוס טיולים',
            href: 'https://www.haaretz.co.il/labels/pegasus',
          },
          {
            text: 'בית אבי חי',
            href: 'https://www.haaretz.co.il/labels/avi-chai',
          },
          {
            text: 'השקעות נדל"ן בחו"ל',
            href: 'https://www.themarker.com/labels/iintoo',
          },
          {
            text: 'ויטרינה',
            href: 'https://www.vitrina.co.il/',
          },
          {
            text: 'SUPERMARKER – צרכנות פיננסית',
            href: 'https://supermarker.themarker.com/',
          },
          {
            text: 'אופנה',
            href: 'https://www.onlife.co.il/category/fashion',
          },
        ],
      },
    ],
    credit: [ { text: 'מערכת', href: 'https://www.haaretz.co.il/misc/editors', }, ],
    toolbox: [
      { text: 'חיבור מינוי דיגיטלי', href: 'https://www.haaretz.co.il/misc/entitlement', },
      { text: 'עדכונים במייל', href: 'https://www.haaretz.co.il/personal-area/newsletter', },
      { text: 'קנה מינוי דיגיטלי', href: 'https://www.haaretz.co.il/promotions-page', },
      {
        text: 'קנה מינוי לעיתון',
        href:
          'https://secure.pulseem.com/clientpages/07092017151238sa6045.html?v=89a6c973-41b3-4181-811c-a459ac50164e_',
      },
      {
        text: 'פרסם אצלנו',
        href: 'https://www.haaretz.co.il/st/c/prod/global/mediaKit/haaretzHeb.html',
      },
      { text: 'לפרסום בעיתון', href: 'mailto: moshem@haaretz.co.il', },
      { text: 'שירות למנויים', href: 'https://www.haaretz.co.il/personal-area/my-account', },
    ],
  }),

  List: () => ({
    title: 'הונג קונג',
    listId: '7.7474',
    viewtype: 'Tokyo',
    isDuplicationAllowed: true,
    pageIndex: 0,
    pageCount: 1,
    items: [
      {
        id: '1.6712',
        path: 'http://eran.haaretz.co.il/1.6712',
        title:
          '"לעבור את הגבול": מלודרמה רומנטית פוליטית שתוקפת את מארין לה פן',
        image: {
          alt: 'cat',
          path:
            'https://images.haarets.co.il/image/upload/w_388,h_291,x_3,y_4,c_crop,g_north_west/w_1,h_1,q_auto,c_fill,f_auto/fl_lossy.any_format.preserve_transparency.progressive:none/v1519208144/1.6651.4030303706.gif',
        },
      },
      {
        id: '1.2597',
        path: 'http://eran.haaretz.co.il/news/world/LIVE-1.2597',
        title: 'לייב בלוג כותרות ראשיות',
        image: {
          alt: 'test',
          path:
            'https://images.haarets.co.il/image/upload/w_1,h_1,q_auto,c_fill,f_auto/fl_any_format.preserve_transparency.progressive:none/v1508081470/1.5503.3181432620.jpg',
        },
      },
      {
        id: '1.1210',
        path: 'http://eran.themarker.com:8080/1.1210',
        title: 'ועדת חסויים תדון בהעברת תקציב מחר בהפסקת התה',
        image: {
          alt: 'Fries',
          path:
            'https://images.haarets.co.il/image/upload/w_1,h_1,q_auto,c_fill,f_auto/fl_any_format.preserve_transparency.progressive:none/v1502969025/1.1225.639921243.jpg',
        },
      },
      {
        id: '1.1204',
        path: 'http://eran.haaretz.co.il/.premium-1.1204',
        title: 'מקומות בארץ שבהם תקבלו דונם קרקע בחינם לבנות בית',
        image: {
          alt: 'obama',
          path:
            'https://images.haarets.co.il/image/upload/w_1,h_1,q_auto,c_fill,f_auto/fl_any_format.preserve_transparency.progressive:none/v1502965886/1.1228.3447786819.jpg',
        },
      },
    ],
  }),
};

export default mocks;
