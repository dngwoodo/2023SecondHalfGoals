import { ResponseStatus } from '../../src/response/ResponseStatus';

type DefaultFactoryParameter = {
  message: string;
  parameter?: object;
  responseMessage?: string;
};

export class DomainException extends Error {
  private readonly _responseStatus: ResponseStatus;
  private readonly _responseMessage?: string;
  private readonly _parameter?: object;

  private constructor(
    message: string,
    responseStatus: ResponseStatus,
    responseMessage?: string,
    parameter?: object,
  ) {
    super(message);
    this._responseStatus = responseStatus;
    this._responseMessage = responseMessage;
    this._parameter = parameter;
    /**
     * NOTE
     * JavaScript의 Error.captureStackTrace는 오류 객체의 호출 스택을 캡처하고 사용자 정의할 수 있는 메소드로,
     * 스택 트레이스 정보를 조작하거나 필터링하는 데 사용된다.
     * TODO
     * 왜 사용하는 지 알아보기
     */
    Error.captureStackTrace(this, this.constructor);
  }

  static NotFound({
    message,
    parameter,
    responseMessage,
  }: DefaultFactoryParameter) {
    return new DomainException(
      message,
      ResponseStatus.NOT_FOUND,
      responseMessage,
      parameter,
    );
  }

  get responseMessage(): string {
    return this._responseMessage ?? this.message;
  }

  get responseStatus(): ResponseStatus {
    return this._responseStatus;
  }

  get parameter(): object {
    return this._parameter ?? {};
  }
}
