const { execSync } = require('child_process')
const fs = require('fs-extra')
const path = require('path')

beforeEach(() => {
  fs.emptyDirSync('tests/__data__/output')

  const stdout = execSync(
    'LOGS_DIR=tests/__data__/input/logs DATA_DIR=tests/__data__/input/data npm run readme:update -- --config=tests/__data__/input/readme.json',
    { encoding: 'utf8' }
  )
})

it('can update readme.md', () => {
  expect(content('tests/__data__/output/readme.md')).toBe(
    content('tests/__data__/expected/_readme.md')
  )
})

function content(filepath) {
  const data = fs.readFileSync(path.resolve(filepath), {
    encoding: 'utf8'
  })

  return JSON.stringify(data)
}
