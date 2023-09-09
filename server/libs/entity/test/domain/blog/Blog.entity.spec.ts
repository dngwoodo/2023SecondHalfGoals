import { BlogEntity } from '@app/entity/domain/blog/BlogEntity';

describe('Blog.entity', () => {
  /**
   * NOTE
   * method 가 여러개로 나눠져있을 때는 describe 로 묶어서 테스트를 진행한다.
   * method 가 하나일 때는 describe 를 사용하지 않아도 무관하다.
   */
  describe('create', () => {
    it('title 과 body를 받아서 블로그 엔티티를 반환한다', () => {
      // given <- 테스트를 진헹하기 위한 기본 셋팅
      const expectTitle = 'test-title';
      const expectBody = 'test-body';

      // when <- 테스트 실행한 결과를 받아오는 곳
      const result = BlogEntity.create(expectTitle, expectBody);

      // then <- 실제 검증문
      expect(result).toBeInstanceOf(BlogEntity); // 실제 블로그 엔티티(인스턴스)를 반환하는가
      expect(result.title).toBe(expectTitle);
      expect(result.body).toBe(expectBody);
    });
  });
});
