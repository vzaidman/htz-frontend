const dummyData = {
  purchasePage: {
    pageNumber: 2,
    userBannerMessage: [ 'המנוי שלך תקף עד ל 1.1.1800', ],
    pastDebts: [
      { productNumber: 123, debt: 100, },
      { productNumber: 125, debt: 150, },
    ],
    creditCardsDetails: [
      {
        companyCode: 5,
        fourDigits: '9542',
      },
    ],
    slots: [
      {
        subscriptionName: 'TM',
        couponExist: true,
        products: [
          {
            productTitle: 'main',
            pricingHead: 'החל מ-4.90 בחודש הראשון',
            pricingYearly: [ '4.90 ש"ח בחודש הראשון', '+420 ש"ח ליתרת השנה', ],
            pricingMonthly: [ '45 ש"ח לחודש', ],
            offerList: [
              {
                paymentData: {
                  prices: [ 50, 250, ],
                  productID: 243,
                  saleCode: 2417,
                  promotionNumber: 6236,
                  cgtype: 'payment_heb1',
                },
                title: 'מינוי שנתי',
                text: [ 'בחודש הראשון', 'ואז 420 ש"ח ליתרת השנה', ],
                price: '4.90',
                buttonText: 'המשך',
                disclaimer: [
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              'כדי ליהנות מתנאי המסלול יש להעביר בתוך שבועיים לשירות הלקוחות צילום מקור של תעודת סטודנט/חוגר בתוקף. ',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              'במסלול חודשי, העסקה היא מתמשכת, והתשלום בסך ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '35 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' (מחיר הטבה לשנה הראשונה) יגבה בכל חודש. עם תום השנה הראשונה ייגבה מדי חודש מחיר המחירון המעודכן שעומד כעת על ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '45 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' בחודש. אם יחול שינוי בתעריף, תישלח על כך הודעה מראש בדואר האלקטרוני.',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value:
                                  'ניתן לבטל את המינוי בכל עת באמצעות פנייה ',
                              },
                            ],
                            tag: '#text',
                          },
                          {
                            attributes: [
                              {
                                key: 'href',
                                value:
                                  'http://www.haaretz.co.il/misc/contact-us',
                              },
                              {
                                key: 'target',
                                value: '_blank',
                              },
                            ],
                            tag: 'a',
                            content: [
                              {
                                attributes: [
                                  {
                                    key: 'text',
                                    value: 'לשירות הלקוחות שלנו',
                                  },
                                ],
                                tag: '#text',
                              },
                            ],
                          },
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '.',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [],
                            tag: 'u',
                            content: [
                              {
                                attributes: [
                                  {
                                    key: 'text',
                                    value: 'הבהרה חשובה',
                                  },
                                ],
                                tag: '#text',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ': על מנת להמשיך וליהנות מהנחת חייל/סטודנט גם בשנה השנייה (רק ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '35 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' במסלול חודשי) ואילך יש להעביר לשירות הלקוחות צילום מקור של תעודת סטודנט/חוגר בתוקף עד 14 יום לפני תחילת השנה השנייה.',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                ],
                isRecommended: true,
                bannerText: 'חסכו 115 ש"ח',
                type: 'yearly',
              },
              {
                paymentData: {
                  prices: [ 50, 250, ],
                  productID: 243,
                  saleCode: 2417,
                  promotionNumber: 6236,
                  cgtype: 'payment_heb1',
                },
                title: 'מינוי מינוי חודשי',
                text: [ 'בחודש הראשון', 'ואז 420 ש"ח ליתרת השנה', ],
                price: '4.90',
                buttonText: 'המשך',
                disclaimer: [
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              'כדי ליהנות מתנאי המסלול יש להעביר בתוך שבועיים לשירות הלקוחות צילום מקור של תעודת סטודנט/חוגר בתוקף. ',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              'במסלול חודשי, העסקה היא מתמשכת, והתשלום בסך ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '35 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' (מחיר הטבה לשנה הראשונה) יגבה בכל חודש. עם תום השנה הראשונה ייגבה מדי חודש מחיר המחירון המעודכן שעומד כעת על ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '45 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' בחודש. אם יחול שינוי בתעריף, תישלח על כך הודעה מראש בדואר האלקטרוני.',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value:
                                  'ניתן לבטל את המינוי בכל עת באמצעות פנייה ',
                              },
                            ],
                            tag: '#text',
                          },
                          {
                            attributes: [
                              {
                                key: 'href',
                                value:
                                  'http://www.haaretz.co.il/misc/contact-us',
                              },
                              {
                                key: 'target',
                                value: '_blank',
                              },
                            ],
                            tag: 'a',
                            content: [
                              {
                                attributes: [
                                  {
                                    key: 'text',
                                    value: 'לשירות הלקוחות שלנו',
                                  },
                                ],
                                tag: '#text',
                              },
                            ],
                          },
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '.',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [],
                            tag: 'u',
                            content: [
                              {
                                attributes: [
                                  {
                                    key: 'text',
                                    value: 'הבהרה חשובה',
                                  },
                                ],
                                tag: '#text',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ': על מנת להמשיך וליהנות מהנחת חייל/סטודנט גם בשנה השנייה (רק ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '35 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' במסלול חודשי) ואילך יש להעביר לשירות הלקוחות צילום מקור של תעודת סטודנט/חוגר בתוקף עד 14 יום לפני תחילת השנה השנייה.',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                ],
                isRecommended: false,
                bannerText: 'חסכו 115 ש"ח',
                type: 'monthly',
              },
            ],
            cancelButtonText: 'ניתן לבטל בכל עת',
          },
        ],
      },
      {
        subscriptionName: 'BOTH',
        couponExist: true,
        products: [
          {
            productTitle: 'main',
            pricingHead: 'החל מ-4.90 בחודש הראשון',
            pricingYearly: [ '4.90 ש"ח בחודש הראשון', '+420 ש"ח ליתרת השנה', ],
            pricingMonthly: [ '45 ש"ח לחודש', ],
            offerList: [
              {
                paymentData: {
                  prices: [ 50, 250, ],
                  productID: 243,
                  saleCode: 2417,
                  promotionNumber: 6236,
                  cgtype: 'payment_heb1',
                },
                title: 'מינוי שנתי',
                text: [ 'בחודש הראשון', 'ואז 420 ש"ח ליתרת השנה', ],
                price: '4.90',
                buttonText: 'המשך',
                disclaimer: [
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              'כדי ליהנות מתנאי המסלול יש להעביר בתוך שבועיים לשירות הלקוחות צילום מקור של תעודת סטודנט/חוגר בתוקף. ',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              'במסלול חודשי, העסקה היא מתמשכת, והתשלום בסך ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '35 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' (מחיר הטבה לשנה הראשונה) יגבה בכל חודש. עם תום השנה הראשונה ייגבה מדי חודש מחיר המחירון המעודכן שעומד כעת על ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '45 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' בחודש. אם יחול שינוי בתעריף, תישלח על כך הודעה מראש בדואר האלקטרוני.',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value:
                                  'ניתן לבטל את המינוי בכל עת באמצעות פנייה ',
                              },
                            ],
                            tag: '#text',
                          },
                          {
                            attributes: [
                              {
                                key: 'href',
                                value:
                                  'http://www.haaretz.co.il/misc/contact-us',
                              },
                              {
                                key: 'target',
                                value: '_blank',
                              },
                            ],
                            tag: 'a',
                            content: [
                              {
                                attributes: [
                                  {
                                    key: 'text',
                                    value: 'לשירות הלקוחות שלנו',
                                  },
                                ],
                                tag: '#text',
                              },
                            ],
                          },
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '.',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [],
                            tag: 'u',
                            content: [
                              {
                                attributes: [
                                  {
                                    key: 'text',
                                    value: 'הבהרה חשובה',
                                  },
                                ],
                                tag: '#text',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ': על מנת להמשיך וליהנות מהנחת חייל/סטודנט גם בשנה השנייה (רק ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '35 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' במסלול חודשי) ואילך יש להעביר לשירות הלקוחות צילום מקור של תעודת סטודנט/חוגר בתוקף עד 14 יום לפני תחילת השנה השנייה.',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                ],
                isRecommended: true,
                bannerText: 'חסכו 115 ש"ח',
                type: 'yearly',
              },
              {
                paymentData: {
                  prices: [ 50, 250, ],
                  productID: 243,
                  saleCode: 2417,
                  promotionNumber: 6236,
                  cgtype: 'payment_heb1',
                },
                title: 'מינוי מינוי חודשי',
                text: [ 'בחודש הראשון', 'ואז 420 ש"ח ליתרת השנה', ],
                price: '4.90',
                buttonText: 'המשך',
                disclaimer: [
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              'כדי ליהנות מתנאי המסלול יש להעביר בתוך שבועיים לשירות הלקוחות צילום מקור של תעודת סטודנט/חוגר בתוקף. ',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              'במסלול חודשי, העסקה היא מתמשכת, והתשלום בסך ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '35 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' (מחיר הטבה לשנה הראשונה) יגבה בכל חודש. עם תום השנה הראשונה ייגבה מדי חודש מחיר המחירון המעודכן שעומד כעת על ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '45 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' בחודש. אם יחול שינוי בתעריף, תישלח על כך הודעה מראש בדואר האלקטרוני.',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value:
                                  'ניתן לבטל את המינוי בכל עת באמצעות פנייה ',
                              },
                            ],
                            tag: '#text',
                          },
                          {
                            attributes: [
                              {
                                key: 'href',
                                value:
                                  'http://www.haaretz.co.il/misc/contact-us',
                              },
                              {
                                key: 'target',
                                value: '_blank',
                              },
                            ],
                            tag: 'a',
                            content: [
                              {
                                attributes: [
                                  {
                                    key: 'text',
                                    value: 'לשירות הלקוחות שלנו',
                                  },
                                ],
                                tag: '#text',
                              },
                            ],
                          },
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '.',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [],
                            tag: 'u',
                            content: [
                              {
                                attributes: [
                                  {
                                    key: 'text',
                                    value: 'הבהרה חשובה',
                                  },
                                ],
                                tag: '#text',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ': על מנת להמשיך וליהנות מהנחת חייל/סטודנט גם בשנה השנייה (רק ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '35 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' במסלול חודשי) ואילך יש להעביר לשירות הלקוחות צילום מקור של תעודת סטודנט/חוגר בתוקף עד 14 יום לפני תחילת השנה השנייה.',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                ],
                isRecommended: false,
                bannerText: 'חסכו 115 ש"ח',
                type: 'monthly',
              },
            ],
            cancelButtonText: 'ניתן לבטל בכל עת',
          },
        ],
      },
      {
        subscriptionName: 'HTZ',
        couponExist: false,
        products: [
          {
            productTitle: 'main',
            pricingHead: 'החל מ-4.90 בחודש הראשון',
            pricingYearly: [ '4.90 ש"ח בחודש הראשון', '+420 ש"ח ליתרת השנה', ],
            pricingMonthly: [ '45 ש"ח לחודש', ],
            offerList: [
              {
                paymentData: {
                  prices: [ 50, 250, ],
                  productID: 243,
                  saleCode: 2417,
                  promotionNumber: 6236,
                  cgtype: 'payment_heb1',
                },
                title: 'מינוי שנתי',
                text: [ 'בחודש הראשון', 'ואז 420 ש"ח ליתרת השנה', ],
                price: '4.90',
                buttonText: 'המשך',
                disclaimer: [
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              'כדי ליהנות מתנאי המסלול יש להעביר בתוך שבועיים לשירות הלקוחות צילום מקור של תעודת סטודנט/חוגר בתוקף. ',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              'במסלול חודשי, העסקה היא מתמשכת, והתשלום בסך ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '35 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' (מחיר הטבה לשנה הראשונה) יגבה בכל חודש. עם תום השנה הראשונה ייגבה מדי חודש מחיר המחירון המעודכן שעומד כעת על ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '45 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' בחודש. אם יחול שינוי בתעריף, תישלח על כך הודעה מראש בדואר האלקטרוני.',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value:
                                  'ניתן לבטל את המינוי בכל עת באמצעות פנייה ',
                              },
                            ],
                            tag: '#text',
                          },
                          {
                            attributes: [
                              {
                                key: 'href',
                                value:
                                  'http://www.haaretz.co.il/misc/contact-us',
                              },
                              {
                                key: 'target',
                                value: '_blank',
                              },
                            ],
                            tag: 'a',
                            content: [
                              {
                                attributes: [
                                  {
                                    key: 'text',
                                    value: 'לשירות הלקוחות שלנו',
                                  },
                                ],
                                tag: '#text',
                              },
                            ],
                          },
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '.',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [],
                            tag: 'u',
                            content: [
                              {
                                attributes: [
                                  {
                                    key: 'text',
                                    value: 'הבהרה חשובה',
                                  },
                                ],
                                tag: '#text',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ': על מנת להמשיך וליהנות מהנחת חייל/סטודנט גם בשנה השנייה (רק ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '35 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' במסלול חודשי) ואילך יש להעביר לשירות הלקוחות צילום מקור של תעודת סטודנט/חוגר בתוקף עד 14 יום לפני תחילת השנה השנייה.',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                ],
                isRecommended: true,
                bannerText: 'חסכו 115 ש"ח',
                type: 'monthly',
              },
              {
                paymentData: {
                  prices: [ 50, 250, ],
                  productID: 243,
                  saleCode: 2417,
                  promotionNumber: 6236,
                  cgtype: 'payment_heb1',
                },
                title: 'מינוי מינוי חודשי',
                text: [ 'בחודש הראשון', 'ואז 420 ש"ח ליתרת השנה', ],
                price: '4.90',
                buttonText: 'המשך',
                disclaimer: [
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              'כדי ליהנות מתנאי המסלול יש להעביר בתוך שבועיים לשירות הלקוחות צילום מקור של תעודת סטודנט/חוגר בתוקף. ',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              'במסלול חודשי, העסקה היא מתמשכת, והתשלום בסך ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '35 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' (מחיר הטבה לשנה הראשונה) יגבה בכל חודש. עם תום השנה הראשונה ייגבה מדי חודש מחיר המחירון המעודכן שעומד כעת על ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '45 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' בחודש. אם יחול שינוי בתעריף, תישלח על כך הודעה מראש בדואר האלקטרוני.',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value:
                                  'ניתן לבטל את המינוי בכל עת באמצעות פנייה ',
                              },
                            ],
                            tag: '#text',
                          },
                          {
                            attributes: [
                              {
                                key: 'href',
                                value:
                                  'http://www.haaretz.co.il/misc/contact-us',
                              },
                              {
                                key: 'target',
                                value: '_blank',
                              },
                            ],
                            tag: 'a',
                            content: [
                              {
                                attributes: [
                                  {
                                    key: 'text',
                                    value: 'לשירות הלקוחות שלנו',
                                  },
                                ],
                                tag: '#text',
                              },
                            ],
                          },
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '.',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [],
                            tag: 'u',
                            content: [
                              {
                                attributes: [
                                  {
                                    key: 'text',
                                    value: 'הבהרה חשובה',
                                  },
                                ],
                                tag: '#text',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ': על מנת להמשיך וליהנות מהנחת חייל/סטודנט גם בשנה השנייה (רק ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '35 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' במסלול חודשי) ואילך יש להעביר לשירות הלקוחות צילום מקור של תעודת סטודנט/חוגר בתוקף עד 14 יום לפני תחילת השנה השנייה.',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                ],
                isRecommended: false,
                bannerText: 'חסכו 115 ש"ח',
                type: 'yearly',
              },
            ],
            cancelButtonText: 'ניתן לבטל בכל עת',
          },
          {
            productTitle: 'מינוי סטודנטים',
            pricingHead: 'החל מ-3.90 בחודש הראשון',
            pricingYearly: [ '3.90 ש"ח בחודש הראשון', '+320 ש"ח ליתרת השנה', ],
            pricingMonthly: [ '35 ש"ח לחודש', ],
            offerList: [
              {
                paymentData: {
                  prices: [ 50, 250, ],
                  productID: 243,
                  saleCode: 2417,
                  promotionNumber: 6236,
                  cgtype: 'payment_heb1',
                },
                title: 'מינוי שנתי',
                text: [ 'בחודש הראשון', 'ואז 420 ש"ח ליתרת השנה', ],
                price: '3.90',
                buttonText: 'המשך',
                disclaimer: [
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              'כדי ליהנות מתנאי המסלול יש להעביר בתוך שבועיים לשירות הלקוחות צילום מקור של תעודת סטודנט/חוגר בתוקף. ',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              'במסלול חודשי, העסקה היא מתמשכת, והתשלום בסך ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '35 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' (מחיר הטבה לשנה הראשונה) יגבה בכל חודש. עם תום השנה הראשונה ייגבה מדי חודש מחיר המחירון המעודכן שעומד כעת על ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '45 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' בחודש. אם יחול שינוי בתעריף, תישלח על כך הודעה מראש בדואר האלקטרוני.',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value:
                                  'ניתן לבטל את המינוי בכל עת באמצעות פנייה ',
                              },
                            ],
                            tag: '#text',
                          },
                          {
                            attributes: [
                              {
                                key: 'href',
                                value:
                                  'http://www.haaretz.co.il/misc/contact-us',
                              },
                              {
                                key: 'target',
                                value: '_blank',
                              },
                            ],
                            tag: 'a',
                            content: [
                              {
                                attributes: [
                                  {
                                    key: 'text',
                                    value: 'לשירות הלקוחות שלנו',
                                  },
                                ],
                                tag: '#text',
                              },
                            ],
                          },
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '.',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [],
                            tag: 'u',
                            content: [
                              {
                                attributes: [
                                  {
                                    key: 'text',
                                    value: 'הבהרה חשובה',
                                  },
                                ],
                                tag: '#text',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ': על מנת להמשיך וליהנות מהנחת חייל/סטודנט גם בשנה השנייה (רק ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '35 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' במסלול חודשי) ואילך יש להעביר לשירות הלקוחות צילום מקור של תעודת סטודנט/חוגר בתוקף עד 14 יום לפני תחילת השנה השנייה.',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                ],
                isRecommended: true,
                bannerText: 'חסכו 315 ש"ח',
                type: 'yearly',
              },
              {
                paymentData: {
                  prices: [ 50, 250, ],
                  productID: 243,
                  saleCode: 2417,
                  promotionNumber: 6236,
                  cgtype: 'payment_heb1',
                },
                title: 'מינוי מינוי חודשי',
                text: [ 'בחודש הראשון', 'ואז 320 ש"ח ליתרת השנה', ],
                price: '3.90',
                buttonText: 'המשך',
                disclaimer: [
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              'כדי ליהנות מתנאי המסלול יש להעביר בתוך שבועיים לשירות הלקוחות צילום מקור של תעודת סטודנט/חוגר בתוקף. ',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              'במסלול חודשי, העסקה היא מתמשכת, והתשלום בסך ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '35 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' (מחיר הטבה לשנה הראשונה) יגבה בכל חודש. עם תום השנה הראשונה ייגבה מדי חודש מחיר המחירון המעודכן שעומד כעת על ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '45 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' בחודש. אם יחול שינוי בתעריף, תישלח על כך הודעה מראש בדואר האלקטרוני.',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value:
                                  'ניתן לבטל את המינוי בכל עת באמצעות פנייה ',
                              },
                            ],
                            tag: '#text',
                          },
                          {
                            attributes: [
                              {
                                key: 'href',
                                value:
                                  'http://www.haaretz.co.il/misc/contact-us',
                              },
                              {
                                key: 'target',
                                value: '_blank',
                              },
                            ],
                            tag: 'a',
                            content: [
                              {
                                attributes: [
                                  {
                                    key: 'text',
                                    value: 'לשירות הלקוחות שלנו',
                                  },
                                ],
                                tag: '#text',
                              },
                            ],
                          },
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '.',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    attributes: [],
                    tag: 'p',
                    content: [
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [],
                            tag: 'u',
                            content: [
                              {
                                attributes: [
                                  {
                                    key: 'text',
                                    value: 'הבהרה חשובה',
                                  },
                                ],
                                tag: '#text',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ': על מנת להמשיך וליהנות מהנחת חייל/סטודנט גם בשנה השנייה (רק ',
                          },
                        ],
                        tag: '#text',
                      },
                      {
                        attributes: [],
                        tag: 'strong',
                        content: [
                          {
                            attributes: [
                              {
                                key: 'text',
                                value: '35 ש"ח',
                              },
                            ],
                            tag: '#text',
                          },
                        ],
                      },
                      {
                        attributes: [
                          {
                            key: 'text',
                            value:
                              ' במסלול חודשי) ואילך יש להעביר לשירות הלקוחות צילום מקור של תעודת סטודנט/חוגר בתוקף עד 14 יום לפני תחילת השנה השנייה.',
                          },
                        ],
                        tag: '#text',
                      },
                    ],
                  },
                ],
                isRecommended: false,
                bannerText: 'חסכו 315 ש"ח',
                type: 'monthly',
              },
            ],
            cancelButtonText: 'ניתן לבטל בכל עת',
          },
        ],
      },
    ],
  },
};

export default dummyData;
