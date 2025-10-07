import { green, keyword, bgKeyword, yellow } from 'chalk'

const yushi = (text, color) => {
    return !color ? green(text) : keyword(color)(text)
}

const shadow = (text, bgcolor) => {
  return !bgcolor ? green(text) : bgKeyword(bgcolor)(text)
}

const danscot = (text, color) => {
  return !color ? yellow('[ ! ] ') + green(text) : yellow('=> ') + keyword(color)(text)
}

const crazyColor = (text, color) => {
  return !color ? green(text) : keyword(color)(text)
}

export default {
  yushi,
  shadow,
  danscot
}