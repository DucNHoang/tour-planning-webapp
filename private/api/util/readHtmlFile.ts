import * as fs from 'fs'
import * as util from 'util'

// eslint-disable-next-line security/detect-non-literal-fs-filename
const readFileAsync = util.promisify(fs.readFile)

export function readHtmlFile(fileName: string): Promise<string> {
  return readFileAsync(fileName, { encoding: 'utf-8' })
}
