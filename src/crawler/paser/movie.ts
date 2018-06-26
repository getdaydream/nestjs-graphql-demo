/**
 * Created by Maple on 2017/6/4.
 */
import * as cheerio from 'cheerio';

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

  // 又名
  get aka() {
    const result = [];
    if (this.attrs.get('又名')) {
      this.attrs
        .get('又名')
        .trim()
        .split('/')
        .forEach(v => {
          result.push(v.trim());
        });
    }
    return result.length ? result : undefined;
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

  // 条目分类, movie或者tv
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
        .reverse();
    }
    return;
  }

  // 海报
  get doubanPoster() {
    const element = this.$('a.nbgnbg > img');
    if (isAttrExistsInElement(element, 'src')) {
      return element.attr('src');
    }
    return;
  }

  // 制片国家 / 地区
  get countries() {
    const result = [];
    if (this.attrs.get('制片国家/地区')) {
      this.attrs
        .get('制片国家/地区')
        .trim()
        .split('/')
        .forEach(v => {
          result.push(v.trim());
        });
    }
    return result.length ? result : undefined;
  }

  // 语言
  get languages() {
    const result = [];
    if (this.attrs.get('语言')) {
      this.attrs
        .get('语言')
        .trim()
        .split('/')
        .forEach(v => {
          result.push(v.trim());
        });
    }
    return result.length ? result : undefined;
  }

  // 类型
  get genres() {
    const result = [];
    if (this.attrs.get('类型')) {
      this.attrs
        .get('类型')
        .trim()
        .split('/')
        .forEach(v => {
          result.push(v.trim());
        });
    }
    return result.length ? result : undefined;
  }

  get durations() {
    let result = [];
    if (this.attrs.get('片长')) {
      result = this.attrs
        .get('片长')
        .trim()
        .split('/')
        .map(v => v.trim());
    }
    if (this.attrs.get('单集片长')) {
      result = this.attrs
        .get('单集片长')
        .trim()
        .split('/')
        .map(v => v.trim());
    }
    return result.length ? result : undefined;
  }

  // 剧情简介
  get summary() {
    let result = '';
    if (this.$('#link-report > span.all.hidden').text()) {
      result = this.$('#link-report > span.all.hidden')
        .text()
        .trim();
    } else {
      result = this.$('span[property="v:summary"]')
        .text()
        .trim();
    }
    return result ? result : undefined;
  }

  // 导演
  get directors() {
    const result = [];
    if (this.attrs.get('导演')) {
      const elements = this.$('a[rel="v:directedBy"]');
      for (let i = 0; i < elements.length; i++) {
        result.push({
          id: elements
            .eq(i)
            .attr('href')
            .split('/')[2],
          name: elements.eq(i).text(),
        });
      }
    }
    return result.length ? result : undefined;
  }

  // 编剧
  get writers() {
    const result = [];
    if (this.attrs.get('编剧')) {
      const elements = this.$('span:contains("编剧")')
        .next()
        .children();
      for (let i = 0; i < elements.length; i++) {
        if (elements.eq(i).attr('href') !== undefined) {
          result.push({
            id: elements
              .eq(i)
              .attr('href')
              .split('/')[2],
            name: elements.eq(i).text(),
          });
        }
      }
    }
    return result.length ? result : undefined;
  }

  // 主演
  get casts() {
    const result = [];
    if (this.attrs.get('主演')) {
      const elements = this.$('a[rel="v:starring"]');
      for (let i = 0; i < elements.length; i++) {
        result.push({
          id: elements
            .eq(i)
            .attr('href')
            .split('/')[2],
          name: elements.eq(i).text(),
        });
      }
    }
    return result.length ? result : undefined;
  }

  // 相关电影推荐
  get recommendations() {
    const result = [];
    const elements = this.$('#recommendations dd a');
    if (isElementExists(elements)) {
      for (let i = 0; i < elements.length; i++) {
        result.push(
          elements
            .eq(i)
            .attr('href')
            .split('/')[4],
        );
      }
    }
    return result.length ? result : undefined;
  }

  // 用户标签
  get userTags() {
    const result = [];
    const elements = this.$('.tags-body a');
    if (isElementExists(elements)) {
      for (let i = 0; i < elements.length; i++) {
        result.push(elements.eq(i).text());
      }
    }
    return result.length ? result : undefined;
  }

  // tv only
  // 所有季对应的id
  get seasons() {
    const result = [];
    if (this.attrs.get('季数')) {
      if (
        this.$('span:contains("季数:")')
          .next()
          .is('select')
      ) {
        const elements = this.$('#season option');
        for (let i = 0; i < elements.length; i++) {
          result.push(elements.eq(i).attr('value'));
        }
      } else {
        result.push(this.attrs.get('季数').trim());
      }
    }
    return result.length ? result : undefined;
  }

  // 集数
  get episodeCount() {
    let result = '';
    if (this.attrs.get('集数')) {
      result = this.attrs.get('集数').trim();
    }
    return result.length ? result : undefined;
  }

  // 首播日期或上映日期
  get pubDates() {
    const result = [];
    let elements;
    if (this.attrs.get('首播') || this.attrs.get('上映日期')) {
      elements = this.$('span[property="v:initialReleaseDate"]');
      for (let i = 0; i < elements.length; i++) {
        result.push(elements.eq(i).text());
      }
    }
    return result.length ? result : undefined;
  }

  get imdbID() {
    let result;
    if (this.attrs.get('IMDb链接')) {
      result = this.attrs.get('IMDb链接').trim();
    }
    return result ? result : undefined;
  }
}

const isElementExists = (element): boolean => {
  return element && element.length;
};

const isAttrExistsInElement = (element, attrName: string): boolean => {
  return isElementExists(element) && element.attr(attrName) !== undefined;
};
