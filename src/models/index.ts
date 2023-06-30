import _user from './User'
import _word from './Word'
import _youdao from './Youdao'
import _manageUser from './Manage'
import _film from './Film'
import _fragment from './Fragment'
import _caption from './Caption'

export const User = _user
export const Word = _word
export const Youdao = _youdao
export const ManageUser = _manageUser
export const Film = _film
export const Fragment = _fragment
export const Caption = _caption

_fragment.belongsTo(_film, {
  foreignKey: 'filmId'
})

_caption.belongsTo(_fragment, {
  foreignKey: 'fragmentId'
})

_word.belongsTo(_youdao, {
  foreignKey: 'keyWord'
})