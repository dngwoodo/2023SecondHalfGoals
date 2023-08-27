import { Exclude, Expose } from "class-transformer";
import { ResponseStatus } from "./ResponseStatus";

export class ResponseEntity<T> {
  @Exclude()
  private readonly _statusCode: string; // http status와 별개인 비지니스 응답
  @Exclude()
  private readonly _message: string; // error message
  @Exclude()
  private readonly _data: T; // 정상 응답 데이터

  private constructor(status: ResponseStatus, message: string, data: T) {
    this._statusCode = ResponseStatus[status];
    this._message = message;
    this._data = data;
  }

  static OK_WITH<T>(data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(ResponseStatus.OK, '', data);
  }

  @Expose()
  get statusCode() {
    return this._statusCode;
  }

  @Expose()
  get message() {
    return this._message;
  }

  @Expose()
  get data() {
    return this._data;
  }
}