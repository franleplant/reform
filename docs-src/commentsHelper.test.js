const test = require('tape');
const commentsHelper = require('./commentsHelper');

const comment = {
  shortText: "test 123",
  text: "test 456",
  tags: [
    {
      "tag": "a_tag",
      "text": "\n"
    }
  ]
}


test('commentsHelper', function (t) {
  t.plan(1);

  const result = commentsHelper(comment);
  const expected = ([
    'test 123',
    '',
    'test 456',
    '',
    'Tags',
    '',
    '- a_tag',
  ].join('\n'));

  t.equal(result, expected);
});
