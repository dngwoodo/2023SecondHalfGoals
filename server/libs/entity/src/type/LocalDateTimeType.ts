import { convert, LocalDateTime, nativeJs } from '@js-joda/core';
import { Type } from '@mikro-orm/core';

/**
 * NOTE:
 * native Date 는 다루기가 어렵다.
 * Date 에 대한 메서드들도 너무 부족하다.
 * json 으로 관리되니깐 커스텀하게 무언가를 만들떄 수월하고 쉬웠음.
 * Date 객체는 할 수 있는 게 적고 LocalDateTime(js-joda)은 지원되는 메서드가 많다.
 * dayjs <- 요거랑은 또 다른결인가?
 * 클라이언트에서는 날짜 라이브러리 같은 거 최대한 가벼운 거 사용하고 BE에서는 가장... 기능이 많은 거 ?
 */

export class LocalDateTimeType extends Type<LocalDateTime | null, Date> {
  override convertToDatabaseValue(value: LocalDateTime | Date | null): Date {
    if (!value) {
      return null as any;
    }

    if (value instanceof Date) {
      return value;
    }

    return convert(value).toDate();
  }

  override convertToJSValue(
    value: LocalDateTime | Date | number | null,
  ): LocalDateTime | null {
    if (!value) {
      return null;
    }

    if (value instanceof LocalDateTime) {
      return value;
    }

    if (typeof value === 'number') {
      return LocalDateTime.from(nativeJs(new Date(value)));
    }

    return LocalDateTime.from(nativeJs(value));
  }

  override getColumnType() {
    return `timestamptz`;
  }
}
