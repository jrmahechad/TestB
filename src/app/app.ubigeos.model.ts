export class Ubigeos {
  public code: string;
  public name: string;
  public parentCode: string;
  public parentName: string;

  constructor(model: string, parent: string) {
    const tempM = model.trim().split(' ');
    const tempP = parent.trim().split(' ');
    this.code = tempM[0];
    this.name = tempM.slice(1, tempM.length).join(' ');
    this.parentCode = tempP.length > 1 ? tempP[0] : '-';
    this.parentName = tempP.length > 1 ? tempP.slice(1, tempP.length).join(' ') : '-';
  }

}
