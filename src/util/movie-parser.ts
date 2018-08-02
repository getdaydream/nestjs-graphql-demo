import * as cheerio from 'cheerio';

const isElementExists = (element): boolean => {
  return element && element.length;
};

const isAttrExistsInElement = (element, attrName: string): boolean => {
  return isElementExists(element) && element.attr(attrName) !== undefined;
};

export class MovieParser {
  private $: CheerioStatic;
  // $('#info') 中电影的相关属性
  private attrs: Map<string, string>;

  constructor(html) {
    this.$ = cheerio.load(html);
    const infoArray = this.$('#info')
      .text()
      .split('\n')
      .filter(v => v !== '')
      .map(item => item.trim());
    this.attrs = new Map();
    infoArray.forEach(v => {
      const [key, value] = v.split(':');
      this.attrs.set(key, value);
    });
  }

  get id() {
    const element = this.$('meta[name="mobile-agent"]');
    if (isElementExists(element) && isAttrExistsInElement(element, 'content')) {
      const result = element.attr('content').split('/')[5];
      return isNaN(Number(result)) ? '' : result;
    }
    return '';
  }

  // 中文名
  get title() {
    const rawTitle = this.$('head > title').text();
    const title = rawTitle.substring(0, rawTitle.indexOf(' (豆瓣)')).trim();
    return title;
  }

  // 原名
  get originalTitle() {
    const element = this.$('#mainpic > a > img');
    if (isAttrExistsInElement(element, 'alt')) {
      if (element.attr('alt') !== this.title) {
        return element.attr('alt');
      }
    }
    return;
  }

  // 年代
  get year() {
    const element = this.$('span.year');
    if (isElementExists(element)) {
      const year = element.text().replace(/\(|\)/g, '');
      return isNaN(Number(year)) ? undefined : Number(year);
    }
    return;
  }

  // 条目分类, movie 或者tv
  get subtype() {
    const element = this.$('.gtleft span.rec > a');
    if (isAttrExistsInElement(element, 'data-type')) {
      if (element.attr('data-type') === '电影') {
        return 'movie';
      }
      if (element.attr('data-type') === '电视剧') {
        return 'tv';
      }
    }
    return 'unknown';
  }

  // 评分
  get ratingValue() {
    const element = this.$('strong[property="v:average"]');
    if (isElementExists(element)) {
      return element.text() ? Number(element.text()) : undefined;
    }
    return;
  }

  // 评价人数
  get ratingCount() {
    const element = this.$('span[property="v:votes"]');
    if (isElementExists(element)) {
      return element.text() ? Number(element.text()) : undefined;
    }
    return;
  }

  // 评一星到五星的人数权重
  get ratingOnWeight() {
    const element = this.$('span[class="rating_per"]');
    if (element && element.length === 5) {
      return this.$('span[class="rating_per"]')
        .text()
        .split('%')
        .slice(0, -1)
        .reverse()
        .join(',');
    }
    return;
  }

  // 封面
  get cover() {
    const element = this.$('a.nbgnbg > img');
    if (isAttrExistsInElement(element, 'src')) {
      return element.attr('src');
    }
    return;
  }
}
