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
      { key: 'מערכת', value: 'https://www.haaretz.co.il/misc/editors', },
      { key: 'הנהלה', value: 'https://www.haaretz.co.il/misc/management', },
      { key: 'אודות הארץ', value: 'https://www.haaretz.co.il/misc/about-haaretz', },
      { key: 'דרושים', value: 'https://www.haaretz.co.il/misc/jobs', },
      { key: 'צור קשר', value: 'https://www.haaretz.co.il/misc/contact-us', },
      { key: 'עשה מנוי', value: 'https://www.haaretz.co.il/promotions-page', },
      { key: 'צור קשר', value: 'https://www.haaretz.co.il/misc/contact-us', },
      { key: 'שאלות ותשובות', value: 'https://www.haaretz.co.il/misc/faq', },
      {
        key: 'פרסם אצלנו',
        value: 'https://www.haaretz.co.il/st/c/prod/global/mediaKit/haaretzHeb.html',
      },
    ],
    columns: [
      { key: 'מערכת', value: 'https://www.haaretz.co.il/misc/editors', },
      { key: 'הנהלה', value: 'https://www.haaretz.co.il/misc/management', },
      { key: 'אודות הארץ', value: 'https://www.haaretz.co.il/misc/about-haaretz', },
      { key: 'דרושים', value: 'https://www.haaretz.co.il/misc/jobs', },
      { key: 'צור קשר', value: 'https://www.haaretz.co.il/misc/contact-us', },
      { key: 'עשה מנוי', value: 'https://www.haaretz.co.il/promotions-page', },
      { key: 'צור קשר', value: 'https://www.haaretz.co.il/misc/contact-us', },
      { key: 'שאלות ותשובות', value: 'https://www.haaretz.co.il/misc/faq', },
      {
        key: 'פרסם אצלנו',
        value: 'https://www.haaretz.co.il/st/c/prod/global/mediaKit/haaretzHeb.html',
      },
    ],
    // credit:,
    // toolbox: ,
  }),

  OsakaList: () => ({
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
