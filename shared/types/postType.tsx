class PostType {
  private title: string;
  private bodyText: string;
  public constructor(title: string, bodyText: string) {
    this.title = title;
    this.bodyText = bodyText
  }

  public getTitle() { return this.title; }
  public getRawBodyText() { return this.bodyText; }
}

export { PostType }
