import * as cheerio from 'cheerio';

const isElementExists = (element): boolean => {
  return element && element.length;
};

const isAttrExistsInElement = (element, attrName: string): boolean => {
  return isElementExists(element) && element.attr(attrName) !== undefined;
};

export class BookParser {
  private $: CheerioStatic;
  // $('#info') 中的相关属性
  private attrs: Map<string, string>;

  constructor(html) {
    this.$ = cheerio.load(html);
    const infoArray = this.$('#info')
      .text()
      .split('\n')
      .filter(v => v.trim() !== '')
      .map(item => item.trim());
    this.attrs = new Map();
    infoArray.forEach(v => {
      const [key, value] = v.split(':');
      this.attrs.set(key, value);
    });
  }

  // 中文名
  get title() {
    const rawTitle = this.$('head > title').text();
    const title = rawTitle.substring(0, rawTitle.indexOf(' (豆瓣)')).trim();
    return title;
  }

  // 原作名
  get originalTitle() {
    const title = this.attrs.get('原作名');
    if (title) {
      return title.trim();
    }
    return '';
  }

  // 副标题
  get subtitle() {
    const title = this.attrs.get('副标题');
    if (title) {
      return title.trim();
    }
    return '';
  }

  // 出版日期
  get pubdate() {
    const date = this.attrs.get('出版年');
    if (date) {
      return date.trim();
    }
    return '';
  }

  // 出版年份
  get year() {
    const str = this.attrs.get('出版年');
    if (str && str.trim().length >= 4) {
      const year = Number(str.trim().substr(0, 4));
      return isNaN(year) ? undefined : year;
    }
  }

  // 封面
  get cover() {
    const element = this.$('#mainpic > a > img');
    if (isAttrExistsInElement(element, 'src')) {
      return element.attr('src');
    }
    return;
  }

  // 评分
  get ratingValue() {
    const element = this.$('strong[property="v:average"]');
    if (isElementExists(element) && element.text().trim()) {
      return Number(element.text());
    }
  }

  // 评价人数
  get ratingCount() {
    const element = this.$('span[property="v:votes"]');
    // 如果没有评分，不记录人数
    if (!this.ratingValue) {
      return;
    }
    if (isElementExists(element) && element.text().trim()) {
      return Number(element.text());
    }
  }

  // 评一星到五星的人数权重
  get ratingOnWeight() {
    if (!this.ratingValue) {
      return;
    }
    const element = this.$('span[class="rating_per"]');
    if (element && element.length === 5) {
      return this.$('span[class="rating_per"]')
        .text()
        .split('%')
        .slice(0, -1)
        .reverse()
        .join(',');
    }
  }
}
