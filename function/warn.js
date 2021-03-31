const fs = require('fs-extra')

/**
 * Check warn.
 * @param {string} userId 
 * @param {object} _dir 
 * @param {number} warnCount 
 * @returns {boolean}
 */
const iswmax = (userId, _dir, warnCount) => {
    let found = false
    for (let i of _dir) {
        if (i.id === userId) {
            if (i.warn >= 5) {
                found = true
                return true
            } else {
                found = true
                return false
            }
        }
    }
    if (found === false) {
        const obj = { id: userId, warn: warnCount }
        _dir.push(obj)
        fs.writeFileSync('./database/group/warn.json', JSON.stringify(_dir))
        return false
    }
}

/**
 * Add warn to user.
 * @param {string} userId 
 * @param {object} _dir 
 */
const addwarn = (userId, _dir) => {
    let pos = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            pos = i
        }
    })
    if (pos !== null) {
        _dir[pos].warn += 1
        fs.writeFileSync('./database/group/warn.json', JSON.stringify(_dir))
    }
}

const resetwarn = (userId, _dir) => {
    let pos = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            pos = i
        }
    })
    if (pos !== null) {
        _dir[pos].warn -= 5
        fs.writeFileSync('./database/group/warn.json', JSON.stringify(_dir))
    }
}

const multa = (userId, _dir) => {
    let pos = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            pos = i
        }
    })
    if (pos !== null) {
        _dir[pos].warn -= 1
        fs.writeFileSync('./database/group/warn.json', JSON.stringify(_dir))
    }
}
/**
 * Get user's warn.
 * @param {string} userId 
 * @param {object} _dir 
 * @param {number} warnCount 
 * @returns {number}
 */
const getwarns = (userId, _dir, warnCount) => {
    let pos = null
    let found = false
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            pos = i
            found = true
        }
    })
    if (found === false && pos === null) {
        const obj = { id: userId, warn: warnCount }
        _dir.push(obj)
        fs.writeFileSync('./database/group/warn.json', JSON.stringify(_dir))
        return warnCount
    } else {
        return _dir[pos].warn
    }
}

module.exports = {
    iswmax,
    addwarn,
    getwarns,
    multa,
    resetwarn
}