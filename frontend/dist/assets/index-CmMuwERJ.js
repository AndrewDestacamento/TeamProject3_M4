var oh = (e) => {
  throw TypeError(e);
};
var Mu = (e, t, n) => t.has(e) || oh("Cannot " + n);
var R = (e, t, n) => (
    Mu(e, t, "read from private field"),
    n ? n.call(e) : t.get(e)
  ),
  te = (e, t, n) =>
    t.has(e)
      ? oh("Cannot add the same private member more than once")
      : t instanceof WeakSet
        ? t.add(e)
        : t.set(e, n),
  q = (e, t, n, r) => (
    Mu(e, t, "write to private field"),
    r ? r.call(e, n) : t.set(e, n),
    n
  ),
  fe = (e, t, n) => (Mu(e, t, "access private method"), n);
var pa = (e, t, n, r) => ({
  set _(i) {
    q(e, t, i, n);
  },
  get _() {
    return R(e, t, r);
  },
});
function tb(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const i in r)
        if (i !== "default" && !(i in e)) {
          const o = Object.getOwnPropertyDescriptor(r, i);
          o &&
            Object.defineProperty(
              e,
              i,
              o.get ? o : { enumerable: !0, get: () => r[i] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === "childList")
        for (const s of o.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : i.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = n(i);
    fetch(i.href, o);
  }
})();
function gf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var my = { exports: {} },
  Ql = {},
  gy = { exports: {} },
  ce = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ta = Symbol.for("react.element"),
  nb = Symbol.for("react.portal"),
  rb = Symbol.for("react.fragment"),
  ib = Symbol.for("react.strict_mode"),
  ob = Symbol.for("react.profiler"),
  sb = Symbol.for("react.provider"),
  ab = Symbol.for("react.context"),
  lb = Symbol.for("react.forward_ref"),
  ub = Symbol.for("react.suspense"),
  cb = Symbol.for("react.memo"),
  db = Symbol.for("react.lazy"),
  sh = Symbol.iterator;
function fb(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (sh && e[sh]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var yy = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  xy = Object.assign,
  vy = {};
function Ao(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = vy),
    (this.updater = n || yy));
}
Ao.prototype.isReactComponent = {};
Ao.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Ao.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function wy() {}
wy.prototype = Ao.prototype;
function yf(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = vy),
    (this.updater = n || yy));
}
var xf = (yf.prototype = new wy());
xf.constructor = yf;
xy(xf, Ao.prototype);
xf.isPureReactComponent = !0;
var ah = Array.isArray,
  by = Object.prototype.hasOwnProperty,
  vf = { current: null },
  ky = { key: !0, ref: !0, __self: !0, __source: !0 };
function Sy(e, t, n) {
  var r,
    i = {},
    o = null,
    s = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (s = t.ref),
    t.key !== void 0 && (o = "" + t.key),
    t))
      by.call(t, r) && !ky.hasOwnProperty(r) && (i[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) i.children = n;
  else if (1 < a) {
    for (var u = Array(a), c = 0; c < a; c++) u[c] = arguments[c + 2];
    i.children = u;
  }
  if (e && e.defaultProps)
    for (r in ((a = e.defaultProps), a)) i[r] === void 0 && (i[r] = a[r]);
  return {
    $$typeof: ta,
    type: e,
    key: o,
    ref: s,
    props: i,
    _owner: vf.current,
  };
}
function pb(e, t) {
  return {
    $$typeof: ta,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function wf(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ta;
}
function hb(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var lh = /\/+/g;
function Tu(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? hb("" + e.key)
    : t.toString(36);
}
function Va(e, t, n, r, i) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var s = !1;
  if (e === null) s = !0;
  else
    switch (o) {
      case "string":
      case "number":
        s = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case ta:
          case nb:
            s = !0;
        }
    }
  if (s)
    return (
      (s = e),
      (i = i(s)),
      (e = r === "" ? "." + Tu(s, 0) : r),
      ah(i)
        ? ((n = ""),
          e != null && (n = e.replace(lh, "$&/") + "/"),
          Va(i, t, n, "", function (c) {
            return c;
          }))
        : i != null &&
          (wf(i) &&
            (i = pb(
              i,
              n +
                (!i.key || (s && s.key === i.key)
                  ? ""
                  : ("" + i.key).replace(lh, "$&/") + "/") +
                e,
            )),
          t.push(i)),
      1
    );
  if (((s = 0), (r = r === "" ? "." : r + ":"), ah(e)))
    for (var a = 0; a < e.length; a++) {
      o = e[a];
      var u = r + Tu(o, a);
      s += Va(o, t, n, u, i);
    }
  else if (((u = fb(e)), typeof u == "function"))
    for (e = u.call(e), a = 0; !(o = e.next()).done;)
      ((o = o.value), (u = r + Tu(o, a++)), (s += Va(o, t, n, u, i)));
  else if (o === "object")
    throw (
      (t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead.",
      )
    );
  return s;
}
function ha(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    Va(e, r, "", "", function (o) {
      return t.call(n, o, i++);
    }),
    r
  );
}
function mb(e) {
  if (e._status === -1) {
    var t = e._result;
    ((t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var ht = { current: null },
  Ha = { transition: null },
  gb = {
    ReactCurrentDispatcher: ht,
    ReactCurrentBatchConfig: Ha,
    ReactCurrentOwner: vf,
  };
function Cy() {
  throw Error("act(...) is not supported in production builds of React.");
}
ce.Children = {
  map: ha,
  forEach: function (e, t, n) {
    ha(
      e,
      function () {
        t.apply(this, arguments);
      },
      n,
    );
  },
  count: function (e) {
    var t = 0;
    return (
      ha(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      ha(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!wf(e))
      throw Error(
        "React.Children.only expected to receive a single React element child.",
      );
    return e;
  },
};
ce.Component = Ao;
ce.Fragment = rb;
ce.Profiler = ob;
ce.PureComponent = yf;
ce.StrictMode = ib;
ce.Suspense = ub;
ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = gb;
ce.act = Cy;
ce.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        ".",
    );
  var r = xy({}, e.props),
    i = e.key,
    o = e.ref,
    s = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (s = vf.current)),
      t.key !== void 0 && (i = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var a = e.type.defaultProps;
    for (u in t)
      by.call(t, u) &&
        !ky.hasOwnProperty(u) &&
        (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    a = Array(u);
    for (var c = 0; c < u; c++) a[c] = arguments[c + 2];
    r.children = a;
  }
  return { $$typeof: ta, type: e.type, key: i, ref: o, props: r, _owner: s };
};
ce.createContext = function (e) {
  return (
    (e = {
      $$typeof: ab,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: sb, _context: e }),
    (e.Consumer = e)
  );
};
ce.createElement = Sy;
ce.createFactory = function (e) {
  var t = Sy.bind(null, e);
  return ((t.type = e), t);
};
ce.createRef = function () {
  return { current: null };
};
ce.forwardRef = function (e) {
  return { $$typeof: lb, render: e };
};
ce.isValidElement = wf;
ce.lazy = function (e) {
  return { $$typeof: db, _payload: { _status: -1, _result: e }, _init: mb };
};
ce.memo = function (e, t) {
  return { $$typeof: cb, type: e, compare: t === void 0 ? null : t };
};
ce.startTransition = function (e) {
  var t = Ha.transition;
  Ha.transition = {};
  try {
    e();
  } finally {
    Ha.transition = t;
  }
};
ce.unstable_act = Cy;
ce.useCallback = function (e, t) {
  return ht.current.useCallback(e, t);
};
ce.useContext = function (e) {
  return ht.current.useContext(e);
};
ce.useDebugValue = function () {};
ce.useDeferredValue = function (e) {
  return ht.current.useDeferredValue(e);
};
ce.useEffect = function (e, t) {
  return ht.current.useEffect(e, t);
};
ce.useId = function () {
  return ht.current.useId();
};
ce.useImperativeHandle = function (e, t, n) {
  return ht.current.useImperativeHandle(e, t, n);
};
ce.useInsertionEffect = function (e, t) {
  return ht.current.useInsertionEffect(e, t);
};
ce.useLayoutEffect = function (e, t) {
  return ht.current.useLayoutEffect(e, t);
};
ce.useMemo = function (e, t) {
  return ht.current.useMemo(e, t);
};
ce.useReducer = function (e, t, n) {
  return ht.current.useReducer(e, t, n);
};
ce.useRef = function (e) {
  return ht.current.useRef(e);
};
ce.useState = function (e) {
  return ht.current.useState(e);
};
ce.useSyncExternalStore = function (e, t, n) {
  return ht.current.useSyncExternalStore(e, t, n);
};
ce.useTransition = function () {
  return ht.current.useTransition();
};
ce.version = "18.3.1";
gy.exports = ce;
var w = gy.exports;
const B = gf(w),
  Ny = tb({ __proto__: null, default: B }, [w]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var yb = w,
  xb = Symbol.for("react.element"),
  vb = Symbol.for("react.fragment"),
  wb = Object.prototype.hasOwnProperty,
  bb = yb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  kb = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ey(e, t, n) {
  var r,
    i = {},
    o = null,
    s = null;
  (n !== void 0 && (o = "" + n),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (s = t.ref));
  for (r in t) wb.call(t, r) && !kb.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
  return {
    $$typeof: xb,
    type: e,
    key: o,
    ref: s,
    props: i,
    _owner: bb.current,
  };
}
Ql.Fragment = vb;
Ql.jsx = Ey;
Ql.jsxs = Ey;
my.exports = Ql;
var l = my.exports,
  Tc = {},
  jy = { exports: {} },
  zt = {},
  Py = { exports: {} },
  _y = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(A, _) {
    var S = A.length;
    A.push(_);
    e: for (; 0 < S;) {
      var U = (S - 1) >>> 1,
        W = A[U];
      if (0 < i(W, _)) ((A[U] = _), (A[S] = W), (S = U));
      else break e;
    }
  }
  function n(A) {
    return A.length === 0 ? null : A[0];
  }
  function r(A) {
    if (A.length === 0) return null;
    var _ = A[0],
      S = A.pop();
    if (S !== _) {
      A[0] = S;
      e: for (var U = 0, W = A.length, E = W >>> 1; U < E;) {
        var X = 2 * (U + 1) - 1,
          ge = A[X],
          oe = X + 1,
          ae = A[oe];
        if (0 > i(ge, S))
          oe < W && 0 > i(ae, ge)
            ? ((A[U] = ae), (A[oe] = S), (U = oe))
            : ((A[U] = ge), (A[X] = S), (U = X));
        else if (oe < W && 0 > i(ae, S)) ((A[U] = ae), (A[oe] = S), (U = oe));
        else break e;
      }
    }
    return _;
  }
  function i(A, _) {
    var S = A.sortIndex - _.sortIndex;
    return S !== 0 ? S : A.id - _.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var s = Date,
      a = s.now();
    e.unstable_now = function () {
      return s.now() - a;
    };
  }
  var u = [],
    c = [],
    d = 1,
    f = null,
    h = 3,
    p = !1,
    v = !1,
    g = !1,
    b = typeof setTimeout == "function" ? setTimeout : null,
    m = typeof clearTimeout == "function" ? clearTimeout : null,
    x = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function y(A) {
    for (var _ = n(c); _ !== null;) {
      if (_.callback === null) r(c);
      else if (_.startTime <= A)
        (r(c), (_.sortIndex = _.expirationTime), t(u, _));
      else break;
      _ = n(c);
    }
  }
  function k(A) {
    if (((g = !1), y(A), !v))
      if (n(u) !== null) ((v = !0), V(N));
      else {
        var _ = n(c);
        _ !== null && Y(k, _.startTime - A);
      }
  }
  function N(A, _) {
    ((v = !1), g && ((g = !1), m(P), (P = -1)), (p = !0));
    var S = h;
    try {
      for (
        y(_), f = n(u);
        f !== null && (!(f.expirationTime > _) || (A && !D()));
      ) {
        var U = f.callback;
        if (typeof U == "function") {
          ((f.callback = null), (h = f.priorityLevel));
          var W = U(f.expirationTime <= _);
          ((_ = e.unstable_now()),
            typeof W == "function" ? (f.callback = W) : f === n(u) && r(u),
            y(_));
        } else r(u);
        f = n(u);
      }
      if (f !== null) var E = !0;
      else {
        var X = n(c);
        (X !== null && Y(k, X.startTime - _), (E = !1));
      }
      return E;
    } finally {
      ((f = null), (h = S), (p = !1));
    }
  }
  var C = !1,
    j = null,
    P = -1,
    T = 5,
    I = -1;
  function D() {
    return !(e.unstable_now() - I < T);
  }
  function O() {
    if (j !== null) {
      var A = e.unstable_now();
      I = A;
      var _ = !0;
      try {
        _ = j(!0, A);
      } finally {
        _ ? $() : ((C = !1), (j = null));
      }
    } else C = !1;
  }
  var $;
  if (typeof x == "function")
    $ = function () {
      x(O);
    };
  else if (typeof MessageChannel < "u") {
    var G = new MessageChannel(),
      Q = G.port2;
    ((G.port1.onmessage = O),
      ($ = function () {
        Q.postMessage(null);
      }));
  } else
    $ = function () {
      b(O, 0);
    };
  function V(A) {
    ((j = A), C || ((C = !0), $()));
  }
  function Y(A, _) {
    P = b(function () {
      A(e.unstable_now());
    }, _);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (A) {
      A.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      v || p || ((v = !0), V(N));
    }),
    (e.unstable_forceFrameRate = function (A) {
      0 > A || 125 < A
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (T = 0 < A ? Math.floor(1e3 / A) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return h;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(u);
    }),
    (e.unstable_next = function (A) {
      switch (h) {
        case 1:
        case 2:
        case 3:
          var _ = 3;
          break;
        default:
          _ = h;
      }
      var S = h;
      h = _;
      try {
        return A();
      } finally {
        h = S;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (A, _) {
      switch (A) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          A = 3;
      }
      var S = h;
      h = A;
      try {
        return _();
      } finally {
        h = S;
      }
    }),
    (e.unstable_scheduleCallback = function (A, _, S) {
      var U = e.unstable_now();
      switch (
        (typeof S == "object" && S !== null
          ? ((S = S.delay), (S = typeof S == "number" && 0 < S ? U + S : U))
          : (S = U),
        A)
      ) {
        case 1:
          var W = -1;
          break;
        case 2:
          W = 250;
          break;
        case 5:
          W = 1073741823;
          break;
        case 4:
          W = 1e4;
          break;
        default:
          W = 5e3;
      }
      return (
        (W = S + W),
        (A = {
          id: d++,
          callback: _,
          priorityLevel: A,
          startTime: S,
          expirationTime: W,
          sortIndex: -1,
        }),
        S > U
          ? ((A.sortIndex = S),
            t(c, A),
            n(u) === null &&
              A === n(c) &&
              (g ? (m(P), (P = -1)) : (g = !0), Y(k, S - U)))
          : ((A.sortIndex = W), t(u, A), v || p || ((v = !0), V(N))),
        A
      );
    }),
    (e.unstable_shouldYield = D),
    (e.unstable_wrapCallback = function (A) {
      var _ = h;
      return function () {
        var S = h;
        h = _;
        try {
          return A.apply(this, arguments);
        } finally {
          h = S;
        }
      };
    }));
})(_y);
Py.exports = _y;
var Sb = Py.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Cb = w,
  Lt = Sb;
function L(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Ry = new Set(),
  Cs = {};
function Ci(e, t) {
  (ko(e, t), ko(e + "Capture", t));
}
function ko(e, t) {
  for (Cs[e] = t, e = 0; e < t.length; e++) Ry.add(t[e]);
}
var Hn = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Ac = Object.prototype.hasOwnProperty,
  Nb =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  uh = {},
  ch = {};
function Eb(e) {
  return Ac.call(ch, e)
    ? !0
    : Ac.call(uh, e)
      ? !1
      : Nb.test(e)
        ? (ch[e] = !0)
        : ((uh[e] = !0), !1);
}
function jb(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Pb(e, t, n, r) {
  if (t === null || typeof t > "u" || jb(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function mt(e, t, n, r, i, o, s) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = s));
}
var et = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    et[e] = new mt(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  et[t] = new mt(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  et[e] = new mt(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  et[e] = new mt(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    et[e] = new mt(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  et[e] = new mt(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  et[e] = new mt(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  et[e] = new mt(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  et[e] = new mt(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var bf = /[\-:]([a-z])/g;
function kf(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(bf, kf);
    et[t] = new mt(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(bf, kf);
    et[t] = new mt(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(bf, kf);
  et[t] = new mt(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  et[e] = new mt(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
et.xlinkHref = new mt(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1,
);
["src", "href", "action", "formAction"].forEach(function (e) {
  et[e] = new mt(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Sf(e, t, n, r) {
  var i = et.hasOwnProperty(t) ? et[t] : null;
  (i !== null
    ? i.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Pb(t, n, i, r) && (n = null),
    r || i === null
      ? Eb(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : i.mustUseProperty
        ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
        : ((t = i.attributeName),
          (r = i.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((i = i.type),
              (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Yn = Cb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  ma = Symbol.for("react.element"),
  zi = Symbol.for("react.portal"),
  Fi = Symbol.for("react.fragment"),
  Cf = Symbol.for("react.strict_mode"),
  Ic = Symbol.for("react.profiler"),
  My = Symbol.for("react.provider"),
  Ty = Symbol.for("react.context"),
  Nf = Symbol.for("react.forward_ref"),
  Oc = Symbol.for("react.suspense"),
  Dc = Symbol.for("react.suspense_list"),
  Ef = Symbol.for("react.memo"),
  cr = Symbol.for("react.lazy"),
  Ay = Symbol.for("react.offscreen"),
  dh = Symbol.iterator;
function Ho(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (dh && e[dh]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Ae = Object.assign,
  Au;
function is(e) {
  if (Au === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Au = (t && t[1]) || "";
    }
  return (
    `
` +
    Au +
    e
  );
}
var Iu = !1;
function Ou(e, t) {
  if (!e || Iu) return "";
  Iu = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (c) {
          var r = c;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (c) {
          r = c;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (c) {
        r = c;
      }
      e();
    }
  } catch (c) {
    if (c && r && typeof c.stack == "string") {
      for (
        var i = c.stack.split(`
`),
          o = r.stack.split(`
`),
          s = i.length - 1,
          a = o.length - 1;
        1 <= s && 0 <= a && i[s] !== o[a];
      )
        a--;
      for (; 1 <= s && 0 <= a; s--, a--)
        if (i[s] !== o[a]) {
          if (s !== 1 || a !== 1)
            do
              if ((s--, a--, 0 > a || i[s] !== o[a])) {
                var u =
                  `
` + i[s].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    u.includes("<anonymous>") &&
                    (u = u.replace("<anonymous>", e.displayName)),
                  u
                );
              }
            while (1 <= s && 0 <= a);
          break;
        }
    }
  } finally {
    ((Iu = !1), (Error.prepareStackTrace = n));
  }
  return (e = e ? e.displayName || e.name : "") ? is(e) : "";
}
function _b(e) {
  switch (e.tag) {
    case 5:
      return is(e.type);
    case 16:
      return is("Lazy");
    case 13:
      return is("Suspense");
    case 19:
      return is("SuspenseList");
    case 0:
    case 2:
    case 15:
      return ((e = Ou(e.type, !1)), e);
    case 11:
      return ((e = Ou(e.type.render, !1)), e);
    case 1:
      return ((e = Ou(e.type, !0)), e);
    default:
      return "";
  }
}
function Lc(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Fi:
      return "Fragment";
    case zi:
      return "Portal";
    case Ic:
      return "Profiler";
    case Cf:
      return "StrictMode";
    case Oc:
      return "Suspense";
    case Dc:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Ty:
        return (e.displayName || "Context") + ".Consumer";
      case My:
        return (e._context.displayName || "Context") + ".Provider";
      case Nf:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Ef:
        return (
          (t = e.displayName || null),
          t !== null ? t : Lc(e.type) || "Memo"
        );
      case cr:
        ((t = e._payload), (e = e._init));
        try {
          return Lc(e(t));
        } catch {}
    }
  return null;
}
function Rb(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Lc(t);
    case 8:
      return t === Cf ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Ir(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Iy(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Mb(e) {
  var t = Iy(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var i = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (s) {
          ((r = "" + s), o.call(this, s));
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (s) {
          r = "" + s;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function ga(e) {
  e._valueTracker || (e._valueTracker = Mb(e));
}
function Oy(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Iy(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function al(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function zc(e, t) {
  var n = t.checked;
  return Ae({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function fh(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  ((n = Ir(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    }));
}
function Dy(e, t) {
  ((t = t.checked), t != null && Sf(e, "checked", t, !1));
}
function Fc(e, t) {
  Dy(e, t);
  var n = Ir(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  (t.hasOwnProperty("value")
    ? Bc(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Bc(e, t.type, Ir(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked));
}
function ph(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(
      (r !== "submit" && r !== "reset") ||
      (t.value !== void 0 && t.value !== null)
    ))
      return;
    ((t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t));
  }
  ((n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n));
}
function Bc(e, t, n) {
  (t !== "number" || al(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var os = Array.isArray;
function Yi(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      ((i = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0));
  } else {
    for (n = "" + Ir(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        ((e[i].selected = !0), r && (e[i].defaultSelected = !0));
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function $c(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(L(91));
  return Ae({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function hh(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(L(92));
      if (os(n)) {
        if (1 < n.length) throw Error(L(93));
        n = n[0];
      }
      t = n;
    }
    (t == null && (t = ""), (n = t));
  }
  e._wrapperState = { initialValue: Ir(n) };
}
function Ly(e, t) {
  var n = Ir(t.value),
    r = Ir(t.defaultValue);
  (n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r));
}
function mh(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function zy(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Uc(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? zy(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var ya,
  Fy = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, i);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        ya = ya || document.createElement("div"),
          ya.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = ya.firstChild;
        e.firstChild;
      )
        e.removeChild(e.firstChild);
      for (; t.firstChild;) e.appendChild(t.firstChild);
    }
  });
function Ns(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var cs = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Tb = ["Webkit", "ms", "Moz", "O"];
Object.keys(cs).forEach(function (e) {
  Tb.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (cs[t] = cs[e]));
  });
});
function By(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (cs.hasOwnProperty(e) && cs[e])
      ? ("" + t).trim()
      : t + "px";
}
function $y(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        i = By(n, t[n], r);
      (n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : (e[n] = i));
    }
}
var Ab = Ae(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
);
function Wc(e, t) {
  if (t) {
    if (Ab[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(L(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(L(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(L(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(L(62));
  }
}
function Vc(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Hc = null;
function jf(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var qc = null,
  Xi = null,
  Zi = null;
function gh(e) {
  if ((e = ia(e))) {
    if (typeof qc != "function") throw Error(L(280));
    var t = e.stateNode;
    t && ((t = Zl(t)), qc(e.stateNode, e.type, t));
  }
}
function Uy(e) {
  Xi ? (Zi ? Zi.push(e) : (Zi = [e])) : (Xi = e);
}
function Wy() {
  if (Xi) {
    var e = Xi,
      t = Zi;
    if (((Zi = Xi = null), gh(e), t)) for (e = 0; e < t.length; e++) gh(t[e]);
  }
}
function Vy(e, t) {
  return e(t);
}
function Hy() {}
var Du = !1;
function qy(e, t, n) {
  if (Du) return e(t, n);
  Du = !0;
  try {
    return Vy(e, t, n);
  } finally {
    ((Du = !1), (Xi !== null || Zi !== null) && (Hy(), Wy()));
  }
}
function Es(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Zl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      ((r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(L(231, t, typeof n));
  return n;
}
var Qc = !1;
if (Hn)
  try {
    var qo = {};
    (Object.defineProperty(qo, "passive", {
      get: function () {
        Qc = !0;
      },
    }),
      window.addEventListener("test", qo, qo),
      window.removeEventListener("test", qo, qo));
  } catch {
    Qc = !1;
  }
function Ib(e, t, n, r, i, o, s, a, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (d) {
    this.onError(d);
  }
}
var ds = !1,
  ll = null,
  ul = !1,
  Kc = null,
  Ob = {
    onError: function (e) {
      ((ds = !0), (ll = e));
    },
  };
function Db(e, t, n, r, i, o, s, a, u) {
  ((ds = !1), (ll = null), Ib.apply(Ob, arguments));
}
function Lb(e, t, n, r, i, o, s, a, u) {
  if ((Db.apply(this, arguments), ds)) {
    if (ds) {
      var c = ll;
      ((ds = !1), (ll = null));
    } else throw Error(L(198));
    ul || ((ul = !0), (Kc = c));
  }
}
function Ni(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return;) t = t.return;
  else {
    e = t;
    do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Qy(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function yh(e) {
  if (Ni(e) !== e) throw Error(L(188));
}
function zb(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Ni(e)), t === null)) throw Error(L(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ;) {
    var i = n.return;
    if (i === null) break;
    var o = i.alternate;
    if (o === null) {
      if (((r = i.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === o.child) {
      for (o = i.child; o;) {
        if (o === n) return (yh(i), e);
        if (o === r) return (yh(i), t);
        o = o.sibling;
      }
      throw Error(L(188));
    }
    if (n.return !== r.return) ((n = i), (r = o));
    else {
      for (var s = !1, a = i.child; a;) {
        if (a === n) {
          ((s = !0), (n = i), (r = o));
          break;
        }
        if (a === r) {
          ((s = !0), (r = i), (n = o));
          break;
        }
        a = a.sibling;
      }
      if (!s) {
        for (a = o.child; a;) {
          if (a === n) {
            ((s = !0), (n = o), (r = i));
            break;
          }
          if (a === r) {
            ((s = !0), (r = o), (n = i));
            break;
          }
          a = a.sibling;
        }
        if (!s) throw Error(L(189));
      }
    }
    if (n.alternate !== r) throw Error(L(190));
  }
  if (n.tag !== 3) throw Error(L(188));
  return n.stateNode.current === n ? e : t;
}
function Ky(e) {
  return ((e = zb(e)), e !== null ? Gy(e) : null);
}
function Gy(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null;) {
    var t = Gy(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Yy = Lt.unstable_scheduleCallback,
  xh = Lt.unstable_cancelCallback,
  Fb = Lt.unstable_shouldYield,
  Bb = Lt.unstable_requestPaint,
  Le = Lt.unstable_now,
  $b = Lt.unstable_getCurrentPriorityLevel,
  Pf = Lt.unstable_ImmediatePriority,
  Xy = Lt.unstable_UserBlockingPriority,
  cl = Lt.unstable_NormalPriority,
  Ub = Lt.unstable_LowPriority,
  Zy = Lt.unstable_IdlePriority,
  Kl = null,
  Pn = null;
function Wb(e) {
  if (Pn && typeof Pn.onCommitFiberRoot == "function")
    try {
      Pn.onCommitFiberRoot(Kl, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var un = Math.clz32 ? Math.clz32 : qb,
  Vb = Math.log,
  Hb = Math.LN2;
function qb(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((Vb(e) / Hb) | 0)) | 0);
}
var xa = 64,
  va = 4194304;
function ss(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function dl(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    o = e.pingedLanes,
    s = n & 268435455;
  if (s !== 0) {
    var a = s & ~i;
    a !== 0 ? (r = ss(a)) : ((o &= s), o !== 0 && (r = ss(o)));
  } else ((s = n & ~i), s !== 0 ? (r = ss(s)) : o !== 0 && (r = ss(o)));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & i) &&
    ((i = r & -r), (o = t & -t), i >= o || (i === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t;)
      ((n = 31 - un(t)), (i = 1 << n), (r |= e[n]), (t &= ~i));
  return r;
}
function Qb(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Kb(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      i = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;
  ) {
    var s = 31 - un(o),
      a = 1 << s,
      u = i[s];
    (u === -1
      ? (!(a & n) || a & r) && (i[s] = Qb(a, t))
      : u <= t && (e.expiredLanes |= a),
      (o &= ~a));
  }
}
function Gc(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function Jy() {
  var e = xa;
  return ((xa <<= 1), !(xa & 4194240) && (xa = 64), e);
}
function Lu(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function na(e, t, n) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - un(t)),
    (e[t] = n));
}
function Gb(e, t) {
  var n = e.pendingLanes & ~t;
  ((e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements));
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n;) {
    var i = 31 - un(n),
      o = 1 << i;
    ((t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~o));
  }
}
function _f(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n;) {
    var r = 31 - un(n),
      i = 1 << r;
    ((i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i));
  }
}
var ve = 0;
function ex(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
  );
}
var tx,
  Rf,
  nx,
  rx,
  ix,
  Yc = !1,
  wa = [],
  Nr = null,
  Er = null,
  jr = null,
  js = new Map(),
  Ps = new Map(),
  fr = [],
  Yb =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " ",
    );
function vh(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Nr = null;
      break;
    case "dragenter":
    case "dragleave":
      Er = null;
      break;
    case "mouseover":
    case "mouseout":
      jr = null;
      break;
    case "pointerover":
    case "pointerout":
      js.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Ps.delete(t.pointerId);
  }
}
function Qo(e, t, n, r, i, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [i],
      }),
      t !== null && ((t = ia(t)), t !== null && Rf(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function Xb(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return ((Nr = Qo(Nr, e, t, n, r, i)), !0);
    case "dragenter":
      return ((Er = Qo(Er, e, t, n, r, i)), !0);
    case "mouseover":
      return ((jr = Qo(jr, e, t, n, r, i)), !0);
    case "pointerover":
      var o = i.pointerId;
      return (js.set(o, Qo(js.get(o) || null, e, t, n, r, i)), !0);
    case "gotpointercapture":
      return (
        (o = i.pointerId),
        Ps.set(o, Qo(Ps.get(o) || null, e, t, n, r, i)),
        !0
      );
  }
  return !1;
}
function ox(e) {
  var t = ti(e.target);
  if (t !== null) {
    var n = Ni(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Qy(n)), t !== null)) {
          ((e.blockedOn = t),
            ix(e.priority, function () {
              nx(n);
            }));
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function qa(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length;) {
    var n = Xc(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ((Hc = r), n.target.dispatchEvent(r), (Hc = null));
    } else return ((t = ia(n)), t !== null && Rf(t), (e.blockedOn = n), !1);
    t.shift();
  }
  return !0;
}
function wh(e, t, n) {
  qa(e) && n.delete(t);
}
function Zb() {
  ((Yc = !1),
    Nr !== null && qa(Nr) && (Nr = null),
    Er !== null && qa(Er) && (Er = null),
    jr !== null && qa(jr) && (jr = null),
    js.forEach(wh),
    Ps.forEach(wh));
}
function Ko(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Yc ||
      ((Yc = !0),
      Lt.unstable_scheduleCallback(Lt.unstable_NormalPriority, Zb)));
}
function _s(e) {
  function t(i) {
    return Ko(i, e);
  }
  if (0 < wa.length) {
    Ko(wa[0], e);
    for (var n = 1; n < wa.length; n++) {
      var r = wa[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Nr !== null && Ko(Nr, e),
      Er !== null && Ko(Er, e),
      jr !== null && Ko(jr, e),
      js.forEach(t),
      Ps.forEach(t),
      n = 0;
    n < fr.length;
    n++
  )
    ((r = fr[n]), r.blockedOn === e && (r.blockedOn = null));
  for (; 0 < fr.length && ((n = fr[0]), n.blockedOn === null);)
    (ox(n), n.blockedOn === null && fr.shift());
}
var Ji = Yn.ReactCurrentBatchConfig,
  fl = !0;
function Jb(e, t, n, r) {
  var i = ve,
    o = Ji.transition;
  Ji.transition = null;
  try {
    ((ve = 1), Mf(e, t, n, r));
  } finally {
    ((ve = i), (Ji.transition = o));
  }
}
function ek(e, t, n, r) {
  var i = ve,
    o = Ji.transition;
  Ji.transition = null;
  try {
    ((ve = 4), Mf(e, t, n, r));
  } finally {
    ((ve = i), (Ji.transition = o));
  }
}
function Mf(e, t, n, r) {
  if (fl) {
    var i = Xc(e, t, n, r);
    if (i === null) (Qu(e, t, r, pl, n), vh(e, r));
    else if (Xb(i, e, t, n, r)) r.stopPropagation();
    else if ((vh(e, r), t & 4 && -1 < Yb.indexOf(e))) {
      for (; i !== null;) {
        var o = ia(i);
        if (
          (o !== null && tx(o),
          (o = Xc(e, t, n, r)),
          o === null && Qu(e, t, r, pl, n),
          o === i)
        )
          break;
        i = o;
      }
      i !== null && r.stopPropagation();
    } else Qu(e, t, r, null, n);
  }
}
var pl = null;
function Xc(e, t, n, r) {
  if (((pl = null), (e = jf(r)), (e = ti(e)), e !== null))
    if (((t = Ni(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Qy(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((pl = e), null);
}
function sx(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch ($b()) {
        case Pf:
          return 1;
        case Xy:
          return 4;
        case cl:
        case Ub:
          return 16;
        case Zy:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var br = null,
  Tf = null,
  Qa = null;
function ax() {
  if (Qa) return Qa;
  var e,
    t = Tf,
    n = t.length,
    r,
    i = "value" in br ? br.value : br.textContent,
    o = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++);
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === i[o - r]; r++);
  return (Qa = i.slice(e, 1 < r ? 1 - r : void 0));
}
function Ka(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function ba() {
  return !0;
}
function bh() {
  return !1;
}
function Ft(e) {
  function t(n, r, i, o, s) {
    ((this._reactName = n),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = s),
      (this.currentTarget = null));
    for (var a in e)
      e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(o) : o[a]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? ba
        : bh),
      (this.isPropagationStopped = bh),
      this
    );
  }
  return (
    Ae(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = ba));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = ba));
      },
      persist: function () {},
      isPersistent: ba,
    }),
    t
  );
}
var Io = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Af = Ft(Io),
  ra = Ae({}, Io, { view: 0, detail: 0 }),
  tk = Ft(ra),
  zu,
  Fu,
  Go,
  Gl = Ae({}, ra, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: If,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== Go &&
            (Go && e.type === "mousemove"
              ? ((zu = e.screenX - Go.screenX), (Fu = e.screenY - Go.screenY))
              : (Fu = zu = 0),
            (Go = e)),
          zu);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Fu;
    },
  }),
  kh = Ft(Gl),
  nk = Ae({}, Gl, { dataTransfer: 0 }),
  rk = Ft(nk),
  ik = Ae({}, ra, { relatedTarget: 0 }),
  Bu = Ft(ik),
  ok = Ae({}, Io, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  sk = Ft(ok),
  ak = Ae({}, Io, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  lk = Ft(ak),
  uk = Ae({}, Io, { data: 0 }),
  Sh = Ft(uk),
  ck = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  dk = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  fk = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function pk(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = fk[e]) ? !!t[e] : !1;
}
function If() {
  return pk;
}
var hk = Ae({}, ra, {
    key: function (e) {
      if (e.key) {
        var t = ck[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Ka(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? dk[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: If,
    charCode: function (e) {
      return e.type === "keypress" ? Ka(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Ka(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  mk = Ft(hk),
  gk = Ae({}, Gl, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Ch = Ft(gk),
  yk = Ae({}, ra, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: If,
  }),
  xk = Ft(yk),
  vk = Ae({}, Io, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  wk = Ft(vk),
  bk = Ae({}, Gl, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  kk = Ft(bk),
  Sk = [9, 13, 27, 32],
  Of = Hn && "CompositionEvent" in window,
  fs = null;
Hn && "documentMode" in document && (fs = document.documentMode);
var Ck = Hn && "TextEvent" in window && !fs,
  lx = Hn && (!Of || (fs && 8 < fs && 11 >= fs)),
  Nh = " ",
  Eh = !1;
function ux(e, t) {
  switch (e) {
    case "keyup":
      return Sk.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function cx(e) {
  return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var Bi = !1;
function Nk(e, t) {
  switch (e) {
    case "compositionend":
      return cx(t);
    case "keypress":
      return t.which !== 32 ? null : ((Eh = !0), Nh);
    case "textInput":
      return ((e = t.data), e === Nh && Eh ? null : e);
    default:
      return null;
  }
}
function Ek(e, t) {
  if (Bi)
    return e === "compositionend" || (!Of && ux(e, t))
      ? ((e = ax()), (Qa = Tf = br = null), (Bi = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return lx && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var jk = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function jh(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!jk[e.type] : t === "textarea";
}
function dx(e, t, n, r) {
  (Uy(r),
    (t = hl(t, "onChange")),
    0 < t.length &&
      ((n = new Af("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t })));
}
var ps = null,
  Rs = null;
function Pk(e) {
  kx(e, 0);
}
function Yl(e) {
  var t = Wi(e);
  if (Oy(t)) return e;
}
function _k(e, t) {
  if (e === "change") return t;
}
var fx = !1;
if (Hn) {
  var $u;
  if (Hn) {
    var Uu = "oninput" in document;
    if (!Uu) {
      var Ph = document.createElement("div");
      (Ph.setAttribute("oninput", "return;"),
        (Uu = typeof Ph.oninput == "function"));
    }
    $u = Uu;
  } else $u = !1;
  fx = $u && (!document.documentMode || 9 < document.documentMode);
}
function _h() {
  ps && (ps.detachEvent("onpropertychange", px), (Rs = ps = null));
}
function px(e) {
  if (e.propertyName === "value" && Yl(Rs)) {
    var t = [];
    (dx(t, Rs, e, jf(e)), qy(Pk, t));
  }
}
function Rk(e, t, n) {
  e === "focusin"
    ? (_h(), (ps = t), (Rs = n), ps.attachEvent("onpropertychange", px))
    : e === "focusout" && _h();
}
function Mk(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Yl(Rs);
}
function Tk(e, t) {
  if (e === "click") return Yl(t);
}
function Ak(e, t) {
  if (e === "input" || e === "change") return Yl(t);
}
function Ik(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var dn = typeof Object.is == "function" ? Object.is : Ik;
function Ms(e, t) {
  if (dn(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!Ac.call(t, i) || !dn(e[i], t[i])) return !1;
  }
  return !0;
}
function Rh(e) {
  for (; e && e.firstChild;) e = e.firstChild;
  return e;
}
function Mh(e, t) {
  var n = Rh(e);
  e = 0;
  for (var r; n;) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n;) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Rh(n);
  }
}
function hx(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? hx(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function mx() {
  for (var e = window, t = al(); t instanceof e.HTMLIFrameElement;) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = al(e.document);
  }
  return t;
}
function Df(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function Ok(e) {
  var t = mx(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    hx(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && Df(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        ((n.selectionStart = t),
          (n.selectionEnd = Math.min(e, n.value.length)));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var i = n.textContent.length,
          o = Math.min(r.start, i);
        ((r = r.end === void 0 ? o : Math.min(r.end, i)),
          !e.extend && o > r && ((i = r), (r = o), (o = i)),
          (i = Mh(n, o)));
        var s = Mh(n, r);
        i &&
          s &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== s.node ||
            e.focusOffset !== s.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(s.node, s.offset))
            : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode);)
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      ((e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top));
  }
}
var Dk = Hn && "documentMode" in document && 11 >= document.documentMode,
  $i = null,
  Zc = null,
  hs = null,
  Jc = !1;
function Th(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Jc ||
    $i == null ||
    $i !== al(r) ||
    ((r = $i),
    "selectionStart" in r && Df(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (hs && Ms(hs, r)) ||
      ((hs = r),
      (r = hl(Zc, "onSelect")),
      0 < r.length &&
        ((t = new Af("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = $i))));
}
function ka(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Ui = {
    animationend: ka("Animation", "AnimationEnd"),
    animationiteration: ka("Animation", "AnimationIteration"),
    animationstart: ka("Animation", "AnimationStart"),
    transitionend: ka("Transition", "TransitionEnd"),
  },
  Wu = {},
  gx = {};
Hn &&
  ((gx = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Ui.animationend.animation,
    delete Ui.animationiteration.animation,
    delete Ui.animationstart.animation),
  "TransitionEvent" in window || delete Ui.transitionend.transition);
function Xl(e) {
  if (Wu[e]) return Wu[e];
  if (!Ui[e]) return e;
  var t = Ui[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in gx) return (Wu[e] = t[n]);
  return e;
}
var yx = Xl("animationend"),
  xx = Xl("animationiteration"),
  vx = Xl("animationstart"),
  wx = Xl("transitionend"),
  bx = new Map(),
  Ah =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
function Fr(e, t) {
  (bx.set(e, t), Ci(t, [e]));
}
for (var Vu = 0; Vu < Ah.length; Vu++) {
  var Hu = Ah[Vu],
    Lk = Hu.toLowerCase(),
    zk = Hu[0].toUpperCase() + Hu.slice(1);
  Fr(Lk, "on" + zk);
}
Fr(yx, "onAnimationEnd");
Fr(xx, "onAnimationIteration");
Fr(vx, "onAnimationStart");
Fr("dblclick", "onDoubleClick");
Fr("focusin", "onFocus");
Fr("focusout", "onBlur");
Fr(wx, "onTransitionEnd");
ko("onMouseEnter", ["mouseout", "mouseover"]);
ko("onMouseLeave", ["mouseout", "mouseover"]);
ko("onPointerEnter", ["pointerout", "pointerover"]);
ko("onPointerLeave", ["pointerout", "pointerover"]);
Ci(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
Ci(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
Ci("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Ci(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
Ci(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
Ci(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var as =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  Fk = new Set("cancel close invalid load scroll toggle".split(" ").concat(as));
function Ih(e, t, n) {
  var r = e.type || "unknown-event";
  ((e.currentTarget = n), Lb(r, t, void 0, e), (e.currentTarget = null));
}
function kx(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var s = r.length - 1; 0 <= s; s--) {
          var a = r[s],
            u = a.instance,
            c = a.currentTarget;
          if (((a = a.listener), u !== o && i.isPropagationStopped())) break e;
          (Ih(i, a, c), (o = u));
        }
      else
        for (s = 0; s < r.length; s++) {
          if (
            ((a = r[s]),
            (u = a.instance),
            (c = a.currentTarget),
            (a = a.listener),
            u !== o && i.isPropagationStopped())
          )
            break e;
          (Ih(i, a, c), (o = u));
        }
    }
  }
  if (ul) throw ((e = Kc), (ul = !1), (Kc = null), e);
}
function Ne(e, t) {
  var n = t[id];
  n === void 0 && (n = t[id] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Sx(t, e, 2, !1), n.add(r));
}
function qu(e, t, n) {
  var r = 0;
  (t && (r |= 4), Sx(n, e, r, t));
}
var Sa = "_reactListening" + Math.random().toString(36).slice(2);
function Ts(e) {
  if (!e[Sa]) {
    ((e[Sa] = !0),
      Ry.forEach(function (n) {
        n !== "selectionchange" && (Fk.has(n) || qu(n, !1, e), qu(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Sa] || ((t[Sa] = !0), qu("selectionchange", !1, t));
  }
}
function Sx(e, t, n, r) {
  switch (sx(t)) {
    case 1:
      var i = Jb;
      break;
    case 4:
      i = ek;
      break;
    default:
      i = Mf;
  }
  ((n = i.bind(null, t, n, e)),
    (i = void 0),
    !Qc ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: i })
        : e.addEventListener(t, n, !0)
      : i !== void 0
        ? e.addEventListener(t, n, { passive: i })
        : e.addEventListener(t, n, !1));
}
function Qu(e, t, n, r, i) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var s = r.tag;
      if (s === 3 || s === 4) {
        var a = r.stateNode.containerInfo;
        if (a === i || (a.nodeType === 8 && a.parentNode === i)) break;
        if (s === 4)
          for (s = r.return; s !== null;) {
            var u = s.tag;
            if (
              (u === 3 || u === 4) &&
              ((u = s.stateNode.containerInfo),
              u === i || (u.nodeType === 8 && u.parentNode === i))
            )
              return;
            s = s.return;
          }
        for (; a !== null;) {
          if (((s = ti(a)), s === null)) return;
          if (((u = s.tag), u === 5 || u === 6)) {
            r = o = s;
            continue e;
          }
          a = a.parentNode;
        }
      }
      r = r.return;
    }
  qy(function () {
    var c = o,
      d = jf(n),
      f = [];
    e: {
      var h = bx.get(e);
      if (h !== void 0) {
        var p = Af,
          v = e;
        switch (e) {
          case "keypress":
            if (Ka(n) === 0) break e;
          case "keydown":
          case "keyup":
            p = mk;
            break;
          case "focusin":
            ((v = "focus"), (p = Bu));
            break;
          case "focusout":
            ((v = "blur"), (p = Bu));
            break;
          case "beforeblur":
          case "afterblur":
            p = Bu;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            p = kh;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            p = rk;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            p = xk;
            break;
          case yx:
          case xx:
          case vx:
            p = sk;
            break;
          case wx:
            p = wk;
            break;
          case "scroll":
            p = tk;
            break;
          case "wheel":
            p = kk;
            break;
          case "copy":
          case "cut":
          case "paste":
            p = lk;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            p = Ch;
        }
        var g = (t & 4) !== 0,
          b = !g && e === "scroll",
          m = g ? (h !== null ? h + "Capture" : null) : h;
        g = [];
        for (var x = c, y; x !== null;) {
          y = x;
          var k = y.stateNode;
          if (
            (y.tag === 5 &&
              k !== null &&
              ((y = k),
              m !== null && ((k = Es(x, m)), k != null && g.push(As(x, k, y)))),
            b)
          )
            break;
          x = x.return;
        }
        0 < g.length &&
          ((h = new p(h, v, null, n, d)), f.push({ event: h, listeners: g }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((h = e === "mouseover" || e === "pointerover"),
          (p = e === "mouseout" || e === "pointerout"),
          h &&
            n !== Hc &&
            (v = n.relatedTarget || n.fromElement) &&
            (ti(v) || v[qn]))
        )
          break e;
        if (
          (p || h) &&
          ((h =
            d.window === d
              ? d
              : (h = d.ownerDocument)
                ? h.defaultView || h.parentWindow
                : window),
          p
            ? ((v = n.relatedTarget || n.toElement),
              (p = c),
              (v = v ? ti(v) : null),
              v !== null &&
                ((b = Ni(v)), v !== b || (v.tag !== 5 && v.tag !== 6)) &&
                (v = null))
            : ((p = null), (v = c)),
          p !== v)
        ) {
          if (
            ((g = kh),
            (k = "onMouseLeave"),
            (m = "onMouseEnter"),
            (x = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((g = Ch),
              (k = "onPointerLeave"),
              (m = "onPointerEnter"),
              (x = "pointer")),
            (b = p == null ? h : Wi(p)),
            (y = v == null ? h : Wi(v)),
            (h = new g(k, x + "leave", p, n, d)),
            (h.target = b),
            (h.relatedTarget = y),
            (k = null),
            ti(d) === c &&
              ((g = new g(m, x + "enter", v, n, d)),
              (g.target = y),
              (g.relatedTarget = b),
              (k = g)),
            (b = k),
            p && v)
          )
            t: {
              for (g = p, m = v, x = 0, y = g; y; y = Ai(y)) x++;
              for (y = 0, k = m; k; k = Ai(k)) y++;
              for (; 0 < x - y;) ((g = Ai(g)), x--);
              for (; 0 < y - x;) ((m = Ai(m)), y--);
              for (; x--;) {
                if (g === m || (m !== null && g === m.alternate)) break t;
                ((g = Ai(g)), (m = Ai(m)));
              }
              g = null;
            }
          else g = null;
          (p !== null && Oh(f, h, p, g, !1),
            v !== null && b !== null && Oh(f, b, v, g, !0));
        }
      }
      e: {
        if (
          ((h = c ? Wi(c) : window),
          (p = h.nodeName && h.nodeName.toLowerCase()),
          p === "select" || (p === "input" && h.type === "file"))
        )
          var N = _k;
        else if (jh(h))
          if (fx) N = Ak;
          else {
            N = Mk;
            var C = Rk;
          }
        else
          (p = h.nodeName) &&
            p.toLowerCase() === "input" &&
            (h.type === "checkbox" || h.type === "radio") &&
            (N = Tk);
        if (N && (N = N(e, c))) {
          dx(f, N, n, d);
          break e;
        }
        (C && C(e, h, c),
          e === "focusout" &&
            (C = h._wrapperState) &&
            C.controlled &&
            h.type === "number" &&
            Bc(h, "number", h.value));
      }
      switch (((C = c ? Wi(c) : window), e)) {
        case "focusin":
          (jh(C) || C.contentEditable === "true") &&
            (($i = C), (Zc = c), (hs = null));
          break;
        case "focusout":
          hs = Zc = $i = null;
          break;
        case "mousedown":
          Jc = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((Jc = !1), Th(f, n, d));
          break;
        case "selectionchange":
          if (Dk) break;
        case "keydown":
        case "keyup":
          Th(f, n, d);
      }
      var j;
      if (Of)
        e: {
          switch (e) {
            case "compositionstart":
              var P = "onCompositionStart";
              break e;
            case "compositionend":
              P = "onCompositionEnd";
              break e;
            case "compositionupdate":
              P = "onCompositionUpdate";
              break e;
          }
          P = void 0;
        }
      else
        Bi
          ? ux(e, n) && (P = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (P = "onCompositionStart");
      (P &&
        (lx &&
          n.locale !== "ko" &&
          (Bi || P !== "onCompositionStart"
            ? P === "onCompositionEnd" && Bi && (j = ax())
            : ((br = d),
              (Tf = "value" in br ? br.value : br.textContent),
              (Bi = !0))),
        (C = hl(c, P)),
        0 < C.length &&
          ((P = new Sh(P, e, null, n, d)),
          f.push({ event: P, listeners: C }),
          j ? (P.data = j) : ((j = cx(n)), j !== null && (P.data = j)))),
        (j = Ck ? Nk(e, n) : Ek(e, n)) &&
          ((c = hl(c, "onBeforeInput")),
          0 < c.length &&
            ((d = new Sh("onBeforeInput", "beforeinput", null, n, d)),
            f.push({ event: d, listeners: c }),
            (d.data = j))));
    }
    kx(f, t);
  });
}
function As(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function hl(e, t) {
  for (var n = t + "Capture", r = []; e !== null;) {
    var i = e,
      o = i.stateNode;
    (i.tag === 5 &&
      o !== null &&
      ((i = o),
      (o = Es(e, n)),
      o != null && r.unshift(As(e, o, i)),
      (o = Es(e, t)),
      o != null && r.push(As(e, o, i))),
      (e = e.return));
  }
  return r;
}
function Ai(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Oh(e, t, n, r, i) {
  for (var o = t._reactName, s = []; n !== null && n !== r;) {
    var a = n,
      u = a.alternate,
      c = a.stateNode;
    if (u !== null && u === r) break;
    (a.tag === 5 &&
      c !== null &&
      ((a = c),
      i
        ? ((u = Es(n, o)), u != null && s.unshift(As(n, u, a)))
        : i || ((u = Es(n, o)), u != null && s.push(As(n, u, a)))),
      (n = n.return));
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var Bk = /\r\n?/g,
  $k = /\u0000|\uFFFD/g;
function Dh(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      Bk,
      `
`,
    )
    .replace($k, "");
}
function Ca(e, t, n) {
  if (((t = Dh(t)), Dh(e) !== t && n)) throw Error(L(425));
}
function ml() {}
var ed = null,
  td = null;
function nd(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var rd = typeof setTimeout == "function" ? setTimeout : void 0,
  Uk = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Lh = typeof Promise == "function" ? Promise : void 0,
  Wk =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Lh < "u"
        ? function (e) {
            return Lh.resolve(null).then(e).catch(Vk);
          }
        : rd;
function Vk(e) {
  setTimeout(function () {
    throw e;
  });
}
function Ku(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === "/$")) {
        if (r === 0) {
          (e.removeChild(i), _s(t));
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = i;
  } while (n);
  _s(t);
}
function Pr(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function zh(e) {
  e = e.previousSibling;
  for (var t = 0; e;) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Oo = Math.random().toString(36).slice(2),
  Cn = "__reactFiber$" + Oo,
  Is = "__reactProps$" + Oo,
  qn = "__reactContainer$" + Oo,
  id = "__reactEvents$" + Oo,
  Hk = "__reactListeners$" + Oo,
  qk = "__reactHandles$" + Oo;
function ti(e) {
  var t = e[Cn];
  if (t) return t;
  for (var n = e.parentNode; n;) {
    if ((t = n[qn] || n[Cn])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = zh(e); e !== null;) {
          if ((n = e[Cn])) return n;
          e = zh(e);
        }
      return t;
    }
    ((e = n), (n = e.parentNode));
  }
  return null;
}
function ia(e) {
  return (
    (e = e[Cn] || e[qn]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Wi(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(L(33));
}
function Zl(e) {
  return e[Is] || null;
}
var od = [],
  Vi = -1;
function Br(e) {
  return { current: e };
}
function Ee(e) {
  0 > Vi || ((e.current = od[Vi]), (od[Vi] = null), Vi--);
}
function be(e, t) {
  (Vi++, (od[Vi] = e.current), (e.current = t));
}
var Or = {},
  at = Br(Or),
  St = Br(!1),
  hi = Or;
function So(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Or;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    o;
  for (o in n) i[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  );
}
function Ct(e) {
  return ((e = e.childContextTypes), e != null);
}
function gl() {
  (Ee(St), Ee(at));
}
function Fh(e, t, n) {
  if (at.current !== Or) throw Error(L(168));
  (be(at, t), be(St, n));
}
function Cx(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(L(108, Rb(e) || "Unknown", i));
  return Ae({}, n, r);
}
function yl(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Or),
    (hi = at.current),
    be(at, e),
    be(St, St.current),
    !0
  );
}
function Bh(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(L(169));
  (n
    ? ((e = Cx(e, t, hi)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      Ee(St),
      Ee(at),
      be(at, e))
    : Ee(St),
    be(St, n));
}
var Fn = null,
  Jl = !1,
  Gu = !1;
function Nx(e) {
  Fn === null ? (Fn = [e]) : Fn.push(e);
}
function Qk(e) {
  ((Jl = !0), Nx(e));
}
function $r() {
  if (!Gu && Fn !== null) {
    Gu = !0;
    var e = 0,
      t = ve;
    try {
      var n = Fn;
      for (ve = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      ((Fn = null), (Jl = !1));
    } catch (i) {
      throw (Fn !== null && (Fn = Fn.slice(e + 1)), Yy(Pf, $r), i);
    } finally {
      ((ve = t), (Gu = !1));
    }
  }
  return null;
}
var Hi = [],
  qi = 0,
  xl = null,
  vl = 0,
  Ht = [],
  qt = 0,
  mi = null,
  Bn = 1,
  $n = "";
function Zr(e, t) {
  ((Hi[qi++] = vl), (Hi[qi++] = xl), (xl = e), (vl = t));
}
function Ex(e, t, n) {
  ((Ht[qt++] = Bn), (Ht[qt++] = $n), (Ht[qt++] = mi), (mi = e));
  var r = Bn;
  e = $n;
  var i = 32 - un(r) - 1;
  ((r &= ~(1 << i)), (n += 1));
  var o = 32 - un(t) + i;
  if (30 < o) {
    var s = i - (i % 5);
    ((o = (r & ((1 << s) - 1)).toString(32)),
      (r >>= s),
      (i -= s),
      (Bn = (1 << (32 - un(t) + i)) | (n << i) | r),
      ($n = o + e));
  } else ((Bn = (1 << o) | (n << i) | r), ($n = e));
}
function Lf(e) {
  e.return !== null && (Zr(e, 1), Ex(e, 1, 0));
}
function zf(e) {
  for (; e === xl;)
    ((xl = Hi[--qi]), (Hi[qi] = null), (vl = Hi[--qi]), (Hi[qi] = null));
  for (; e === mi;)
    ((mi = Ht[--qt]),
      (Ht[qt] = null),
      ($n = Ht[--qt]),
      (Ht[qt] = null),
      (Bn = Ht[--qt]),
      (Ht[qt] = null));
}
var Dt = null,
  At = null,
  Pe = !1,
  an = null;
function jx(e, t) {
  var n = Kt(5, null, null, 0);
  ((n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function $h(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Dt = e), (At = Pr(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Dt = e), (At = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = mi !== null ? { id: Bn, overflow: $n } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Kt(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Dt = e),
            (At = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function sd(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function ad(e) {
  if (Pe) {
    var t = At;
    if (t) {
      var n = t;
      if (!$h(e, t)) {
        if (sd(e)) throw Error(L(418));
        t = Pr(n.nextSibling);
        var r = Dt;
        t && $h(e, t)
          ? jx(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (Pe = !1), (Dt = e));
      }
    } else {
      if (sd(e)) throw Error(L(418));
      ((e.flags = (e.flags & -4097) | 2), (Pe = !1), (Dt = e));
    }
  }
}
function Uh(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;)
    e = e.return;
  Dt = e;
}
function Na(e) {
  if (e !== Dt) return !1;
  if (!Pe) return (Uh(e), (Pe = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !nd(e.type, e.memoizedProps))),
    t && (t = At))
  ) {
    if (sd(e)) throw (Px(), Error(L(418)));
    for (; t;) (jx(e, t), (t = Pr(t.nextSibling)));
  }
  if ((Uh(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(L(317));
    e: {
      for (e = e.nextSibling, t = 0; e;) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              At = Pr(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      At = null;
    }
  } else At = Dt ? Pr(e.stateNode.nextSibling) : null;
  return !0;
}
function Px() {
  for (var e = At; e;) e = Pr(e.nextSibling);
}
function Co() {
  ((At = Dt = null), (Pe = !1));
}
function Ff(e) {
  an === null ? (an = [e]) : an.push(e);
}
var Kk = Yn.ReactCurrentBatchConfig;
function Yo(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(L(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(L(147, e));
      var i = r,
        o = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (s) {
            var a = i.refs;
            s === null ? delete a[o] : (a[o] = s);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(L(284));
    if (!n._owner) throw Error(L(290, e));
  }
  return e;
}
function Ea(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(
      L(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e,
      ),
    )
  );
}
function Wh(e) {
  var t = e._init;
  return t(e._payload);
}
function _x(e) {
  function t(m, x) {
    if (e) {
      var y = m.deletions;
      y === null ? ((m.deletions = [x]), (m.flags |= 16)) : y.push(x);
    }
  }
  function n(m, x) {
    if (!e) return null;
    for (; x !== null;) (t(m, x), (x = x.sibling));
    return null;
  }
  function r(m, x) {
    for (m = new Map(); x !== null;)
      (x.key !== null ? m.set(x.key, x) : m.set(x.index, x), (x = x.sibling));
    return m;
  }
  function i(m, x) {
    return ((m = Tr(m, x)), (m.index = 0), (m.sibling = null), m);
  }
  function o(m, x, y) {
    return (
      (m.index = y),
      e
        ? ((y = m.alternate),
          y !== null
            ? ((y = y.index), y < x ? ((m.flags |= 2), x) : y)
            : ((m.flags |= 2), x))
        : ((m.flags |= 1048576), x)
    );
  }
  function s(m) {
    return (e && m.alternate === null && (m.flags |= 2), m);
  }
  function a(m, x, y, k) {
    return x === null || x.tag !== 6
      ? ((x = nc(y, m.mode, k)), (x.return = m), x)
      : ((x = i(x, y)), (x.return = m), x);
  }
  function u(m, x, y, k) {
    var N = y.type;
    return N === Fi
      ? d(m, x, y.props.children, k, y.key)
      : x !== null &&
          (x.elementType === N ||
            (typeof N == "object" &&
              N !== null &&
              N.$$typeof === cr &&
              Wh(N) === x.type))
        ? ((k = i(x, y.props)), (k.ref = Yo(m, x, y)), (k.return = m), k)
        : ((k = tl(y.type, y.key, y.props, null, m.mode, k)),
          (k.ref = Yo(m, x, y)),
          (k.return = m),
          k);
  }
  function c(m, x, y, k) {
    return x === null ||
      x.tag !== 4 ||
      x.stateNode.containerInfo !== y.containerInfo ||
      x.stateNode.implementation !== y.implementation
      ? ((x = rc(y, m.mode, k)), (x.return = m), x)
      : ((x = i(x, y.children || [])), (x.return = m), x);
  }
  function d(m, x, y, k, N) {
    return x === null || x.tag !== 7
      ? ((x = fi(y, m.mode, k, N)), (x.return = m), x)
      : ((x = i(x, y)), (x.return = m), x);
  }
  function f(m, x, y) {
    if ((typeof x == "string" && x !== "") || typeof x == "number")
      return ((x = nc("" + x, m.mode, y)), (x.return = m), x);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case ma:
          return (
            (y = tl(x.type, x.key, x.props, null, m.mode, y)),
            (y.ref = Yo(m, null, x)),
            (y.return = m),
            y
          );
        case zi:
          return ((x = rc(x, m.mode, y)), (x.return = m), x);
        case cr:
          var k = x._init;
          return f(m, k(x._payload), y);
      }
      if (os(x) || Ho(x))
        return ((x = fi(x, m.mode, y, null)), (x.return = m), x);
      Ea(m, x);
    }
    return null;
  }
  function h(m, x, y, k) {
    var N = x !== null ? x.key : null;
    if ((typeof y == "string" && y !== "") || typeof y == "number")
      return N !== null ? null : a(m, x, "" + y, k);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case ma:
          return y.key === N ? u(m, x, y, k) : null;
        case zi:
          return y.key === N ? c(m, x, y, k) : null;
        case cr:
          return ((N = y._init), h(m, x, N(y._payload), k));
      }
      if (os(y) || Ho(y)) return N !== null ? null : d(m, x, y, k, null);
      Ea(m, y);
    }
    return null;
  }
  function p(m, x, y, k, N) {
    if ((typeof k == "string" && k !== "") || typeof k == "number")
      return ((m = m.get(y) || null), a(x, m, "" + k, N));
    if (typeof k == "object" && k !== null) {
      switch (k.$$typeof) {
        case ma:
          return (
            (m = m.get(k.key === null ? y : k.key) || null),
            u(x, m, k, N)
          );
        case zi:
          return (
            (m = m.get(k.key === null ? y : k.key) || null),
            c(x, m, k, N)
          );
        case cr:
          var C = k._init;
          return p(m, x, y, C(k._payload), N);
      }
      if (os(k) || Ho(k)) return ((m = m.get(y) || null), d(x, m, k, N, null));
      Ea(x, k);
    }
    return null;
  }
  function v(m, x, y, k) {
    for (
      var N = null, C = null, j = x, P = (x = 0), T = null;
      j !== null && P < y.length;
      P++
    ) {
      j.index > P ? ((T = j), (j = null)) : (T = j.sibling);
      var I = h(m, j, y[P], k);
      if (I === null) {
        j === null && (j = T);
        break;
      }
      (e && j && I.alternate === null && t(m, j),
        (x = o(I, x, P)),
        C === null ? (N = I) : (C.sibling = I),
        (C = I),
        (j = T));
    }
    if (P === y.length) return (n(m, j), Pe && Zr(m, P), N);
    if (j === null) {
      for (; P < y.length; P++)
        ((j = f(m, y[P], k)),
          j !== null &&
            ((x = o(j, x, P)),
            C === null ? (N = j) : (C.sibling = j),
            (C = j)));
      return (Pe && Zr(m, P), N);
    }
    for (j = r(m, j); P < y.length; P++)
      ((T = p(j, m, P, y[P], k)),
        T !== null &&
          (e && T.alternate !== null && j.delete(T.key === null ? P : T.key),
          (x = o(T, x, P)),
          C === null ? (N = T) : (C.sibling = T),
          (C = T)));
    return (
      e &&
        j.forEach(function (D) {
          return t(m, D);
        }),
      Pe && Zr(m, P),
      N
    );
  }
  function g(m, x, y, k) {
    var N = Ho(y);
    if (typeof N != "function") throw Error(L(150));
    if (((y = N.call(y)), y == null)) throw Error(L(151));
    for (
      var C = (N = null), j = x, P = (x = 0), T = null, I = y.next();
      j !== null && !I.done;
      P++, I = y.next()
    ) {
      j.index > P ? ((T = j), (j = null)) : (T = j.sibling);
      var D = h(m, j, I.value, k);
      if (D === null) {
        j === null && (j = T);
        break;
      }
      (e && j && D.alternate === null && t(m, j),
        (x = o(D, x, P)),
        C === null ? (N = D) : (C.sibling = D),
        (C = D),
        (j = T));
    }
    if (I.done) return (n(m, j), Pe && Zr(m, P), N);
    if (j === null) {
      for (; !I.done; P++, I = y.next())
        ((I = f(m, I.value, k)),
          I !== null &&
            ((x = o(I, x, P)),
            C === null ? (N = I) : (C.sibling = I),
            (C = I)));
      return (Pe && Zr(m, P), N);
    }
    for (j = r(m, j); !I.done; P++, I = y.next())
      ((I = p(j, m, P, I.value, k)),
        I !== null &&
          (e && I.alternate !== null && j.delete(I.key === null ? P : I.key),
          (x = o(I, x, P)),
          C === null ? (N = I) : (C.sibling = I),
          (C = I)));
    return (
      e &&
        j.forEach(function (O) {
          return t(m, O);
        }),
      Pe && Zr(m, P),
      N
    );
  }
  function b(m, x, y, k) {
    if (
      (typeof y == "object" &&
        y !== null &&
        y.type === Fi &&
        y.key === null &&
        (y = y.props.children),
      typeof y == "object" && y !== null)
    ) {
      switch (y.$$typeof) {
        case ma:
          e: {
            for (var N = y.key, C = x; C !== null;) {
              if (C.key === N) {
                if (((N = y.type), N === Fi)) {
                  if (C.tag === 7) {
                    (n(m, C.sibling),
                      (x = i(C, y.props.children)),
                      (x.return = m),
                      (m = x));
                    break e;
                  }
                } else if (
                  C.elementType === N ||
                  (typeof N == "object" &&
                    N !== null &&
                    N.$$typeof === cr &&
                    Wh(N) === C.type)
                ) {
                  (n(m, C.sibling),
                    (x = i(C, y.props)),
                    (x.ref = Yo(m, C, y)),
                    (x.return = m),
                    (m = x));
                  break e;
                }
                n(m, C);
                break;
              } else t(m, C);
              C = C.sibling;
            }
            y.type === Fi
              ? ((x = fi(y.props.children, m.mode, k, y.key)),
                (x.return = m),
                (m = x))
              : ((k = tl(y.type, y.key, y.props, null, m.mode, k)),
                (k.ref = Yo(m, x, y)),
                (k.return = m),
                (m = k));
          }
          return s(m);
        case zi:
          e: {
            for (C = y.key; x !== null;) {
              if (x.key === C)
                if (
                  x.tag === 4 &&
                  x.stateNode.containerInfo === y.containerInfo &&
                  x.stateNode.implementation === y.implementation
                ) {
                  (n(m, x.sibling),
                    (x = i(x, y.children || [])),
                    (x.return = m),
                    (m = x));
                  break e;
                } else {
                  n(m, x);
                  break;
                }
              else t(m, x);
              x = x.sibling;
            }
            ((x = rc(y, m.mode, k)), (x.return = m), (m = x));
          }
          return s(m);
        case cr:
          return ((C = y._init), b(m, x, C(y._payload), k));
      }
      if (os(y)) return v(m, x, y, k);
      if (Ho(y)) return g(m, x, y, k);
      Ea(m, y);
    }
    return (typeof y == "string" && y !== "") || typeof y == "number"
      ? ((y = "" + y),
        x !== null && x.tag === 6
          ? (n(m, x.sibling), (x = i(x, y)), (x.return = m), (m = x))
          : (n(m, x), (x = nc(y, m.mode, k)), (x.return = m), (m = x)),
        s(m))
      : n(m, x);
  }
  return b;
}
var No = _x(!0),
  Rx = _x(!1),
  wl = Br(null),
  bl = null,
  Qi = null,
  Bf = null;
function $f() {
  Bf = Qi = bl = null;
}
function Uf(e) {
  var t = wl.current;
  (Ee(wl), (e._currentValue = t));
}
function ld(e, t, n) {
  for (; e !== null;) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function eo(e, t) {
  ((bl = e),
    (Bf = Qi = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (kt = !0), (e.firstContext = null)));
}
function Xt(e) {
  var t = e._currentValue;
  if (Bf !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Qi === null)) {
      if (bl === null) throw Error(L(308));
      ((Qi = e), (bl.dependencies = { lanes: 0, firstContext: e }));
    } else Qi = Qi.next = e;
  return t;
}
var ni = null;
function Wf(e) {
  ni === null ? (ni = [e]) : ni.push(e);
}
function Mx(e, t, n, r) {
  var i = t.interleaved;
  return (
    i === null ? ((n.next = n), Wf(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    Qn(e, r)
  );
}
function Qn(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;)
    ((e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return));
  return n.tag === 3 ? n.stateNode : null;
}
var dr = !1;
function Vf(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Tx(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      }));
}
function Un(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function _r(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), me & 2)) {
    var i = r.pending;
    return (
      i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
      (r.pending = t),
      Qn(e, n)
    );
  }
  return (
    (i = r.interleaved),
    i === null ? ((t.next = t), Wf(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    Qn(e, n)
  );
}
function Ga(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), _f(e, n));
  }
}
function Vh(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var i = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var s = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        (o === null ? (i = o = s) : (o = o.next = s), (n = n.next));
      } while (n !== null);
      o === null ? (i = o = t) : (o = o.next = t);
    } else i = o = t;
    ((n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n));
    return;
  }
  ((e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t));
}
function kl(e, t, n, r) {
  var i = e.updateQueue;
  dr = !1;
  var o = i.firstBaseUpdate,
    s = i.lastBaseUpdate,
    a = i.shared.pending;
  if (a !== null) {
    i.shared.pending = null;
    var u = a,
      c = u.next;
    ((u.next = null), s === null ? (o = c) : (s.next = c), (s = u));
    var d = e.alternate;
    d !== null &&
      ((d = d.updateQueue),
      (a = d.lastBaseUpdate),
      a !== s &&
        (a === null ? (d.firstBaseUpdate = c) : (a.next = c),
        (d.lastBaseUpdate = u)));
  }
  if (o !== null) {
    var f = i.baseState;
    ((s = 0), (d = c = u = null), (a = o));
    do {
      var h = a.lane,
        p = a.eventTime;
      if ((r & h) === h) {
        d !== null &&
          (d = d.next =
            {
              eventTime: p,
              lane: 0,
              tag: a.tag,
              payload: a.payload,
              callback: a.callback,
              next: null,
            });
        e: {
          var v = e,
            g = a;
          switch (((h = t), (p = n), g.tag)) {
            case 1:
              if (((v = g.payload), typeof v == "function")) {
                f = v.call(p, f, h);
                break e;
              }
              f = v;
              break e;
            case 3:
              v.flags = (v.flags & -65537) | 128;
            case 0:
              if (
                ((v = g.payload),
                (h = typeof v == "function" ? v.call(p, f, h) : v),
                h == null)
              )
                break e;
              f = Ae({}, f, h);
              break e;
            case 2:
              dr = !0;
          }
        }
        a.callback !== null &&
          a.lane !== 0 &&
          ((e.flags |= 64),
          (h = i.effects),
          h === null ? (i.effects = [a]) : h.push(a));
      } else
        ((p = {
          eventTime: p,
          lane: h,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null,
        }),
          d === null ? ((c = d = p), (u = f)) : (d = d.next = p),
          (s |= h));
      if (((a = a.next), a === null)) {
        if (((a = i.shared.pending), a === null)) break;
        ((h = a),
          (a = h.next),
          (h.next = null),
          (i.lastBaseUpdate = h),
          (i.shared.pending = null));
      }
    } while (!0);
    if (
      (d === null && (u = f),
      (i.baseState = u),
      (i.firstBaseUpdate = c),
      (i.lastBaseUpdate = d),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t;
      do ((s |= i.lane), (i = i.next));
      while (i !== t);
    } else o === null && (i.shared.lanes = 0);
    ((yi |= s), (e.lanes = s), (e.memoizedState = f));
  }
}
function Hh(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != "function"))
          throw Error(L(191, i));
        i.call(r);
      }
    }
}
var oa = {},
  _n = Br(oa),
  Os = Br(oa),
  Ds = Br(oa);
function ri(e) {
  if (e === oa) throw Error(L(174));
  return e;
}
function Hf(e, t) {
  switch ((be(Ds, t), be(Os, e), be(_n, oa), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Uc(null, "");
      break;
    default:
      ((e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Uc(t, e)));
  }
  (Ee(_n), be(_n, t));
}
function Eo() {
  (Ee(_n), Ee(Os), Ee(Ds));
}
function Ax(e) {
  ri(Ds.current);
  var t = ri(_n.current),
    n = Uc(t, e.type);
  t !== n && (be(Os, e), be(_n, n));
}
function qf(e) {
  Os.current === e && (Ee(_n), Ee(Os));
}
var Re = Br(0);
function Sl(e) {
  for (var t = e; t !== null;) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null;) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
var Yu = [];
function Qf() {
  for (var e = 0; e < Yu.length; e++)
    Yu[e]._workInProgressVersionPrimary = null;
  Yu.length = 0;
}
var Ya = Yn.ReactCurrentDispatcher,
  Xu = Yn.ReactCurrentBatchConfig,
  gi = 0,
  Me = null,
  Ue = null,
  Qe = null,
  Cl = !1,
  ms = !1,
  Ls = 0,
  Gk = 0;
function rt() {
  throw Error(L(321));
}
function Kf(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!dn(e[n], t[n])) return !1;
  return !0;
}
function Gf(e, t, n, r, i, o) {
  if (
    ((gi = o),
    (Me = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Ya.current = e === null || e.memoizedState === null ? Jk : eS),
    (e = n(r, i)),
    ms)
  ) {
    o = 0;
    do {
      if (((ms = !1), (Ls = 0), 25 <= o)) throw Error(L(301));
      ((o += 1),
        (Qe = Ue = null),
        (t.updateQueue = null),
        (Ya.current = tS),
        (e = n(r, i)));
    } while (ms);
  }
  if (
    ((Ya.current = Nl),
    (t = Ue !== null && Ue.next !== null),
    (gi = 0),
    (Qe = Ue = Me = null),
    (Cl = !1),
    t)
  )
    throw Error(L(300));
  return e;
}
function Yf() {
  var e = Ls !== 0;
  return ((Ls = 0), e);
}
function xn() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (Qe === null ? (Me.memoizedState = Qe = e) : (Qe = Qe.next = e), Qe);
}
function Zt() {
  if (Ue === null) {
    var e = Me.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Ue.next;
  var t = Qe === null ? Me.memoizedState : Qe.next;
  if (t !== null) ((Qe = t), (Ue = e));
  else {
    if (e === null) throw Error(L(310));
    ((Ue = e),
      (e = {
        memoizedState: Ue.memoizedState,
        baseState: Ue.baseState,
        baseQueue: Ue.baseQueue,
        queue: Ue.queue,
        next: null,
      }),
      Qe === null ? (Me.memoizedState = Qe = e) : (Qe = Qe.next = e));
  }
  return Qe;
}
function zs(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Zu(e) {
  var t = Zt(),
    n = t.queue;
  if (n === null) throw Error(L(311));
  n.lastRenderedReducer = e;
  var r = Ue,
    i = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (i !== null) {
      var s = i.next;
      ((i.next = o.next), (o.next = s));
    }
    ((r.baseQueue = i = o), (n.pending = null));
  }
  if (i !== null) {
    ((o = i.next), (r = r.baseState));
    var a = (s = null),
      u = null,
      c = o;
    do {
      var d = c.lane;
      if ((gi & d) === d)
        (u !== null &&
          (u = u.next =
            {
              lane: 0,
              action: c.action,
              hasEagerState: c.hasEagerState,
              eagerState: c.eagerState,
              next: null,
            }),
          (r = c.hasEagerState ? c.eagerState : e(r, c.action)));
      else {
        var f = {
          lane: d,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null,
        };
        (u === null ? ((a = u = f), (s = r)) : (u = u.next = f),
          (Me.lanes |= d),
          (yi |= d));
      }
      c = c.next;
    } while (c !== null && c !== o);
    (u === null ? (s = r) : (u.next = a),
      dn(r, t.memoizedState) || (kt = !0),
      (t.memoizedState = r),
      (t.baseState = s),
      (t.baseQueue = u),
      (n.lastRenderedState = r));
  }
  if (((e = n.interleaved), e !== null)) {
    i = e;
    do ((o = i.lane), (Me.lanes |= o), (yi |= o), (i = i.next));
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Ju(e) {
  var t = Zt(),
    n = t.queue;
  if (n === null) throw Error(L(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    o = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var s = (i = i.next);
    do ((o = e(o, s.action)), (s = s.next));
    while (s !== i);
    (dn(o, t.memoizedState) || (kt = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o));
  }
  return [o, r];
}
function Ix() {}
function Ox(e, t) {
  var n = Me,
    r = Zt(),
    i = t(),
    o = !dn(r.memoizedState, i);
  if (
    (o && ((r.memoizedState = i), (kt = !0)),
    (r = r.queue),
    Xf(zx.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (Qe !== null && Qe.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Fs(9, Lx.bind(null, n, r, i, t), void 0, null),
      Ke === null)
    )
      throw Error(L(349));
    gi & 30 || Dx(n, t, i);
  }
  return i;
}
function Dx(e, t, n) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = Me.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Me.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function Lx(e, t, n, r) {
  ((t.value = n), (t.getSnapshot = r), Fx(t) && Bx(e));
}
function zx(e, t, n) {
  return n(function () {
    Fx(t) && Bx(e);
  });
}
function Fx(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !dn(e, n);
  } catch {
    return !0;
  }
}
function Bx(e) {
  var t = Qn(e, 1);
  t !== null && cn(t, e, 1, -1);
}
function qh(e) {
  var t = xn();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: zs,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Zk.bind(null, Me, e)),
    [t.memoizedState, e]
  );
}
function Fs(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = Me.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Me.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function $x() {
  return Zt().memoizedState;
}
function Xa(e, t, n, r) {
  var i = xn();
  ((Me.flags |= e),
    (i.memoizedState = Fs(1 | t, n, void 0, r === void 0 ? null : r)));
}
function eu(e, t, n, r) {
  var i = Zt();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (Ue !== null) {
    var s = Ue.memoizedState;
    if (((o = s.destroy), r !== null && Kf(r, s.deps))) {
      i.memoizedState = Fs(t, n, o, r);
      return;
    }
  }
  ((Me.flags |= e), (i.memoizedState = Fs(1 | t, n, o, r)));
}
function Qh(e, t) {
  return Xa(8390656, 8, e, t);
}
function Xf(e, t) {
  return eu(2048, 8, e, t);
}
function Ux(e, t) {
  return eu(4, 2, e, t);
}
function Wx(e, t) {
  return eu(4, 4, e, t);
}
function Vx(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Hx(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null),
    eu(4, 4, Vx.bind(null, t, e), n)
  );
}
function Zf() {}
function qx(e, t) {
  var n = Zt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Kf(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function Qx(e, t) {
  var n = Zt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Kf(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Kx(e, t, n) {
  return gi & 21
    ? (dn(n, t) || ((n = Jy()), (Me.lanes |= n), (yi |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (kt = !0)), (e.memoizedState = n));
}
function Yk(e, t) {
  var n = ve;
  ((ve = n !== 0 && 4 > n ? n : 4), e(!0));
  var r = Xu.transition;
  Xu.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((ve = n), (Xu.transition = r));
  }
}
function Gx() {
  return Zt().memoizedState;
}
function Xk(e, t, n) {
  var r = Mr(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Yx(e))
  )
    Xx(t, n);
  else if (((n = Mx(e, t, n, r)), n !== null)) {
    var i = pt();
    (cn(n, e, r, i), Zx(n, t, r));
  }
}
function Zk(e, t, n) {
  var r = Mr(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Yx(e)) Xx(t, i);
  else {
    var o = e.alternate;
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var s = t.lastRenderedState,
          a = o(s, n);
        if (((i.hasEagerState = !0), (i.eagerState = a), dn(a, s))) {
          var u = t.interleaved;
          (u === null
            ? ((i.next = i), Wf(t))
            : ((i.next = u.next), (u.next = i)),
            (t.interleaved = i));
          return;
        }
      } catch {
      } finally {
      }
    ((n = Mx(e, t, i, r)),
      n !== null && ((i = pt()), cn(n, e, r, i), Zx(n, t, r)));
  }
}
function Yx(e) {
  var t = e.alternate;
  return e === Me || (t !== null && t === Me);
}
function Xx(e, t) {
  ms = Cl = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t));
}
function Zx(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), _f(e, n));
  }
}
var Nl = {
    readContext: Xt,
    useCallback: rt,
    useContext: rt,
    useEffect: rt,
    useImperativeHandle: rt,
    useInsertionEffect: rt,
    useLayoutEffect: rt,
    useMemo: rt,
    useReducer: rt,
    useRef: rt,
    useState: rt,
    useDebugValue: rt,
    useDeferredValue: rt,
    useTransition: rt,
    useMutableSource: rt,
    useSyncExternalStore: rt,
    useId: rt,
    unstable_isNewReconciler: !1,
  },
  Jk = {
    readContext: Xt,
    useCallback: function (e, t) {
      return ((xn().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: Xt,
    useEffect: Qh,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Xa(4194308, 4, Vx.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Xa(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Xa(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = xn();
      return (
        (t = t === void 0 ? null : t),
        (e = e()),
        (n.memoizedState = [e, t]),
        e
      );
    },
    useReducer: function (e, t, n) {
      var r = xn();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Xk.bind(null, Me, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = xn();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: qh,
    useDebugValue: Zf,
    useDeferredValue: function (e) {
      return (xn().memoizedState = e);
    },
    useTransition: function () {
      var e = qh(!1),
        t = e[0];
      return ((e = Yk.bind(null, e[1])), (xn().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = Me,
        i = xn();
      if (Pe) {
        if (n === void 0) throw Error(L(407));
        n = n();
      } else {
        if (((n = t()), Ke === null)) throw Error(L(349));
        gi & 30 || Dx(r, t, n);
      }
      i.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (i.queue = o),
        Qh(zx.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        Fs(9, Lx.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = xn(),
        t = Ke.identifierPrefix;
      if (Pe) {
        var n = $n,
          r = Bn;
        ((n = (r & ~(1 << (32 - un(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = Ls++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":"));
      } else ((n = Gk++), (t = ":" + t + "r" + n.toString(32) + ":"));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  eS = {
    readContext: Xt,
    useCallback: qx,
    useContext: Xt,
    useEffect: Xf,
    useImperativeHandle: Hx,
    useInsertionEffect: Ux,
    useLayoutEffect: Wx,
    useMemo: Qx,
    useReducer: Zu,
    useRef: $x,
    useState: function () {
      return Zu(zs);
    },
    useDebugValue: Zf,
    useDeferredValue: function (e) {
      var t = Zt();
      return Kx(t, Ue.memoizedState, e);
    },
    useTransition: function () {
      var e = Zu(zs)[0],
        t = Zt().memoizedState;
      return [e, t];
    },
    useMutableSource: Ix,
    useSyncExternalStore: Ox,
    useId: Gx,
    unstable_isNewReconciler: !1,
  },
  tS = {
    readContext: Xt,
    useCallback: qx,
    useContext: Xt,
    useEffect: Xf,
    useImperativeHandle: Hx,
    useInsertionEffect: Ux,
    useLayoutEffect: Wx,
    useMemo: Qx,
    useReducer: Ju,
    useRef: $x,
    useState: function () {
      return Ju(zs);
    },
    useDebugValue: Zf,
    useDeferredValue: function (e) {
      var t = Zt();
      return Ue === null ? (t.memoizedState = e) : Kx(t, Ue.memoizedState, e);
    },
    useTransition: function () {
      var e = Ju(zs)[0],
        t = Zt().memoizedState;
      return [e, t];
    },
    useMutableSource: Ix,
    useSyncExternalStore: Ox,
    useId: Gx,
    unstable_isNewReconciler: !1,
  };
function rn(e, t) {
  if (e && e.defaultProps) {
    ((t = Ae({}, t)), (e = e.defaultProps));
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function ud(e, t, n, r) {
  ((t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : Ae({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n));
}
var tu = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Ni(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = pt(),
      i = Mr(e),
      o = Un(r, i);
    ((o.payload = t),
      n != null && (o.callback = n),
      (t = _r(e, o, i)),
      t !== null && (cn(t, e, i, r), Ga(t, e, i)));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = pt(),
      i = Mr(e),
      o = Un(r, i);
    ((o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = _r(e, o, i)),
      t !== null && (cn(t, e, i, r), Ga(t, e, i)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = pt(),
      r = Mr(e),
      i = Un(n, r);
    ((i.tag = 2),
      t != null && (i.callback = t),
      (t = _r(e, i, r)),
      t !== null && (cn(t, e, r, n), Ga(t, e, r)));
  },
};
function Kh(e, t, n, r, i, o, s) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, o, s)
      : t.prototype && t.prototype.isPureReactComponent
        ? !Ms(n, r) || !Ms(i, o)
        : !0
  );
}
function Jx(e, t, n) {
  var r = !1,
    i = Or,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = Xt(o))
      : ((i = Ct(t) ? hi : at.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? So(e, i) : Or)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = tu),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function Gh(e, t, n, r) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && tu.enqueueReplaceState(t, t.state, null));
}
function cd(e, t, n, r) {
  var i = e.stateNode;
  ((i.props = n), (i.state = e.memoizedState), (i.refs = {}), Vf(e));
  var o = t.contextType;
  (typeof o == "object" && o !== null
    ? (i.context = Xt(o))
    : ((o = Ct(t) ? hi : at.current), (i.context = So(e, o))),
    (i.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (ud(e, t, o, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function" ||
      (typeof i.UNSAFE_componentWillMount != "function" &&
        typeof i.componentWillMount != "function") ||
      ((t = i.state),
      typeof i.componentWillMount == "function" && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == "function" &&
        i.UNSAFE_componentWillMount(),
      t !== i.state && tu.enqueueReplaceState(i, i.state, null),
      kl(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308));
}
function jo(e, t) {
  try {
    var n = "",
      r = t;
    do ((n += _b(r)), (r = r.return));
    while (r);
    var i = n;
  } catch (o) {
    i =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function ec(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function dd(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var nS = typeof WeakMap == "function" ? WeakMap : Map;
function ev(e, t, n) {
  ((n = Un(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = t.value;
  return (
    (n.callback = function () {
      (jl || ((jl = !0), (bd = r)), dd(e, t));
    }),
    n
  );
}
function tv(e, t, n) {
  ((n = Un(-1, n)), (n.tag = 3));
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    ((n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        dd(e, t);
      }));
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (n.callback = function () {
        (dd(e, t),
          typeof r != "function" &&
            (Rr === null ? (Rr = new Set([this])) : Rr.add(this)));
        var s = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: s !== null ? s : "",
        });
      }),
    n
  );
}
function Yh(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new nS();
    var i = new Set();
    r.set(t, i);
  } else ((i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i)));
  i.has(n) || (i.add(n), (e = gS.bind(null, e, t, n)), t.then(e, e));
}
function Xh(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Zh(e, t, n, r, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Un(-1, 1)), (t.tag = 2), _r(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var rS = Yn.ReactCurrentOwner,
  kt = !1;
function ft(e, t, n, r) {
  t.child = e === null ? Rx(t, null, n, r) : No(t, e.child, n, r);
}
function Jh(e, t, n, r, i) {
  n = n.render;
  var o = t.ref;
  return (
    eo(t, i),
    (r = Gf(e, t, n, r, o, i)),
    (n = Yf()),
    e !== null && !kt
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Kn(e, t, i))
      : (Pe && n && Lf(t), (t.flags |= 1), ft(e, t, r, i), t.child)
  );
}
function em(e, t, n, r, i) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" &&
      !sp(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), nv(e, t, o, r, i))
      : ((e = tl(n.type, null, r, t, t.mode, i)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((o = e.child), !(e.lanes & i))) {
    var s = o.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Ms), n(s, r) && e.ref === t.ref)
    )
      return Kn(e, t, i);
  }
  return (
    (t.flags |= 1),
    (e = Tr(o, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function nv(e, t, n, r, i) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Ms(o, r) && e.ref === t.ref)
      if (((kt = !1), (t.pendingProps = r = o), (e.lanes & i) !== 0))
        e.flags & 131072 && (kt = !0);
      else return ((t.lanes = e.lanes), Kn(e, t, i));
  }
  return fd(e, t, n, r, i);
}
function rv(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        be(Gi, Tt),
        (Tt |= n));
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          be(Gi, Tt),
          (Tt |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        be(Gi, Tt),
        (Tt |= r));
    }
  else
    (o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
      be(Gi, Tt),
      (Tt |= r));
  return (ft(e, t, i, n), t.child);
}
function iv(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function fd(e, t, n, r, i) {
  var o = Ct(n) ? hi : at.current;
  return (
    (o = So(t, o)),
    eo(t, i),
    (n = Gf(e, t, n, r, o, i)),
    (r = Yf()),
    e !== null && !kt
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Kn(e, t, i))
      : (Pe && r && Lf(t), (t.flags |= 1), ft(e, t, n, i), t.child)
  );
}
function tm(e, t, n, r, i) {
  if (Ct(n)) {
    var o = !0;
    yl(t);
  } else o = !1;
  if ((eo(t, i), t.stateNode === null))
    (Za(e, t), Jx(t, n, r), cd(t, n, r, i), (r = !0));
  else if (e === null) {
    var s = t.stateNode,
      a = t.memoizedProps;
    s.props = a;
    var u = s.context,
      c = n.contextType;
    typeof c == "object" && c !== null
      ? (c = Xt(c))
      : ((c = Ct(n) ? hi : at.current), (c = So(t, c)));
    var d = n.getDerivedStateFromProps,
      f =
        typeof d == "function" ||
        typeof s.getSnapshotBeforeUpdate == "function";
    (f ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
        typeof s.componentWillReceiveProps != "function") ||
      ((a !== r || u !== c) && Gh(t, s, r, c)),
      (dr = !1));
    var h = t.memoizedState;
    ((s.state = h),
      kl(t, r, s, i),
      (u = t.memoizedState),
      a !== r || h !== u || St.current || dr
        ? (typeof d == "function" && (ud(t, n, d, r), (u = t.memoizedState)),
          (a = dr || Kh(t, n, a, r, h, u, c))
            ? (f ||
                (typeof s.UNSAFE_componentWillMount != "function" &&
                  typeof s.componentWillMount != "function") ||
                (typeof s.componentWillMount == "function" &&
                  s.componentWillMount(),
                typeof s.UNSAFE_componentWillMount == "function" &&
                  s.UNSAFE_componentWillMount()),
              typeof s.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = u)),
          (s.props = r),
          (s.state = u),
          (s.context = c),
          (r = a))
        : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1)));
  } else {
    ((s = t.stateNode),
      Tx(e, t),
      (a = t.memoizedProps),
      (c = t.type === t.elementType ? a : rn(t.type, a)),
      (s.props = c),
      (f = t.pendingProps),
      (h = s.context),
      (u = n.contextType),
      typeof u == "object" && u !== null
        ? (u = Xt(u))
        : ((u = Ct(n) ? hi : at.current), (u = So(t, u))));
    var p = n.getDerivedStateFromProps;
    ((d =
      typeof p == "function" ||
      typeof s.getSnapshotBeforeUpdate == "function") ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
        typeof s.componentWillReceiveProps != "function") ||
      ((a !== f || h !== u) && Gh(t, s, r, u)),
      (dr = !1),
      (h = t.memoizedState),
      (s.state = h),
      kl(t, r, s, i));
    var v = t.memoizedState;
    a !== f || h !== v || St.current || dr
      ? (typeof p == "function" && (ud(t, n, p, r), (v = t.memoizedState)),
        (c = dr || Kh(t, n, c, r, h, v, u) || !1)
          ? (d ||
              (typeof s.UNSAFE_componentWillUpdate != "function" &&
                typeof s.componentWillUpdate != "function") ||
              (typeof s.componentWillUpdate == "function" &&
                s.componentWillUpdate(r, v, u),
              typeof s.UNSAFE_componentWillUpdate == "function" &&
                s.UNSAFE_componentWillUpdate(r, v, u)),
            typeof s.componentDidUpdate == "function" && (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof s.componentDidUpdate != "function" ||
              (a === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate != "function" ||
              (a === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = v)),
        (s.props = r),
        (s.state = v),
        (s.context = u),
        (r = c))
      : (typeof s.componentDidUpdate != "function" ||
          (a === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 4),
        typeof s.getSnapshotBeforeUpdate != "function" ||
          (a === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return pd(e, t, n, r, o, i);
}
function pd(e, t, n, r, i, o) {
  iv(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return (i && Bh(t, n, !1), Kn(e, t, o));
  ((r = t.stateNode), (rS.current = t));
  var a =
    s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && s
      ? ((t.child = No(t, e.child, null, o)), (t.child = No(t, null, a, o)))
      : ft(e, t, a, o),
    (t.memoizedState = r.state),
    i && Bh(t, n, !0),
    t.child
  );
}
function ov(e) {
  var t = e.stateNode;
  (t.pendingContext
    ? Fh(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Fh(e, t.context, !1),
    Hf(e, t.containerInfo));
}
function nm(e, t, n, r, i) {
  return (Co(), Ff(i), (t.flags |= 256), ft(e, t, n, r), t.child);
}
var hd = { dehydrated: null, treeContext: null, retryLane: 0 };
function md(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function sv(e, t, n) {
  var r = t.pendingProps,
    i = Re.current,
    o = !1,
    s = (t.flags & 128) !== 0,
    a;
  if (
    ((a = s) ||
      (a = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    a
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (i |= 1),
    be(Re, i & 1),
    e === null)
  )
    return (
      ad(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((s = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (s = { mode: "hidden", children: s }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = s))
                : (o = iu(s, r, 0, null)),
              (e = fi(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = md(n)),
              (t.memoizedState = hd),
              e)
            : Jf(t, s))
    );
  if (((i = e.memoizedState), i !== null && ((a = i.dehydrated), a !== null)))
    return iS(e, t, s, r, a, i, n);
  if (o) {
    ((o = r.fallback), (s = t.mode), (i = e.child), (a = i.sibling));
    var u = { mode: "hidden", children: r.children };
    return (
      !(s & 1) && t.child !== i
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = u),
          (t.deletions = null))
        : ((r = Tr(i, u)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
      a !== null ? (o = Tr(a, o)) : ((o = fi(o, s, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (s = e.child.memoizedState),
      (s =
        s === null
          ? md(n)
          : {
              baseLanes: s.baseLanes | n,
              cachePool: null,
              transitions: s.transitions,
            }),
      (o.memoizedState = s),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = hd),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = Tr(o, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Jf(e, t) {
  return (
    (t = iu({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function ja(e, t, n, r) {
  return (
    r !== null && Ff(r),
    No(t, e.child, null, n),
    (e = Jf(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function iS(e, t, n, r, i, o, s) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = ec(Error(L(422)))), ja(e, t, s, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((o = r.fallback),
          (i = t.mode),
          (r = iu({ mode: "visible", children: r.children }, i, 0, null)),
          (o = fi(o, i, s, null)),
          (o.flags |= 2),
          (r.return = t),
          (o.return = t),
          (r.sibling = o),
          (t.child = r),
          t.mode & 1 && No(t, e.child, null, s),
          (t.child.memoizedState = md(s)),
          (t.memoizedState = hd),
          o);
  if (!(t.mode & 1)) return ja(e, t, s, null);
  if (i.data === "$!") {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var a = r.dgst;
    return (
      (r = a),
      (o = Error(L(419))),
      (r = ec(o, r, void 0)),
      ja(e, t, s, r)
    );
  }
  if (((a = (s & e.childLanes) !== 0), kt || a)) {
    if (((r = Ke), r !== null)) {
      switch (s & -s) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      ((i = i & (r.suspendedLanes | s) ? 0 : i),
        i !== 0 &&
          i !== o.retryLane &&
          ((o.retryLane = i), Qn(e, i), cn(r, e, i, -1)));
    }
    return (op(), (r = ec(Error(L(421)))), ja(e, t, s, r));
  }
  return i.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = yS.bind(null, e)),
      (i._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (At = Pr(i.nextSibling)),
      (Dt = t),
      (Pe = !0),
      (an = null),
      e !== null &&
        ((Ht[qt++] = Bn),
        (Ht[qt++] = $n),
        (Ht[qt++] = mi),
        (Bn = e.id),
        ($n = e.overflow),
        (mi = t)),
      (t = Jf(t, r.children)),
      (t.flags |= 4096),
      t);
}
function rm(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  (r !== null && (r.lanes |= t), ld(e.return, t, n));
}
function tc(e, t, n, r, i) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = i));
}
function av(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    o = r.tail;
  if ((ft(e, t, r.children, n), (r = Re.current), r & 2))
    ((r = (r & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null;) {
        if (e.tag === 13) e.memoizedState !== null && rm(e, n, t);
        else if (e.tag === 19) rm(e, n, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null;) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    r &= 1;
  }
  if ((be(Re, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null;)
          ((e = n.alternate),
            e !== null && Sl(e) === null && (i = n),
            (n = n.sibling));
        ((n = i),
          n === null
            ? ((i = t.child), (t.child = null))
            : ((i = n.sibling), (n.sibling = null)),
          tc(t, !1, i, n, o));
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null;) {
          if (((e = i.alternate), e !== null && Sl(e) === null)) {
            t.child = i;
            break;
          }
          ((e = i.sibling), (i.sibling = n), (n = i), (i = e));
        }
        tc(t, !0, n, null, o);
        break;
      case "together":
        tc(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Za(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Kn(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (yi |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(L(153));
  if (t.child !== null) {
    for (
      e = t.child, n = Tr(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;
    )
      ((e = e.sibling),
        (n = n.sibling = Tr(e, e.pendingProps)),
        (n.return = t));
    n.sibling = null;
  }
  return t.child;
}
function oS(e, t, n) {
  switch (t.tag) {
    case 3:
      (ov(t), Co());
      break;
    case 5:
      Ax(t);
      break;
    case 1:
      Ct(t.type) && yl(t);
      break;
    case 4:
      Hf(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      (be(wl, r._currentValue), (r._currentValue = i));
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (be(Re, Re.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? sv(e, t, n)
            : (be(Re, Re.current & 1),
              (e = Kn(e, t, n)),
              e !== null ? e.sibling : null);
      be(Re, Re.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return av(e, t, n);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null &&
          ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        be(Re, Re.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), rv(e, t, n));
  }
  return Kn(e, t, n);
}
var lv, gd, uv, cv;
lv = function (e, t) {
  for (var n = t.child; n !== null;) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      ((n.child.return = n), (n = n.child));
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null;) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    ((n.sibling.return = n.return), (n = n.sibling));
  }
};
gd = function () {};
uv = function (e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    ((e = t.stateNode), ri(_n.current));
    var o = null;
    switch (n) {
      case "input":
        ((i = zc(e, i)), (r = zc(e, r)), (o = []));
        break;
      case "select":
        ((i = Ae({}, i, { value: void 0 })),
          (r = Ae({}, r, { value: void 0 })),
          (o = []));
        break;
      case "textarea":
        ((i = $c(e, i)), (r = $c(e, r)), (o = []));
        break;
      default:
        typeof i.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = ml);
    }
    Wc(n, r);
    var s;
    n = null;
    for (c in i)
      if (!r.hasOwnProperty(c) && i.hasOwnProperty(c) && i[c] != null)
        if (c === "style") {
          var a = i[c];
          for (s in a) a.hasOwnProperty(s) && (n || (n = {}), (n[s] = ""));
        } else
          c !== "dangerouslySetInnerHTML" &&
            c !== "children" &&
            c !== "suppressContentEditableWarning" &&
            c !== "suppressHydrationWarning" &&
            c !== "autoFocus" &&
            (Cs.hasOwnProperty(c)
              ? o || (o = [])
              : (o = o || []).push(c, null));
    for (c in r) {
      var u = r[c];
      if (
        ((a = i != null ? i[c] : void 0),
        r.hasOwnProperty(c) && u !== a && (u != null || a != null))
      )
        if (c === "style")
          if (a) {
            for (s in a)
              !a.hasOwnProperty(s) ||
                (u && u.hasOwnProperty(s)) ||
                (n || (n = {}), (n[s] = ""));
            for (s in u)
              u.hasOwnProperty(s) &&
                a[s] !== u[s] &&
                (n || (n = {}), (n[s] = u[s]));
          } else (n || (o || (o = []), o.push(c, n)), (n = u));
        else
          c === "dangerouslySetInnerHTML"
            ? ((u = u ? u.__html : void 0),
              (a = a ? a.__html : void 0),
              u != null && a !== u && (o = o || []).push(c, u))
            : c === "children"
              ? (typeof u != "string" && typeof u != "number") ||
                (o = o || []).push(c, "" + u)
              : c !== "suppressContentEditableWarning" &&
                c !== "suppressHydrationWarning" &&
                (Cs.hasOwnProperty(c)
                  ? (u != null && c === "onScroll" && Ne("scroll", e),
                    o || a === u || (o = []))
                  : (o = o || []).push(c, u));
    }
    n && (o = o || []).push("style", n);
    var c = o;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
cv = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Xo(e, t) {
  if (!Pe)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null;)
          (t.alternate !== null && (n = t), (t = t.sibling));
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null;)
          (n.alternate !== null && (r = n), (n = n.sibling));
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function it(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; i !== null;)
      ((n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags & 14680064),
        (r |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling));
  else
    for (i = e.child; i !== null;)
      ((n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling));
  return ((e.subtreeFlags |= r), (e.childLanes = n), t);
}
function sS(e, t, n) {
  var r = t.pendingProps;
  switch ((zf(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (it(t), null);
    case 1:
      return (Ct(t.type) && gl(), it(t), null);
    case 3:
      return (
        (r = t.stateNode),
        Eo(),
        Ee(St),
        Ee(at),
        Qf(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Na(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), an !== null && (Cd(an), (an = null)))),
        gd(e, t),
        it(t),
        null
      );
    case 5:
      qf(t);
      var i = ri(Ds.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        (uv(e, t, n, r, i),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(L(166));
          return (it(t), null);
        }
        if (((e = ri(_n.current)), Na(t))) {
          ((r = t.stateNode), (n = t.type));
          var o = t.memoizedProps;
          switch (((r[Cn] = t), (r[Is] = o), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              (Ne("cancel", r), Ne("close", r));
              break;
            case "iframe":
            case "object":
            case "embed":
              Ne("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < as.length; i++) Ne(as[i], r);
              break;
            case "source":
              Ne("error", r);
              break;
            case "img":
            case "image":
            case "link":
              (Ne("error", r), Ne("load", r));
              break;
            case "details":
              Ne("toggle", r);
              break;
            case "input":
              (fh(r, o), Ne("invalid", r));
              break;
            case "select":
              ((r._wrapperState = { wasMultiple: !!o.multiple }),
                Ne("invalid", r));
              break;
            case "textarea":
              (hh(r, o), Ne("invalid", r));
          }
          (Wc(n, o), (i = null));
          for (var s in o)
            if (o.hasOwnProperty(s)) {
              var a = o[s];
              s === "children"
                ? typeof a == "string"
                  ? r.textContent !== a &&
                    (o.suppressHydrationWarning !== !0 &&
                      Ca(r.textContent, a, e),
                    (i = ["children", a]))
                  : typeof a == "number" &&
                    r.textContent !== "" + a &&
                    (o.suppressHydrationWarning !== !0 &&
                      Ca(r.textContent, a, e),
                    (i = ["children", "" + a]))
                : Cs.hasOwnProperty(s) &&
                  a != null &&
                  s === "onScroll" &&
                  Ne("scroll", r);
            }
          switch (n) {
            case "input":
              (ga(r), ph(r, o, !0));
              break;
            case "textarea":
              (ga(r), mh(r));
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = ml);
          }
          ((r = i), (t.updateQueue = r), r !== null && (t.flags |= 4));
        } else {
          ((s = i.nodeType === 9 ? i : i.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = zy(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = s.createElement("div")),
                  (e.innerHTML = "<script><\/script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                  ? (e = s.createElement(n, { is: r.is }))
                  : ((e = s.createElement(n)),
                    n === "select" &&
                      ((s = e),
                      r.multiple
                        ? (s.multiple = !0)
                        : r.size && (s.size = r.size)))
              : (e = s.createElementNS(e, n)),
            (e[Cn] = t),
            (e[Is] = r),
            lv(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((s = Vc(n, r)), n)) {
              case "dialog":
                (Ne("cancel", e), Ne("close", e), (i = r));
                break;
              case "iframe":
              case "object":
              case "embed":
                (Ne("load", e), (i = r));
                break;
              case "video":
              case "audio":
                for (i = 0; i < as.length; i++) Ne(as[i], e);
                i = r;
                break;
              case "source":
                (Ne("error", e), (i = r));
                break;
              case "img":
              case "image":
              case "link":
                (Ne("error", e), Ne("load", e), (i = r));
                break;
              case "details":
                (Ne("toggle", e), (i = r));
                break;
              case "input":
                (fh(e, r), (i = zc(e, r)), Ne("invalid", e));
                break;
              case "option":
                i = r;
                break;
              case "select":
                ((e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = Ae({}, r, { value: void 0 })),
                  Ne("invalid", e));
                break;
              case "textarea":
                (hh(e, r), (i = $c(e, r)), Ne("invalid", e));
                break;
              default:
                i = r;
            }
            (Wc(n, i), (a = i));
            for (o in a)
              if (a.hasOwnProperty(o)) {
                var u = a[o];
                o === "style"
                  ? $y(e, u)
                  : o === "dangerouslySetInnerHTML"
                    ? ((u = u ? u.__html : void 0), u != null && Fy(e, u))
                    : o === "children"
                      ? typeof u == "string"
                        ? (n !== "textarea" || u !== "") && Ns(e, u)
                        : typeof u == "number" && Ns(e, "" + u)
                      : o !== "suppressContentEditableWarning" &&
                        o !== "suppressHydrationWarning" &&
                        o !== "autoFocus" &&
                        (Cs.hasOwnProperty(o)
                          ? u != null && o === "onScroll" && Ne("scroll", e)
                          : u != null && Sf(e, o, u, s));
              }
            switch (n) {
              case "input":
                (ga(e), ph(e, r, !1));
                break;
              case "textarea":
                (ga(e), mh(e));
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Ir(r.value));
                break;
              case "select":
                ((e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? Yi(e, !!r.multiple, o, !1)
                    : r.defaultValue != null &&
                      Yi(e, !!r.multiple, r.defaultValue, !0));
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = ml);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return (it(t), null);
    case 6:
      if (e && t.stateNode != null) cv(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(L(166));
        if (((n = ri(Ds.current)), ri(_n.current), Na(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Cn] = t),
            (o = r.nodeValue !== n) && ((e = Dt), e !== null))
          )
            switch (e.tag) {
              case 3:
                Ca(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Ca(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Cn] = t),
            (t.stateNode = r));
      }
      return (it(t), null);
    case 13:
      if (
        (Ee(Re),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (Pe && At !== null && t.mode & 1 && !(t.flags & 128))
          (Px(), Co(), (t.flags |= 98560), (o = !1));
        else if (((o = Na(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(L(318));
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(L(317));
            o[Cn] = t;
          } else
            (Co(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (it(t), (o = !1));
        } else (an !== null && (Cd(an), (an = null)), (o = !0));
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || Re.current & 1 ? Ve === 0 && (Ve = 3) : op())),
          t.updateQueue !== null && (t.flags |= 4),
          it(t),
          null);
    case 4:
      return (
        Eo(),
        gd(e, t),
        e === null && Ts(t.stateNode.containerInfo),
        it(t),
        null
      );
    case 10:
      return (Uf(t.type._context), it(t), null);
    case 17:
      return (Ct(t.type) && gl(), it(t), null);
    case 19:
      if ((Ee(Re), (o = t.memoizedState), o === null)) return (it(t), null);
      if (((r = (t.flags & 128) !== 0), (s = o.rendering), s === null))
        if (r) Xo(o, !1);
        else {
          if (Ve !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null;) {
              if (((s = Sl(e)), s !== null)) {
                for (
                  t.flags |= 128,
                    Xo(o, !1),
                    r = s.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;
                )
                  ((o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (s = o.alternate),
                    s === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = s.childLanes),
                        (o.lanes = s.lanes),
                        (o.child = s.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = s.memoizedProps),
                        (o.memoizedState = s.memoizedState),
                        (o.updateQueue = s.updateQueue),
                        (o.type = s.type),
                        (e = s.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling));
                return (be(Re, (Re.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          o.tail !== null &&
            Le() > Po &&
            ((t.flags |= 128), (r = !0), Xo(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Sl(s)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Xo(o, !0),
              o.tail === null && o.tailMode === "hidden" && !s.alternate && !Pe)
            )
              return (it(t), null);
          } else
            2 * Le() - o.renderingStartTime > Po &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Xo(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((s.sibling = t.child), (t.child = s))
          : ((n = o.last),
            n !== null ? (n.sibling = s) : (t.child = s),
            (o.last = s));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = Le()),
          (t.sibling = null),
          (n = Re.current),
          be(Re, r ? (n & 1) | 2 : n & 1),
          t)
        : (it(t), null);
    case 22:
    case 23:
      return (
        ip(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Tt & 1073741824 && (it(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : it(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(L(156, t.tag));
}
function aS(e, t) {
  switch ((zf(t), t.tag)) {
    case 1:
      return (
        Ct(t.type) && gl(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Eo(),
        Ee(St),
        Ee(at),
        Qf(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return (qf(t), null);
    case 13:
      if (
        (Ee(Re), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(L(340));
        Co();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return (Ee(Re), null);
    case 4:
      return (Eo(), null);
    case 10:
      return (Uf(t.type._context), null);
    case 22:
    case 23:
      return (ip(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var Pa = !1,
  st = !1,
  lS = typeof WeakSet == "function" ? WeakSet : Set,
  H = null;
function Ki(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        De(e, t, r);
      }
    else n.current = null;
}
function yd(e, t, n) {
  try {
    n();
  } catch (r) {
    De(e, t, r);
  }
}
var im = !1;
function uS(e, t) {
  if (((ed = fl), (e = mx()), Df(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            (n.nodeType, o.nodeType);
          } catch {
            n = null;
            break e;
          }
          var s = 0,
            a = -1,
            u = -1,
            c = 0,
            d = 0,
            f = e,
            h = null;
          t: for (;;) {
            for (
              var p;
              f !== n || (i !== 0 && f.nodeType !== 3) || (a = s + i),
                f !== o || (r !== 0 && f.nodeType !== 3) || (u = s + r),
                f.nodeType === 3 && (s += f.nodeValue.length),
                (p = f.firstChild) !== null;
            )
              ((h = f), (f = p));
            for (;;) {
              if (f === e) break t;
              if (
                (h === n && ++c === i && (a = s),
                h === o && ++d === r && (u = s),
                (p = f.nextSibling) !== null)
              )
                break;
              ((f = h), (h = f.parentNode));
            }
            f = p;
          }
          n = a === -1 || u === -1 ? null : { start: a, end: u };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (td = { focusedElem: e, selectionRange: n }, fl = !1, H = t; H !== null;)
    if (((t = H), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (H = e));
    else
      for (; H !== null;) {
        t = H;
        try {
          var v = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (v !== null) {
                  var g = v.memoizedProps,
                    b = v.memoizedState,
                    m = t.stateNode,
                    x = m.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? g : rn(t.type, g),
                      b,
                    );
                  m.__reactInternalSnapshotBeforeUpdate = x;
                }
                break;
              case 3:
                var y = t.stateNode.containerInfo;
                y.nodeType === 1
                  ? (y.textContent = "")
                  : y.nodeType === 9 &&
                    y.documentElement &&
                    y.removeChild(y.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(L(163));
            }
        } catch (k) {
          De(t, t.return, k);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (H = e));
          break;
        }
        H = t.return;
      }
  return ((v = im), (im = !1), v);
}
function gs(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var o = i.destroy;
        ((i.destroy = void 0), o !== void 0 && yd(t, n, o));
      }
      i = i.next;
    } while (i !== r);
  }
}
function nu(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function xd(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function dv(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), dv(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Cn], delete t[Is], delete t[id], delete t[Hk], delete t[qk])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function fv(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function om(e) {
  e: for (;;) {
    for (; e.sibling === null;) {
      if (e.return === null || fv(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function vd(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = ml)));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (vd(e, t, n), e = e.sibling; e !== null;)
      (vd(e, t, n), (e = e.sibling));
}
function wd(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (wd(e, t, n), e = e.sibling; e !== null;)
      (wd(e, t, n), (e = e.sibling));
}
var Xe = null,
  sn = !1;
function ir(e, t, n) {
  for (n = n.child; n !== null;) (pv(e, t, n), (n = n.sibling));
}
function pv(e, t, n) {
  if (Pn && typeof Pn.onCommitFiberUnmount == "function")
    try {
      Pn.onCommitFiberUnmount(Kl, n);
    } catch {}
  switch (n.tag) {
    case 5:
      st || Ki(n, t);
    case 6:
      var r = Xe,
        i = sn;
      ((Xe = null),
        ir(e, t, n),
        (Xe = r),
        (sn = i),
        Xe !== null &&
          (sn
            ? ((e = Xe),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : Xe.removeChild(n.stateNode)));
      break;
    case 18:
      Xe !== null &&
        (sn
          ? ((e = Xe),
            (n = n.stateNode),
            e.nodeType === 8
              ? Ku(e.parentNode, n)
              : e.nodeType === 1 && Ku(e, n),
            _s(e))
          : Ku(Xe, n.stateNode));
      break;
    case 4:
      ((r = Xe),
        (i = sn),
        (Xe = n.stateNode.containerInfo),
        (sn = !0),
        ir(e, t, n),
        (Xe = r),
        (sn = i));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !st &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        i = r = r.next;
        do {
          var o = i,
            s = o.destroy;
          ((o = o.tag),
            s !== void 0 && (o & 2 || o & 4) && yd(n, t, s),
            (i = i.next));
        } while (i !== r);
      }
      ir(e, t, n);
      break;
    case 1:
      if (
        !st &&
        (Ki(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          ((r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount());
        } catch (a) {
          De(n, t, a);
        }
      ir(e, t, n);
      break;
    case 21:
      ir(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((st = (r = st) || n.memoizedState !== null), ir(e, t, n), (st = r))
        : ir(e, t, n);
      break;
    default:
      ir(e, t, n);
  }
}
function sm(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    (n === null && (n = e.stateNode = new lS()),
      t.forEach(function (r) {
        var i = xS.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      }));
  }
}
function tn(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var o = e,
          s = t,
          a = s;
        e: for (; a !== null;) {
          switch (a.tag) {
            case 5:
              ((Xe = a.stateNode), (sn = !1));
              break e;
            case 3:
              ((Xe = a.stateNode.containerInfo), (sn = !0));
              break e;
            case 4:
              ((Xe = a.stateNode.containerInfo), (sn = !0));
              break e;
          }
          a = a.return;
        }
        if (Xe === null) throw Error(L(160));
        (pv(o, s, i), (Xe = null), (sn = !1));
        var u = i.alternate;
        (u !== null && (u.return = null), (i.return = null));
      } catch (c) {
        De(i, t, c);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null;) (hv(t, e), (t = t.sibling));
}
function hv(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((tn(t, e), yn(e), r & 4)) {
        try {
          (gs(3, e, e.return), nu(3, e));
        } catch (g) {
          De(e, e.return, g);
        }
        try {
          gs(5, e, e.return);
        } catch (g) {
          De(e, e.return, g);
        }
      }
      break;
    case 1:
      (tn(t, e), yn(e), r & 512 && n !== null && Ki(n, n.return));
      break;
    case 5:
      if (
        (tn(t, e),
        yn(e),
        r & 512 && n !== null && Ki(n, n.return),
        e.flags & 32)
      ) {
        var i = e.stateNode;
        try {
          Ns(i, "");
        } catch (g) {
          De(e, e.return, g);
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var o = e.memoizedProps,
          s = n !== null ? n.memoizedProps : o,
          a = e.type,
          u = e.updateQueue;
        if (((e.updateQueue = null), u !== null))
          try {
            (a === "input" && o.type === "radio" && o.name != null && Dy(i, o),
              Vc(a, s));
            var c = Vc(a, o);
            for (s = 0; s < u.length; s += 2) {
              var d = u[s],
                f = u[s + 1];
              d === "style"
                ? $y(i, f)
                : d === "dangerouslySetInnerHTML"
                  ? Fy(i, f)
                  : d === "children"
                    ? Ns(i, f)
                    : Sf(i, d, f, c);
            }
            switch (a) {
              case "input":
                Fc(i, o);
                break;
              case "textarea":
                Ly(i, o);
                break;
              case "select":
                var h = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var p = o.value;
                p != null
                  ? Yi(i, !!o.multiple, p, !1)
                  : h !== !!o.multiple &&
                    (o.defaultValue != null
                      ? Yi(i, !!o.multiple, o.defaultValue, !0)
                      : Yi(i, !!o.multiple, o.multiple ? [] : "", !1));
            }
            i[Is] = o;
          } catch (g) {
            De(e, e.return, g);
          }
      }
      break;
    case 6:
      if ((tn(t, e), yn(e), r & 4)) {
        if (e.stateNode === null) throw Error(L(162));
        ((i = e.stateNode), (o = e.memoizedProps));
        try {
          i.nodeValue = o;
        } catch (g) {
          De(e, e.return, g);
        }
      }
      break;
    case 3:
      if (
        (tn(t, e), yn(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          _s(t.containerInfo);
        } catch (g) {
          De(e, e.return, g);
        }
      break;
    case 4:
      (tn(t, e), yn(e));
      break;
    case 13:
      (tn(t, e),
        yn(e),
        (i = e.child),
        i.flags & 8192 &&
          ((o = i.memoizedState !== null),
          (i.stateNode.isHidden = o),
          !o ||
            (i.alternate !== null && i.alternate.memoizedState !== null) ||
            (np = Le())),
        r & 4 && sm(e));
      break;
    case 22:
      if (
        ((d = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((st = (c = st) || d), tn(t, e), (st = c)) : tn(t, e),
        yn(e),
        r & 8192)
      ) {
        if (
          ((c = e.memoizedState !== null),
          (e.stateNode.isHidden = c) && !d && e.mode & 1)
        )
          for (H = e, d = e.child; d !== null;) {
            for (f = H = d; H !== null;) {
              switch (((h = H), (p = h.child), h.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  gs(4, h, h.return);
                  break;
                case 1:
                  Ki(h, h.return);
                  var v = h.stateNode;
                  if (typeof v.componentWillUnmount == "function") {
                    ((r = h), (n = h.return));
                    try {
                      ((t = r),
                        (v.props = t.memoizedProps),
                        (v.state = t.memoizedState),
                        v.componentWillUnmount());
                    } catch (g) {
                      De(r, n, g);
                    }
                  }
                  break;
                case 5:
                  Ki(h, h.return);
                  break;
                case 22:
                  if (h.memoizedState !== null) {
                    lm(f);
                    continue;
                  }
              }
              p !== null ? ((p.return = h), (H = p)) : lm(f);
            }
            d = d.sibling;
          }
        e: for (d = null, f = e; ;) {
          if (f.tag === 5) {
            if (d === null) {
              d = f;
              try {
                ((i = f.stateNode),
                  c
                    ? ((o = i.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((a = f.stateNode),
                      (u = f.memoizedProps.style),
                      (s =
                        u != null && u.hasOwnProperty("display")
                          ? u.display
                          : null),
                      (a.style.display = By("display", s))));
              } catch (g) {
                De(e, e.return, g);
              }
            }
          } else if (f.tag === 6) {
            if (d === null)
              try {
                f.stateNode.nodeValue = c ? "" : f.memoizedProps;
              } catch (g) {
                De(e, e.return, g);
              }
          } else if (
            ((f.tag !== 22 && f.tag !== 23) ||
              f.memoizedState === null ||
              f === e) &&
            f.child !== null
          ) {
            ((f.child.return = f), (f = f.child));
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null;) {
            if (f.return === null || f.return === e) break e;
            (d === f && (d = null), (f = f.return));
          }
          (d === f && (d = null),
            (f.sibling.return = f.return),
            (f = f.sibling));
        }
      }
      break;
    case 19:
      (tn(t, e), yn(e), r & 4 && sm(e));
      break;
    case 21:
      break;
    default:
      (tn(t, e), yn(e));
  }
}
function yn(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null;) {
          if (fv(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(L(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (Ns(i, ""), (r.flags &= -33));
          var o = om(e);
          wd(e, o, i);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo,
            a = om(e);
          vd(e, a, s);
          break;
        default:
          throw Error(L(161));
      }
    } catch (u) {
      De(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function cS(e, t, n) {
  ((H = e), mv(e));
}
function mv(e, t, n) {
  for (var r = (e.mode & 1) !== 0; H !== null;) {
    var i = H,
      o = i.child;
    if (i.tag === 22 && r) {
      var s = i.memoizedState !== null || Pa;
      if (!s) {
        var a = i.alternate,
          u = (a !== null && a.memoizedState !== null) || st;
        a = Pa;
        var c = st;
        if (((Pa = s), (st = u) && !c))
          for (H = i; H !== null;)
            ((s = H),
              (u = s.child),
              s.tag === 22 && s.memoizedState !== null
                ? um(i)
                : u !== null
                  ? ((u.return = s), (H = u))
                  : um(i));
        for (; o !== null;) ((H = o), mv(o), (o = o.sibling));
        ((H = i), (Pa = a), (st = c));
      }
      am(e);
    } else
      i.subtreeFlags & 8772 && o !== null ? ((o.return = i), (H = o)) : am(e);
  }
}
function am(e) {
  for (; H !== null;) {
    var t = H;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              st || nu(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !st)
                if (n === null) r.componentDidMount();
                else {
                  var i =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : rn(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    i,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var o = t.updateQueue;
              o !== null && Hh(t, o, r);
              break;
            case 3:
              var s = t.updateQueue;
              if (s !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Hh(t, s, n);
              }
              break;
            case 5:
              var a = t.stateNode;
              if (n === null && t.flags & 4) {
                n = a;
                var u = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    u.autoFocus && n.focus();
                    break;
                  case "img":
                    u.src && (n.src = u.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var c = t.alternate;
                if (c !== null) {
                  var d = c.memoizedState;
                  if (d !== null) {
                    var f = d.dehydrated;
                    f !== null && _s(f);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(L(163));
          }
        st || (t.flags & 512 && xd(t));
      } catch (h) {
        De(t, t.return, h);
      }
    }
    if (t === e) {
      H = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      ((n.return = t.return), (H = n));
      break;
    }
    H = t.return;
  }
}
function lm(e) {
  for (; H !== null;) {
    var t = H;
    if (t === e) {
      H = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      ((n.return = t.return), (H = n));
      break;
    }
    H = t.return;
  }
}
function um(e) {
  for (; H !== null;) {
    var t = H;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            nu(4, t);
          } catch (u) {
            De(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              De(t, i, u);
            }
          }
          var o = t.return;
          try {
            xd(t);
          } catch (u) {
            De(t, o, u);
          }
          break;
        case 5:
          var s = t.return;
          try {
            xd(t);
          } catch (u) {
            De(t, s, u);
          }
      }
    } catch (u) {
      De(t, t.return, u);
    }
    if (t === e) {
      H = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      ((a.return = t.return), (H = a));
      break;
    }
    H = t.return;
  }
}
var dS = Math.ceil,
  El = Yn.ReactCurrentDispatcher,
  ep = Yn.ReactCurrentOwner,
  Gt = Yn.ReactCurrentBatchConfig,
  me = 0,
  Ke = null,
  Be = null,
  Je = 0,
  Tt = 0,
  Gi = Br(0),
  Ve = 0,
  Bs = null,
  yi = 0,
  ru = 0,
  tp = 0,
  ys = null,
  wt = null,
  np = 0,
  Po = 1 / 0,
  zn = null,
  jl = !1,
  bd = null,
  Rr = null,
  _a = !1,
  kr = null,
  Pl = 0,
  xs = 0,
  kd = null,
  Ja = -1,
  el = 0;
function pt() {
  return me & 6 ? Le() : Ja !== -1 ? Ja : (Ja = Le());
}
function Mr(e) {
  return e.mode & 1
    ? me & 2 && Je !== 0
      ? Je & -Je
      : Kk.transition !== null
        ? (el === 0 && (el = Jy()), el)
        : ((e = ve),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : sx(e.type))),
          e)
    : 1;
}
function cn(e, t, n, r) {
  if (50 < xs) throw ((xs = 0), (kd = null), Error(L(185)));
  (na(e, n, r),
    (!(me & 2) || e !== Ke) &&
      (e === Ke && (!(me & 2) && (ru |= n), Ve === 4 && pr(e, Je)),
      Nt(e, r),
      n === 1 && me === 0 && !(t.mode & 1) && ((Po = Le() + 500), Jl && $r())));
}
function Nt(e, t) {
  var n = e.callbackNode;
  Kb(e, t);
  var r = dl(e, e === Ke ? Je : 0);
  if (r === 0)
    (n !== null && xh(n), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && xh(n), t === 1))
      (e.tag === 0 ? Qk(cm.bind(null, e)) : Nx(cm.bind(null, e)),
        Wk(function () {
          !(me & 6) && $r();
        }),
        (n = null));
    else {
      switch (ex(r)) {
        case 1:
          n = Pf;
          break;
        case 4:
          n = Xy;
          break;
        case 16:
          n = cl;
          break;
        case 536870912:
          n = Zy;
          break;
        default:
          n = cl;
      }
      n = Sv(n, gv.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = n));
  }
}
function gv(e, t) {
  if (((Ja = -1), (el = 0), me & 6)) throw Error(L(327));
  var n = e.callbackNode;
  if (to() && e.callbackNode !== n) return null;
  var r = dl(e, e === Ke ? Je : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = _l(e, r);
  else {
    t = r;
    var i = me;
    me |= 2;
    var o = xv();
    (Ke !== e || Je !== t) && ((zn = null), (Po = Le() + 500), di(e, t));
    do
      try {
        hS();
        break;
      } catch (a) {
        yv(e, a);
      }
    while (!0);
    ($f(),
      (El.current = o),
      (me = i),
      Be !== null ? (t = 0) : ((Ke = null), (Je = 0), (t = Ve)));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((i = Gc(e)), i !== 0 && ((r = i), (t = Sd(e, i)))), t === 1)
    )
      throw ((n = Bs), di(e, 0), pr(e, r), Nt(e, Le()), n);
    if (t === 6) pr(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !fS(i) &&
          ((t = _l(e, r)),
          t === 2 && ((o = Gc(e)), o !== 0 && ((r = o), (t = Sd(e, o)))),
          t === 1))
      )
        throw ((n = Bs), di(e, 0), pr(e, r), Nt(e, Le()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(L(345));
        case 2:
          Jr(e, wt, zn);
          break;
        case 3:
          if (
            (pr(e, r), (r & 130023424) === r && ((t = np + 500 - Le()), 10 < t))
          ) {
            if (dl(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              (pt(), (e.pingedLanes |= e.suspendedLanes & i));
              break;
            }
            e.timeoutHandle = rd(Jr.bind(null, e, wt, zn), t);
            break;
          }
          Jr(e, wt, zn);
          break;
        case 4:
          if ((pr(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r;) {
            var s = 31 - un(r);
            ((o = 1 << s), (s = t[s]), s > i && (i = s), (r &= ~o));
          }
          if (
            ((r = i),
            (r = Le() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * dS(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = rd(Jr.bind(null, e, wt, zn), r);
            break;
          }
          Jr(e, wt, zn);
          break;
        case 5:
          Jr(e, wt, zn);
          break;
        default:
          throw Error(L(329));
      }
    }
  }
  return (Nt(e, Le()), e.callbackNode === n ? gv.bind(null, e) : null);
}
function Sd(e, t) {
  var n = ys;
  return (
    e.current.memoizedState.isDehydrated && (di(e, t).flags |= 256),
    (e = _l(e, t)),
    e !== 2 && ((t = wt), (wt = n), t !== null && Cd(t)),
    e
  );
}
function Cd(e) {
  wt === null ? (wt = e) : wt.push.apply(wt, e);
}
function fS(e) {
  for (var t = e; ;) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            o = i.getSnapshot;
          i = i.value;
          try {
            if (!dn(o(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      ((n.return = t), (t = n));
    else {
      if (t === e) break;
      for (; t.sibling === null;) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function pr(e, t) {
  for (
    t &= ~tp,
      t &= ~ru,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;
  ) {
    var n = 31 - un(t),
      r = 1 << n;
    ((e[n] = -1), (t &= ~r));
  }
}
function cm(e) {
  if (me & 6) throw Error(L(327));
  to();
  var t = dl(e, 0);
  if (!(t & 1)) return (Nt(e, Le()), null);
  var n = _l(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Gc(e);
    r !== 0 && ((t = r), (n = Sd(e, r)));
  }
  if (n === 1) throw ((n = Bs), di(e, 0), pr(e, t), Nt(e, Le()), n);
  if (n === 6) throw Error(L(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Jr(e, wt, zn),
    Nt(e, Le()),
    null
  );
}
function rp(e, t) {
  var n = me;
  me |= 1;
  try {
    return e(t);
  } finally {
    ((me = n), me === 0 && ((Po = Le() + 500), Jl && $r()));
  }
}
function xi(e) {
  kr !== null && kr.tag === 0 && !(me & 6) && to();
  var t = me;
  me |= 1;
  var n = Gt.transition,
    r = ve;
  try {
    if (((Gt.transition = null), (ve = 1), e)) return e();
  } finally {
    ((ve = r), (Gt.transition = n), (me = t), !(me & 6) && $r());
  }
}
function ip() {
  ((Tt = Gi.current), Ee(Gi));
}
function di(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), Uk(n)), Be !== null))
    for (n = Be.return; n !== null;) {
      var r = n;
      switch ((zf(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r != null && gl());
          break;
        case 3:
          (Eo(), Ee(St), Ee(at), Qf());
          break;
        case 5:
          qf(r);
          break;
        case 4:
          Eo();
          break;
        case 13:
          Ee(Re);
          break;
        case 19:
          Ee(Re);
          break;
        case 10:
          Uf(r.type._context);
          break;
        case 22:
        case 23:
          ip();
      }
      n = n.return;
    }
  if (
    ((Ke = e),
    (Be = e = Tr(e.current, null)),
    (Je = Tt = t),
    (Ve = 0),
    (Bs = null),
    (tp = ru = yi = 0),
    (wt = ys = null),
    ni !== null)
  ) {
    for (t = 0; t < ni.length; t++)
      if (((n = ni[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var i = r.next,
          o = n.pending;
        if (o !== null) {
          var s = o.next;
          ((o.next = i), (r.next = s));
        }
        n.pending = r;
      }
    ni = null;
  }
  return e;
}
function yv(e, t) {
  do {
    var n = Be;
    try {
      if (($f(), (Ya.current = Nl), Cl)) {
        for (var r = Me.memoizedState; r !== null;) {
          var i = r.queue;
          (i !== null && (i.pending = null), (r = r.next));
        }
        Cl = !1;
      }
      if (
        ((gi = 0),
        (Qe = Ue = Me = null),
        (ms = !1),
        (Ls = 0),
        (ep.current = null),
        n === null || n.return === null)
      ) {
        ((Ve = 1), (Bs = t), (Be = null));
        break;
      }
      e: {
        var o = e,
          s = n.return,
          a = n,
          u = t;
        if (
          ((t = Je),
          (a.flags |= 32768),
          u !== null && typeof u == "object" && typeof u.then == "function")
        ) {
          var c = u,
            d = a,
            f = d.tag;
          if (!(d.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var h = d.alternate;
            h
              ? ((d.updateQueue = h.updateQueue),
                (d.memoizedState = h.memoizedState),
                (d.lanes = h.lanes))
              : ((d.updateQueue = null), (d.memoizedState = null));
          }
          var p = Xh(s);
          if (p !== null) {
            ((p.flags &= -257),
              Zh(p, s, a, o, t),
              p.mode & 1 && Yh(o, c, t),
              (t = p),
              (u = c));
            var v = t.updateQueue;
            if (v === null) {
              var g = new Set();
              (g.add(u), (t.updateQueue = g));
            } else v.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              (Yh(o, c, t), op());
              break e;
            }
            u = Error(L(426));
          }
        } else if (Pe && a.mode & 1) {
          var b = Xh(s);
          if (b !== null) {
            (!(b.flags & 65536) && (b.flags |= 256),
              Zh(b, s, a, o, t),
              Ff(jo(u, a)));
            break e;
          }
        }
        ((o = u = jo(u, a)),
          Ve !== 4 && (Ve = 2),
          ys === null ? (ys = [o]) : ys.push(o),
          (o = s));
        do {
          switch (o.tag) {
            case 3:
              ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
              var m = ev(o, u, t);
              Vh(o, m);
              break e;
            case 1:
              a = u;
              var x = o.type,
                y = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof x.getDerivedStateFromError == "function" ||
                  (y !== null &&
                    typeof y.componentDidCatch == "function" &&
                    (Rr === null || !Rr.has(y))))
              ) {
                ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                var k = tv(o, a, t);
                Vh(o, k);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      wv(n);
    } catch (N) {
      ((t = N), Be === n && n !== null && (Be = n = n.return));
      continue;
    }
    break;
  } while (!0);
}
function xv() {
  var e = El.current;
  return ((El.current = Nl), e === null ? Nl : e);
}
function op() {
  ((Ve === 0 || Ve === 3 || Ve === 2) && (Ve = 4),
    Ke === null || (!(yi & 268435455) && !(ru & 268435455)) || pr(Ke, Je));
}
function _l(e, t) {
  var n = me;
  me |= 2;
  var r = xv();
  (Ke !== e || Je !== t) && ((zn = null), di(e, t));
  do
    try {
      pS();
      break;
    } catch (i) {
      yv(e, i);
    }
  while (!0);
  if (($f(), (me = n), (El.current = r), Be !== null)) throw Error(L(261));
  return ((Ke = null), (Je = 0), Ve);
}
function pS() {
  for (; Be !== null;) vv(Be);
}
function hS() {
  for (; Be !== null && !Fb();) vv(Be);
}
function vv(e) {
  var t = kv(e.alternate, e, Tt);
  ((e.memoizedProps = e.pendingProps),
    t === null ? wv(e) : (Be = t),
    (ep.current = null));
}
function wv(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = aS(n, t)), n !== null)) {
        ((n.flags &= 32767), (Be = n));
        return;
      }
      if (e !== null)
        ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((Ve = 6), (Be = null));
        return;
      }
    } else if (((n = sS(n, t, Tt)), n !== null)) {
      Be = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      Be = t;
      return;
    }
    Be = t = e;
  } while (t !== null);
  Ve === 0 && (Ve = 5);
}
function Jr(e, t, n) {
  var r = ve,
    i = Gt.transition;
  try {
    ((Gt.transition = null), (ve = 1), mS(e, t, n, r));
  } finally {
    ((Gt.transition = i), (ve = r));
  }
  return null;
}
function mS(e, t, n, r) {
  do to();
  while (kr !== null);
  if (me & 6) throw Error(L(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(L(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var o = n.lanes | n.childLanes;
  if (
    (Gb(e, o),
    e === Ke && ((Be = Ke = null), (Je = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      _a ||
      ((_a = !0),
      Sv(cl, function () {
        return (to(), null);
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    ((o = Gt.transition), (Gt.transition = null));
    var s = ve;
    ve = 1;
    var a = me;
    ((me |= 4),
      (ep.current = null),
      uS(e, n),
      hv(n, e),
      Ok(td),
      (fl = !!ed),
      (td = ed = null),
      (e.current = n),
      cS(n),
      Bb(),
      (me = a),
      (ve = s),
      (Gt.transition = o));
  } else e.current = n;
  if (
    (_a && ((_a = !1), (kr = e), (Pl = i)),
    (o = e.pendingLanes),
    o === 0 && (Rr = null),
    Wb(n.stateNode),
    Nt(e, Le()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      ((i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest }));
  if (jl) throw ((jl = !1), (e = bd), (bd = null), e);
  return (
    Pl & 1 && e.tag !== 0 && to(),
    (o = e.pendingLanes),
    o & 1 ? (e === kd ? xs++ : ((xs = 0), (kd = e))) : (xs = 0),
    $r(),
    null
  );
}
function to() {
  if (kr !== null) {
    var e = ex(Pl),
      t = Gt.transition,
      n = ve;
    try {
      if (((Gt.transition = null), (ve = 16 > e ? 16 : e), kr === null))
        var r = !1;
      else {
        if (((e = kr), (kr = null), (Pl = 0), me & 6)) throw Error(L(331));
        var i = me;
        for (me |= 4, H = e.current; H !== null;) {
          var o = H,
            s = o.child;
          if (H.flags & 16) {
            var a = o.deletions;
            if (a !== null) {
              for (var u = 0; u < a.length; u++) {
                var c = a[u];
                for (H = c; H !== null;) {
                  var d = H;
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      gs(8, d, o);
                  }
                  var f = d.child;
                  if (f !== null) ((f.return = d), (H = f));
                  else
                    for (; H !== null;) {
                      d = H;
                      var h = d.sibling,
                        p = d.return;
                      if ((dv(d), d === c)) {
                        H = null;
                        break;
                      }
                      if (h !== null) {
                        ((h.return = p), (H = h));
                        break;
                      }
                      H = p;
                    }
                }
              }
              var v = o.alternate;
              if (v !== null) {
                var g = v.child;
                if (g !== null) {
                  v.child = null;
                  do {
                    var b = g.sibling;
                    ((g.sibling = null), (g = b));
                  } while (g !== null);
                }
              }
              H = o;
            }
          }
          if (o.subtreeFlags & 2064 && s !== null) ((s.return = o), (H = s));
          else
            e: for (; H !== null;) {
              if (((o = H), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    gs(9, o, o.return);
                }
              var m = o.sibling;
              if (m !== null) {
                ((m.return = o.return), (H = m));
                break e;
              }
              H = o.return;
            }
        }
        var x = e.current;
        for (H = x; H !== null;) {
          s = H;
          var y = s.child;
          if (s.subtreeFlags & 2064 && y !== null) ((y.return = s), (H = y));
          else
            e: for (s = x; H !== null;) {
              if (((a = H), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      nu(9, a);
                  }
                } catch (N) {
                  De(a, a.return, N);
                }
              if (a === s) {
                H = null;
                break e;
              }
              var k = a.sibling;
              if (k !== null) {
                ((k.return = a.return), (H = k));
                break e;
              }
              H = a.return;
            }
        }
        if (
          ((me = i), $r(), Pn && typeof Pn.onPostCommitFiberRoot == "function")
        )
          try {
            Pn.onPostCommitFiberRoot(Kl, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ((ve = n), (Gt.transition = t));
    }
  }
  return !1;
}
function dm(e, t, n) {
  ((t = jo(n, t)),
    (t = ev(e, t, 1)),
    (e = _r(e, t, 1)),
    (t = pt()),
    e !== null && (na(e, 1, t), Nt(e, t)));
}
function De(e, t, n) {
  if (e.tag === 3) dm(e, e, n);
  else
    for (; t !== null;) {
      if (t.tag === 3) {
        dm(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (Rr === null || !Rr.has(r)))
        ) {
          ((e = jo(n, e)),
            (e = tv(t, e, 1)),
            (t = _r(t, e, 1)),
            (e = pt()),
            t !== null && (na(t, 1, e), Nt(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function gS(e, t, n) {
  var r = e.pingCache;
  (r !== null && r.delete(t),
    (t = pt()),
    (e.pingedLanes |= e.suspendedLanes & n),
    Ke === e &&
      (Je & n) === n &&
      (Ve === 4 || (Ve === 3 && (Je & 130023424) === Je && 500 > Le() - np)
        ? di(e, 0)
        : (tp |= n)),
    Nt(e, t));
}
function bv(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = va), (va <<= 1), !(va & 130023424) && (va = 4194304))
      : (t = 1));
  var n = pt();
  ((e = Qn(e, t)), e !== null && (na(e, t, n), Nt(e, n)));
}
function yS(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), bv(e, n));
}
function xS(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(L(314));
  }
  (r !== null && r.delete(t), bv(e, n));
}
var kv;
kv = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || St.current) kt = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return ((kt = !1), oS(e, t, n));
      kt = !!(e.flags & 131072);
    }
  else ((kt = !1), Pe && t.flags & 1048576 && Ex(t, vl, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      (Za(e, t), (e = t.pendingProps));
      var i = So(t, at.current);
      (eo(t, n), (i = Gf(null, t, r, e, i, n)));
      var o = Yf();
      return (
        (t.flags |= 1),
        typeof i == "object" &&
        i !== null &&
        typeof i.render == "function" &&
        i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Ct(r) ? ((o = !0), yl(t)) : (o = !1),
            (t.memoizedState =
              i.state !== null && i.state !== void 0 ? i.state : null),
            Vf(t),
            (i.updater = tu),
            (t.stateNode = i),
            (i._reactInternals = t),
            cd(t, r, e, n),
            (t = pd(null, t, r, !0, o, n)))
          : ((t.tag = 0), Pe && o && Lf(t), ft(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Za(e, t),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = wS(r)),
          (e = rn(r, e)),
          i)
        ) {
          case 0:
            t = fd(null, t, r, e, n);
            break e;
          case 1:
            t = tm(null, t, r, e, n);
            break e;
          case 11:
            t = Jh(null, t, r, e, n);
            break e;
          case 14:
            t = em(null, t, r, rn(r.type, e), n);
            break e;
        }
        throw Error(L(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : rn(r, i)),
        fd(e, t, r, i, n)
      );
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : rn(r, i)),
        tm(e, t, r, i, n)
      );
    case 3:
      e: {
        if ((ov(t), e === null)) throw Error(L(387));
        ((r = t.pendingProps),
          (o = t.memoizedState),
          (i = o.element),
          Tx(e, t),
          kl(t, r, null, n));
        var s = t.memoizedState;
        if (((r = s.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: s.cache,
              pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
              transitions: s.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            ((i = jo(Error(L(423)), t)), (t = nm(e, t, r, n, i)));
            break e;
          } else if (r !== i) {
            ((i = jo(Error(L(424)), t)), (t = nm(e, t, r, n, i)));
            break e;
          } else
            for (
              At = Pr(t.stateNode.containerInfo.firstChild),
                Dt = t,
                Pe = !0,
                an = null,
                n = Rx(t, null, r, n),
                t.child = n;
              n;
            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
        else {
          if ((Co(), r === i)) {
            t = Kn(e, t, n);
            break e;
          }
          ft(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Ax(t),
        e === null && ad(t),
        (r = t.type),
        (i = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (s = i.children),
        nd(r, i) ? (s = null) : o !== null && nd(r, o) && (t.flags |= 32),
        iv(e, t),
        ft(e, t, s, n),
        t.child
      );
    case 6:
      return (e === null && ad(t), null);
    case 13:
      return sv(e, t, n);
    case 4:
      return (
        Hf(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = No(t, null, r, n)) : ft(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : rn(r, i)),
        Jh(e, t, r, i, n)
      );
    case 7:
      return (ft(e, t, t.pendingProps, n), t.child);
    case 8:
      return (ft(e, t, t.pendingProps.children, n), t.child);
    case 12:
      return (ft(e, t, t.pendingProps.children, n), t.child);
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (o = t.memoizedProps),
          (s = i.value),
          be(wl, r._currentValue),
          (r._currentValue = s),
          o !== null)
        )
          if (dn(o.value, s)) {
            if (o.children === i.children && !St.current) {
              t = Kn(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null;) {
              var a = o.dependencies;
              if (a !== null) {
                s = o.child;
                for (var u = a.firstContext; u !== null;) {
                  if (u.context === r) {
                    if (o.tag === 1) {
                      ((u = Un(-1, n & -n)), (u.tag = 2));
                      var c = o.updateQueue;
                      if (c !== null) {
                        c = c.shared;
                        var d = c.pending;
                        (d === null
                          ? (u.next = u)
                          : ((u.next = d.next), (d.next = u)),
                          (c.pending = u));
                      }
                    }
                    ((o.lanes |= n),
                      (u = o.alternate),
                      u !== null && (u.lanes |= n),
                      ld(o.return, n, t),
                      (a.lanes |= n));
                    break;
                  }
                  u = u.next;
                }
              } else if (o.tag === 10) s = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((s = o.return), s === null)) throw Error(L(341));
                ((s.lanes |= n),
                  (a = s.alternate),
                  a !== null && (a.lanes |= n),
                  ld(s, n, t),
                  (s = o.sibling));
              } else s = o.child;
              if (s !== null) s.return = o;
              else
                for (s = o; s !== null;) {
                  if (s === t) {
                    s = null;
                    break;
                  }
                  if (((o = s.sibling), o !== null)) {
                    ((o.return = s.return), (s = o));
                    break;
                  }
                  s = s.return;
                }
              o = s;
            }
        (ft(e, t, i.children, n), (t = t.child));
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        eo(t, n),
        (i = Xt(i)),
        (r = r(i)),
        (t.flags |= 1),
        ft(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (i = rn(r, t.pendingProps)),
        (i = rn(r.type, i)),
        em(e, t, r, i, n)
      );
    case 15:
      return nv(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : rn(r, i)),
        Za(e, t),
        (t.tag = 1),
        Ct(r) ? ((e = !0), yl(t)) : (e = !1),
        eo(t, n),
        Jx(t, r, i),
        cd(t, r, i, n),
        pd(null, t, r, !0, e, n)
      );
    case 19:
      return av(e, t, n);
    case 22:
      return rv(e, t, n);
  }
  throw Error(L(156, t.tag));
};
function Sv(e, t) {
  return Yy(e, t);
}
function vS(e, t, n, r) {
  ((this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function Kt(e, t, n, r) {
  return new vS(e, t, n, r);
}
function sp(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function wS(e) {
  if (typeof e == "function") return sp(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Nf)) return 11;
    if (e === Ef) return 14;
  }
  return 2;
}
function Tr(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Kt(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function tl(e, t, n, r, i, o) {
  var s = 2;
  if (((r = e), typeof e == "function")) sp(e) && (s = 1);
  else if (typeof e == "string") s = 5;
  else
    e: switch (e) {
      case Fi:
        return fi(n.children, i, o, t);
      case Cf:
        ((s = 8), (i |= 8));
        break;
      case Ic:
        return (
          (e = Kt(12, n, t, i | 2)),
          (e.elementType = Ic),
          (e.lanes = o),
          e
        );
      case Oc:
        return ((e = Kt(13, n, t, i)), (e.elementType = Oc), (e.lanes = o), e);
      case Dc:
        return ((e = Kt(19, n, t, i)), (e.elementType = Dc), (e.lanes = o), e);
      case Ay:
        return iu(n, i, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case My:
              s = 10;
              break e;
            case Ty:
              s = 9;
              break e;
            case Nf:
              s = 11;
              break e;
            case Ef:
              s = 14;
              break e;
            case cr:
              ((s = 16), (r = null));
              break e;
          }
        throw Error(L(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Kt(s, n, t, i)),
    (t.elementType = e),
    (t.type = r),
    (t.lanes = o),
    t
  );
}
function fi(e, t, n, r) {
  return ((e = Kt(7, e, r, t)), (e.lanes = n), e);
}
function iu(e, t, n, r) {
  return (
    (e = Kt(22, e, r, t)),
    (e.elementType = Ay),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function nc(e, t, n) {
  return ((e = Kt(6, e, null, t)), (e.lanes = n), e);
}
function rc(e, t, n) {
  return (
    (t = Kt(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function bS(e, t, n, r, i) {
  ((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Lu(0)),
    (this.expirationTimes = Lu(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Lu(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null));
}
function ap(e, t, n, r, i, o, s, a, u) {
  return (
    (e = new bS(e, t, n, a, u)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = Kt(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Vf(o),
    e
  );
}
function kS(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: zi,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function Cv(e) {
  if (!e) return Or;
  e = e._reactInternals;
  e: {
    if (Ni(e) !== e || e.tag !== 1) throw Error(L(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Ct(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(L(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Ct(n)) return Cx(e, n, t);
  }
  return t;
}
function Nv(e, t, n, r, i, o, s, a, u) {
  return (
    (e = ap(n, r, !0, e, i, o, s, a, u)),
    (e.context = Cv(null)),
    (n = e.current),
    (r = pt()),
    (i = Mr(n)),
    (o = Un(r, i)),
    (o.callback = t ?? null),
    _r(n, o, i),
    (e.current.lanes = i),
    na(e, i, r),
    Nt(e, r),
    e
  );
}
function ou(e, t, n, r) {
  var i = t.current,
    o = pt(),
    s = Mr(i);
  return (
    (n = Cv(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Un(o, s)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = _r(i, t, s)),
    e !== null && (cn(e, i, s, o), Ga(e, i, s)),
    s
  );
}
function Rl(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function fm(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function lp(e, t) {
  (fm(e, t), (e = e.alternate) && fm(e, t));
}
function SS() {
  return null;
}
var Ev =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function up(e) {
  this._internalRoot = e;
}
su.prototype.render = up.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(L(409));
  ou(e, t, null, null);
};
su.prototype.unmount = up.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (xi(function () {
      ou(null, e, null, null);
    }),
      (t[qn] = null));
  }
};
function su(e) {
  this._internalRoot = e;
}
su.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = rx();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < fr.length && t !== 0 && t < fr[n].priority; n++);
    (fr.splice(n, 0, e), n === 0 && ox(e));
  }
};
function cp(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function au(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function pm() {}
function CS(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var c = Rl(s);
        o.call(c);
      };
    }
    var s = Nv(t, r, e, 0, null, !1, !1, "", pm);
    return (
      (e._reactRootContainer = s),
      (e[qn] = s.current),
      Ts(e.nodeType === 8 ? e.parentNode : e),
      xi(),
      s
    );
  }
  for (; (i = e.lastChild);) e.removeChild(i);
  if (typeof r == "function") {
    var a = r;
    r = function () {
      var c = Rl(u);
      a.call(c);
    };
  }
  var u = ap(e, 0, !1, null, null, !1, !1, "", pm);
  return (
    (e._reactRootContainer = u),
    (e[qn] = u.current),
    Ts(e.nodeType === 8 ? e.parentNode : e),
    xi(function () {
      ou(t, u, n, r);
    }),
    u
  );
}
function lu(e, t, n, r, i) {
  var o = n._reactRootContainer;
  if (o) {
    var s = o;
    if (typeof i == "function") {
      var a = i;
      i = function () {
        var u = Rl(s);
        a.call(u);
      };
    }
    ou(t, s, e, i);
  } else s = CS(n, t, e, i, r);
  return Rl(s);
}
tx = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = ss(t.pendingLanes);
        n !== 0 &&
          (_f(t, n | 1), Nt(t, Le()), !(me & 6) && ((Po = Le() + 500), $r()));
      }
      break;
    case 13:
      (xi(function () {
        var r = Qn(e, 1);
        if (r !== null) {
          var i = pt();
          cn(r, e, 1, i);
        }
      }),
        lp(e, 1));
  }
};
Rf = function (e) {
  if (e.tag === 13) {
    var t = Qn(e, 134217728);
    if (t !== null) {
      var n = pt();
      cn(t, e, 134217728, n);
    }
    lp(e, 134217728);
  }
};
nx = function (e) {
  if (e.tag === 13) {
    var t = Mr(e),
      n = Qn(e, t);
    if (n !== null) {
      var r = pt();
      cn(n, e, t, r);
    }
    lp(e, t);
  }
};
rx = function () {
  return ve;
};
ix = function (e, t) {
  var n = ve;
  try {
    return ((ve = e), t());
  } finally {
    ve = n;
  }
};
qc = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Fc(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode;) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = Zl(r);
            if (!i) throw Error(L(90));
            (Oy(r), Fc(r, i));
          }
        }
      }
      break;
    case "textarea":
      Ly(e, n);
      break;
    case "select":
      ((t = n.value), t != null && Yi(e, !!n.multiple, t, !1));
  }
};
Vy = rp;
Hy = xi;
var NS = { usingClientEntryPoint: !1, Events: [ia, Wi, Zl, Uy, Wy, rp] },
  Zo = {
    findFiberByHostInstance: ti,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  ES = {
    bundleType: Zo.bundleType,
    version: Zo.version,
    rendererPackageName: Zo.rendererPackageName,
    rendererConfig: Zo.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Yn.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = Ky(e)), e === null ? null : e.stateNode);
    },
    findFiberByHostInstance: Zo.findFiberByHostInstance || SS,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Ra = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Ra.isDisabled && Ra.supportsFiber)
    try {
      ((Kl = Ra.inject(ES)), (Pn = Ra));
    } catch {}
}
zt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = NS;
zt.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!cp(t)) throw Error(L(200));
  return kS(e, t, null, n);
};
zt.createRoot = function (e, t) {
  if (!cp(e)) throw Error(L(299));
  var n = !1,
    r = "",
    i = Ev;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = ap(e, 1, !1, null, null, n, !1, r, i)),
    (e[qn] = t.current),
    Ts(e.nodeType === 8 ? e.parentNode : e),
    new up(t)
  );
};
zt.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(L(188))
      : ((e = Object.keys(e).join(",")), Error(L(268, e)));
  return ((e = Ky(t)), (e = e === null ? null : e.stateNode), e);
};
zt.flushSync = function (e) {
  return xi(e);
};
zt.hydrate = function (e, t, n) {
  if (!au(t)) throw Error(L(200));
  return lu(null, e, t, !0, n);
};
zt.hydrateRoot = function (e, t, n) {
  if (!cp(e)) throw Error(L(405));
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    o = "",
    s = Ev;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
    (t = Nv(t, null, e, 1, n ?? null, i, !1, o, s)),
    (e[qn] = t.current),
    Ts(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      ((n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i));
  return new su(t);
};
zt.render = function (e, t, n) {
  if (!au(t)) throw Error(L(200));
  return lu(null, e, t, !1, n);
};
zt.unmountComponentAtNode = function (e) {
  if (!au(e)) throw Error(L(40));
  return e._reactRootContainer
    ? (xi(function () {
        lu(null, null, e, !1, function () {
          ((e._reactRootContainer = null), (e[qn] = null));
        });
      }),
      !0)
    : !1;
};
zt.unstable_batchedUpdates = rp;
zt.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!au(n)) throw Error(L(200));
  if (e == null || e._reactInternals === void 0) throw Error(L(38));
  return lu(e, t, n, !1, r);
};
zt.version = "18.3.1-next-f1338f8080-20240426";
function jv() {
  if (!(
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
  ))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(jv);
    } catch (e) {
      console.error(e);
    }
}
(jv(), (jy.exports = zt));
var uu = jy.exports;
const Pv = gf(uu);
var hm = uu;
((Tc.createRoot = hm.createRoot), (Tc.hydrateRoot = hm.hydrateRoot));
/**
 * @remix-run/router v1.21.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function $s() {
  return (
    ($s = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    $s.apply(this, arguments)
  );
}
var Sr;
(function (e) {
  ((e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE"));
})(Sr || (Sr = {}));
const mm = "popstate";
function jS(e) {
  e === void 0 && (e = {});
  function t(r, i) {
    let { pathname: o, search: s, hash: a } = r.location;
    return Nd(
      "",
      { pathname: o, search: s, hash: a },
      (i.state && i.state.usr) || null,
      (i.state && i.state.key) || "default",
    );
  }
  function n(r, i) {
    return typeof i == "string" ? i : Ml(i);
  }
  return _S(t, n, null, e);
}
function Te(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function _v(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function PS() {
  return Math.random().toString(36).substr(2, 8);
}
function gm(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function Nd(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    $s(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? Do(t) : t,
      { state: n, key: (t && t.key) || r || PS() },
    )
  );
}
function Ml(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function Do(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    (r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e));
  }
  return t;
}
function _S(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: i = document.defaultView, v5Compat: o = !1 } = r,
    s = i.history,
    a = Sr.Pop,
    u = null,
    c = d();
  c == null && ((c = 0), s.replaceState($s({}, s.state, { idx: c }), ""));
  function d() {
    return (s.state || { idx: null }).idx;
  }
  function f() {
    a = Sr.Pop;
    let b = d(),
      m = b == null ? null : b - c;
    ((c = b), u && u({ action: a, location: g.location, delta: m }));
  }
  function h(b, m) {
    a = Sr.Push;
    let x = Nd(g.location, b, m);
    c = d() + 1;
    let y = gm(x, c),
      k = g.createHref(x);
    try {
      s.pushState(y, "", k);
    } catch (N) {
      if (N instanceof DOMException && N.name === "DataCloneError") throw N;
      i.location.assign(k);
    }
    o && u && u({ action: a, location: g.location, delta: 1 });
  }
  function p(b, m) {
    a = Sr.Replace;
    let x = Nd(g.location, b, m);
    c = d();
    let y = gm(x, c),
      k = g.createHref(x);
    (s.replaceState(y, "", k),
      o && u && u({ action: a, location: g.location, delta: 0 }));
  }
  function v(b) {
    let m = i.location.origin !== "null" ? i.location.origin : i.location.href,
      x = typeof b == "string" ? b : Ml(b);
    return (
      (x = x.replace(/ $/, "%20")),
      Te(
        m,
        "No window.location.(origin|href) available to create URL for href: " +
          x,
      ),
      new URL(x, m)
    );
  }
  let g = {
    get action() {
      return a;
    },
    get location() {
      return e(i, s);
    },
    listen(b) {
      if (u) throw new Error("A history only accepts one active listener");
      return (
        i.addEventListener(mm, f),
        (u = b),
        () => {
          (i.removeEventListener(mm, f), (u = null));
        }
      );
    },
    createHref(b) {
      return t(i, b);
    },
    createURL: v,
    encodeLocation(b) {
      let m = v(b);
      return { pathname: m.pathname, search: m.search, hash: m.hash };
    },
    push: h,
    replace: p,
    go(b) {
      return s.go(b);
    },
  };
  return g;
}
var ym;
(function (e) {
  ((e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error"));
})(ym || (ym = {}));
function RS(e, t, n) {
  return (n === void 0 && (n = "/"), MS(e, t, n));
}
function MS(e, t, n, r) {
  let i = typeof t == "string" ? Do(t) : t,
    o = _o(i.pathname || "/", n);
  if (o == null) return null;
  let s = Rv(e);
  TS(s);
  let a = null;
  for (let u = 0; a == null && u < s.length; ++u) {
    let c = WS(o);
    a = $S(s[u], c);
  }
  return a;
}
function Rv(e, t, n, r) {
  (t === void 0 && (t = []),
    n === void 0 && (n = []),
    r === void 0 && (r = ""));
  let i = (o, s, a) => {
    let u = {
      relativePath: a === void 0 ? o.path || "" : a,
      caseSensitive: o.caseSensitive === !0,
      childrenIndex: s,
      route: o,
    };
    u.relativePath.startsWith("/") &&
      (Te(
        u.relativePath.startsWith(r),
        'Absolute route path "' +
          u.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes.",
      ),
      (u.relativePath = u.relativePath.slice(r.length)));
    let c = Ar([r, u.relativePath]),
      d = n.concat(u);
    (o.children &&
      o.children.length > 0 &&
      (Te(
        o.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + c + '".'),
      ),
      Rv(o.children, t, d, c)),
      !(o.path == null && !o.index) &&
        t.push({ path: c, score: FS(c, o.index), routesMeta: d }));
  };
  return (
    e.forEach((o, s) => {
      var a;
      if (o.path === "" || !((a = o.path) != null && a.includes("?"))) i(o, s);
      else for (let u of Mv(o.path)) i(o, s, u);
    }),
    t
  );
}
function Mv(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    i = n.endsWith("?"),
    o = n.replace(/\?$/, "");
  if (r.length === 0) return i ? [o, ""] : [o];
  let s = Mv(r.join("/")),
    a = [];
  return (
    a.push(...s.map((u) => (u === "" ? o : [o, u].join("/")))),
    i && a.push(...s),
    a.map((u) => (e.startsWith("/") && u === "" ? "/" : u))
  );
}
function TS(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : BS(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex),
        ),
  );
}
const AS = /^:[\w-]+$/,
  IS = 3,
  OS = 2,
  DS = 1,
  LS = 10,
  zS = -2,
  xm = (e) => e === "*";
function FS(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(xm) && (r += zS),
    t && (r += OS),
    n
      .filter((i) => !xm(i))
      .reduce((i, o) => i + (AS.test(o) ? IS : o === "" ? DS : LS), r)
  );
}
function BS(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, i) => r === t[i])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function $S(e, t, n) {
  let { routesMeta: r } = e,
    i = {},
    o = "/",
    s = [];
  for (let a = 0; a < r.length; ++a) {
    let u = r[a],
      c = a === r.length - 1,
      d = o === "/" ? t : t.slice(o.length) || "/",
      f = Ed(
        { path: u.relativePath, caseSensitive: u.caseSensitive, end: c },
        d,
      ),
      h = u.route;
    if (!f) return null;
    (Object.assign(i, f.params),
      s.push({
        params: i,
        pathname: Ar([o, f.pathname]),
        pathnameBase: QS(Ar([o, f.pathnameBase])),
        route: h,
      }),
      f.pathnameBase !== "/" && (o = Ar([o, f.pathnameBase])));
  }
  return s;
}
function Ed(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = US(e.path, e.caseSensitive, e.end),
    i = t.match(n);
  if (!i) return null;
  let o = i[0],
    s = o.replace(/(.)\/+$/, "$1"),
    a = i.slice(1);
  return {
    params: r.reduce((c, d, f) => {
      let { paramName: h, isOptional: p } = d;
      if (h === "*") {
        let g = a[f] || "";
        s = o.slice(0, o.length - g.length).replace(/(.)\/+$/, "$1");
      }
      const v = a[f];
      return (
        p && !v ? (c[h] = void 0) : (c[h] = (v || "").replace(/%2F/g, "/")),
        c
      );
    }, {}),
    pathname: o,
    pathnameBase: s,
    pattern: e,
  };
}
function US(e, t, n) {
  (t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    _v(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'),
    ));
  let r = [],
    i =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (s, a, u) => (
            r.push({ paramName: a, isOptional: u != null }),
            u ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (i += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
        ? (i += "\\/*$")
        : e !== "" && e !== "/" && (i += "(?:(?=\\/|$))"),
    [new RegExp(i, t ? void 0 : "i"), r]
  );
}
function WS(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      _v(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ")."),
      ),
      e
    );
  }
}
function _o(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function VS(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: i = "",
  } = typeof e == "string" ? Do(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : HS(n, t)) : t,
    search: KS(r),
    hash: GS(i),
  };
}
function HS(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((i) => {
      i === ".." ? n.length > 1 && n.pop() : i !== "." && n.push(i);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function ic(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function qS(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0),
  );
}
function dp(e, t) {
  let n = qS(e);
  return t
    ? n.map((r, i) => (i === n.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase);
}
function fp(e, t, n, r) {
  r === void 0 && (r = !1);
  let i;
  typeof e == "string"
    ? (i = Do(e))
    : ((i = $s({}, e)),
      Te(
        !i.pathname || !i.pathname.includes("?"),
        ic("?", "pathname", "search", i),
      ),
      Te(
        !i.pathname || !i.pathname.includes("#"),
        ic("#", "pathname", "hash", i),
      ),
      Te(!i.search || !i.search.includes("#"), ic("#", "search", "hash", i)));
  let o = e === "" || i.pathname === "",
    s = o ? "/" : i.pathname,
    a;
  if (s == null) a = n;
  else {
    let f = t.length - 1;
    if (!r && s.startsWith("..")) {
      let h = s.split("/");
      for (; h[0] === "..";) (h.shift(), (f -= 1));
      i.pathname = h.join("/");
    }
    a = f >= 0 ? t[f] : "/";
  }
  let u = VS(i, a),
    c = s && s !== "/" && s.endsWith("/"),
    d = (o || s === ".") && n.endsWith("/");
  return (!u.pathname.endsWith("/") && (c || d) && (u.pathname += "/"), u);
}
const Ar = (e) => e.join("/").replace(/\/\/+/g, "/"),
  QS = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  KS = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  GS = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function YS(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const Tv = ["post", "put", "patch", "delete"];
new Set(Tv);
const XS = ["get", ...Tv];
new Set(XS);
/**
 * React Router v6.28.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Us() {
  return (
    (Us = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Us.apply(this, arguments)
  );
}
const cu = w.createContext(null),
  Av = w.createContext(null),
  Xn = w.createContext(null),
  du = w.createContext(null),
  Zn = w.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  Iv = w.createContext(null);
function ZS(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  Lo() || Te(!1);
  let { basename: r, navigator: i } = w.useContext(Xn),
    { hash: o, pathname: s, search: a } = fu(e, { relative: n }),
    u = s;
  return (
    r !== "/" && (u = s === "/" ? r : Ar([r, s])),
    i.createHref({ pathname: u, search: a, hash: o })
  );
}
function Lo() {
  return w.useContext(du) != null;
}
function Ur() {
  return (Lo() || Te(!1), w.useContext(du).location);
}
function Ov(e) {
  w.useContext(Xn).static || w.useLayoutEffect(e);
}
function Jn() {
  let { isDataRoute: e } = w.useContext(Zn);
  return e ? p2() : JS();
}
function JS() {
  Lo() || Te(!1);
  let e = w.useContext(cu),
    { basename: t, future: n, navigator: r } = w.useContext(Xn),
    { matches: i } = w.useContext(Zn),
    { pathname: o } = Ur(),
    s = JSON.stringify(dp(i, n.v7_relativeSplatPath)),
    a = w.useRef(!1);
  return (
    Ov(() => {
      a.current = !0;
    }),
    w.useCallback(
      function (c, d) {
        if ((d === void 0 && (d = {}), !a.current)) return;
        if (typeof c == "number") {
          r.go(c);
          return;
        }
        let f = fp(c, JSON.parse(s), o, d.relative === "path");
        (e == null &&
          t !== "/" &&
          (f.pathname = f.pathname === "/" ? t : Ar([t, f.pathname])),
          (d.replace ? r.replace : r.push)(f, d.state, d));
      },
      [t, r, s, o, e],
    )
  );
}
const e2 = w.createContext(null);
function t2(e) {
  let t = w.useContext(Zn).outlet;
  return t && w.createElement(e2.Provider, { value: e }, t);
}
function fu(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = w.useContext(Xn),
    { matches: i } = w.useContext(Zn),
    { pathname: o } = Ur(),
    s = JSON.stringify(dp(i, r.v7_relativeSplatPath));
  return w.useMemo(() => fp(e, JSON.parse(s), o, n === "path"), [e, s, o, n]);
}
function n2(e, t) {
  return r2(e, t);
}
function r2(e, t, n, r) {
  Lo() || Te(!1);
  let { navigator: i } = w.useContext(Xn),
    { matches: o } = w.useContext(Zn),
    s = o[o.length - 1],
    a = s ? s.params : {};
  s && s.pathname;
  let u = s ? s.pathnameBase : "/";
  s && s.route;
  let c = Ur(),
    d;
  if (t) {
    var f;
    let b = typeof t == "string" ? Do(t) : t;
    (u === "/" || ((f = b.pathname) != null && f.startsWith(u)) || Te(!1),
      (d = b));
  } else d = c;
  let h = d.pathname || "/",
    p = h;
  if (u !== "/") {
    let b = u.replace(/^\//, "").split("/");
    p = "/" + h.replace(/^\//, "").split("/").slice(b.length).join("/");
  }
  let v = RS(e, { pathname: p }),
    g = l2(
      v &&
        v.map((b) =>
          Object.assign({}, b, {
            params: Object.assign({}, a, b.params),
            pathname: Ar([
              u,
              i.encodeLocation
                ? i.encodeLocation(b.pathname).pathname
                : b.pathname,
            ]),
            pathnameBase:
              b.pathnameBase === "/"
                ? u
                : Ar([
                    u,
                    i.encodeLocation
                      ? i.encodeLocation(b.pathnameBase).pathname
                      : b.pathnameBase,
                  ]),
          }),
        ),
      o,
      n,
      r,
    );
  return t && g
    ? w.createElement(
        du.Provider,
        {
          value: {
            location: Us(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              d,
            ),
            navigationType: Sr.Pop,
          },
        },
        g,
      )
    : g;
}
function i2() {
  let e = f2(),
    t = YS(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    i = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return w.createElement(
    w.Fragment,
    null,
    w.createElement("h2", null, "Unexpected Application Error!"),
    w.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? w.createElement("pre", { style: i }, n) : null,
    null,
  );
}
const o2 = w.createElement(i2, null);
class s2 extends w.Component {
  constructor(t) {
    (super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      }));
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n,
    );
  }
  render() {
    return this.state.error !== void 0
      ? w.createElement(
          Zn.Provider,
          { value: this.props.routeContext },
          w.createElement(Iv.Provider, {
            value: this.state.error,
            children: this.props.component,
          }),
        )
      : this.props.children;
  }
}
function a2(e) {
  let { routeContext: t, match: n, children: r } = e,
    i = w.useContext(cu);
  return (
    i &&
      i.static &&
      i.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (i.staticContext._deepestRenderedBoundaryId = n.route.id),
    w.createElement(Zn.Provider, { value: t }, r)
  );
}
function l2(e, t, n, r) {
  var i;
  if (
    (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null)
  ) {
    var o;
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (
      (o = r) != null &&
      o.v7_partialHydration &&
      t.length === 0 &&
      !n.initialized &&
      n.matches.length > 0
    )
      e = n.matches;
    else return null;
  }
  let s = e,
    a = (i = n) == null ? void 0 : i.errors;
  if (a != null) {
    let d = s.findIndex(
      (f) => f.route.id && (a == null ? void 0 : a[f.route.id]) !== void 0,
    );
    (d >= 0 || Te(!1), (s = s.slice(0, Math.min(s.length, d + 1))));
  }
  let u = !1,
    c = -1;
  if (n && r && r.v7_partialHydration)
    for (let d = 0; d < s.length; d++) {
      let f = s[d];
      if (
        ((f.route.HydrateFallback || f.route.hydrateFallbackElement) && (c = d),
        f.route.id)
      ) {
        let { loaderData: h, errors: p } = n,
          v =
            f.route.loader &&
            h[f.route.id] === void 0 &&
            (!p || p[f.route.id] === void 0);
        if (f.route.lazy || v) {
          ((u = !0), c >= 0 ? (s = s.slice(0, c + 1)) : (s = [s[0]]));
          break;
        }
      }
    }
  return s.reduceRight((d, f, h) => {
    let p,
      v = !1,
      g = null,
      b = null;
    n &&
      ((p = a && f.route.id ? a[f.route.id] : void 0),
      (g = f.route.errorElement || o2),
      u &&
        (c < 0 && h === 0
          ? (h2("route-fallback"), (v = !0), (b = null))
          : c === h &&
            ((v = !0), (b = f.route.hydrateFallbackElement || null))));
    let m = t.concat(s.slice(0, h + 1)),
      x = () => {
        let y;
        return (
          p
            ? (y = g)
            : v
              ? (y = b)
              : f.route.Component
                ? (y = w.createElement(f.route.Component, null))
                : f.route.element
                  ? (y = f.route.element)
                  : (y = d),
          w.createElement(a2, {
            match: f,
            routeContext: { outlet: d, matches: m, isDataRoute: n != null },
            children: y,
          })
        );
      };
    return n && (f.route.ErrorBoundary || f.route.errorElement || h === 0)
      ? w.createElement(s2, {
          location: n.location,
          revalidation: n.revalidation,
          component: g,
          error: p,
          children: x(),
          routeContext: { outlet: null, matches: m, isDataRoute: !0 },
        })
      : x();
  }, null);
}
var Dv = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(Dv || {}),
  Lv = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(Lv || {});
function u2(e) {
  let t = w.useContext(cu);
  return (t || Te(!1), t);
}
function c2(e) {
  let t = w.useContext(Av);
  return (t || Te(!1), t);
}
function d2(e) {
  let t = w.useContext(Zn);
  return (t || Te(!1), t);
}
function zv(e) {
  let t = d2(),
    n = t.matches[t.matches.length - 1];
  return (n.route.id || Te(!1), n.route.id);
}
function f2() {
  var e;
  let t = w.useContext(Iv),
    n = c2(),
    r = zv();
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function p2() {
  let { router: e } = u2(Dv.UseNavigateStable),
    t = zv(Lv.UseNavigateStable),
    n = w.useRef(!1);
  return (
    Ov(() => {
      n.current = !0;
    }),
    w.useCallback(
      function (i, o) {
        (o === void 0 && (o = {}),
          n.current &&
            (typeof i == "number"
              ? e.navigate(i)
              : e.navigate(i, Us({ fromRouteId: t }, o))));
      },
      [e, t],
    )
  );
}
const vm = {};
function h2(e, t, n) {
  vm[e] || (vm[e] = !0);
}
const wm = {};
function m2(e, t) {
  wm[t] || ((wm[t] = !0), console.warn(t));
}
const bm = (e, t, n) =>
  m2(
    e,
    "⚠️ React Router Future Flag Warning: " +
      t +
      ". " +
      ("You can use the `" + e + "` future flag to opt-in early. ") +
      ("For more information, see " + n + "."),
  );
function g2(e, t) {
  ((e != null && e.v7_startTransition) ||
    bm(
      "v7_startTransition",
      "React Router will begin wrapping state updates in `React.startTransition` in v7",
      "https://reactrouter.com/v6/upgrading/future#v7_starttransition",
    ),
    (e != null && e.v7_relativeSplatPath) ||
      bm(
        "v7_relativeSplatPath",
        "Relative route resolution within Splat routes is changing in v7",
        "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath",
      ));
}
function km(e) {
  let { to: t, replace: n, state: r, relative: i } = e;
  Lo() || Te(!1);
  let { future: o, static: s } = w.useContext(Xn),
    { matches: a } = w.useContext(Zn),
    { pathname: u } = Ur(),
    c = Jn(),
    d = fp(t, dp(a, o.v7_relativeSplatPath), u, i === "path"),
    f = JSON.stringify(d);
  return (
    w.useEffect(
      () => c(JSON.parse(f), { replace: n, state: r, relative: i }),
      [c, f, i, n, r],
    ),
    null
  );
}
function y2(e) {
  return t2(e.context);
}
function nn(e) {
  Te(!1);
}
function x2(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: i = Sr.Pop,
    navigator: o,
    static: s = !1,
    future: a,
  } = e;
  Lo() && Te(!1);
  let u = t.replace(/^\/*/, "/"),
    c = w.useMemo(
      () => ({
        basename: u,
        navigator: o,
        static: s,
        future: Us({ v7_relativeSplatPath: !1 }, a),
      }),
      [u, a, o, s],
    );
  typeof r == "string" && (r = Do(r));
  let {
      pathname: d = "/",
      search: f = "",
      hash: h = "",
      state: p = null,
      key: v = "default",
    } = r,
    g = w.useMemo(() => {
      let b = _o(d, u);
      return b == null
        ? null
        : {
            location: { pathname: b, search: f, hash: h, state: p, key: v },
            navigationType: i,
          };
    }, [u, d, f, h, p, v, i]);
  return g == null
    ? null
    : w.createElement(
        Xn.Provider,
        { value: c },
        w.createElement(du.Provider, { children: n, value: g }),
      );
}
function v2(e) {
  let { children: t, location: n } = e;
  return n2(jd(t), n);
}
new Promise(() => {});
function jd(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    w.Children.forEach(e, (r, i) => {
      if (!w.isValidElement(r)) return;
      let o = [...t, i];
      if (r.type === w.Fragment) {
        n.push.apply(n, jd(r.props.children, o));
        return;
      }
      (r.type !== nn && Te(!1), !r.props.index || !r.props.children || Te(!1));
      let s = {
        id: r.props.id || o.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      (r.props.children && (s.children = jd(r.props.children, o)), n.push(s));
    }),
    n
  );
}
/**
 * React Router DOM v6.28.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Tl() {
  return (
    (Tl = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Tl.apply(this, arguments)
  );
}
function Fv(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    o;
  for (o = 0; o < r.length; o++)
    ((i = r[o]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
function w2(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function b2(e, t) {
  return e.button === 0 && (!t || t === "_self") && !w2(e);
}
function Pd(e) {
  return (
    e === void 0 && (e = ""),
    new URLSearchParams(
      typeof e == "string" || Array.isArray(e) || e instanceof URLSearchParams
        ? e
        : Object.keys(e).reduce((t, n) => {
            let r = e[n];
            return t.concat(Array.isArray(r) ? r.map((i) => [n, i]) : [[n, r]]);
          }, []),
    )
  );
}
function k2(e, t) {
  let n = Pd(e);
  return (
    t &&
      t.forEach((r, i) => {
        n.has(i) ||
          t.getAll(i).forEach((o) => {
            n.append(i, o);
          });
      }),
    n
  );
}
const S2 = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "viewTransition",
  ],
  C2 = [
    "aria-current",
    "caseSensitive",
    "className",
    "end",
    "style",
    "to",
    "viewTransition",
    "children",
  ],
  N2 = "6";
try {
  window.__reactRouterVersion = N2;
} catch {}
const E2 = w.createContext({ isTransitioning: !1 }),
  j2 = "startTransition",
  Sm = Ny[j2];
function P2(e) {
  let { basename: t, children: n, future: r, window: i } = e,
    o = w.useRef();
  o.current == null && (o.current = jS({ window: i, v5Compat: !0 }));
  let s = o.current,
    [a, u] = w.useState({ action: s.action, location: s.location }),
    { v7_startTransition: c } = r || {},
    d = w.useCallback(
      (f) => {
        c && Sm ? Sm(() => u(f)) : u(f);
      },
      [u, c],
    );
  return (
    w.useLayoutEffect(() => s.listen(d), [s, d]),
    w.useEffect(() => g2(r), [r]),
    w.createElement(x2, {
      basename: t,
      children: n,
      location: a.location,
      navigationType: a.action,
      navigator: s,
      future: r,
    })
  );
}
const _2 =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  R2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  It = w.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: i,
        reloadDocument: o,
        replace: s,
        state: a,
        target: u,
        to: c,
        preventScrollReset: d,
        viewTransition: f,
      } = t,
      h = Fv(t, S2),
      { basename: p } = w.useContext(Xn),
      v,
      g = !1;
    if (typeof c == "string" && R2.test(c) && ((v = c), _2))
      try {
        let y = new URL(window.location.href),
          k = c.startsWith("//") ? new URL(y.protocol + c) : new URL(c),
          N = _o(k.pathname, p);
        k.origin === y.origin && N != null
          ? (c = N + k.search + k.hash)
          : (g = !0);
      } catch {}
    let b = ZS(c, { relative: i }),
      m = T2(c, {
        replace: s,
        state: a,
        target: u,
        preventScrollReset: d,
        relative: i,
        viewTransition: f,
      });
    function x(y) {
      (r && r(y), y.defaultPrevented || m(y));
    }
    return w.createElement(
      "a",
      Tl({}, h, { href: v || b, onClick: g || o ? r : x, ref: n, target: u }),
    );
  }),
  oc = w.forwardRef(function (t, n) {
    let {
        "aria-current": r = "page",
        caseSensitive: i = !1,
        className: o = "",
        end: s = !1,
        style: a,
        to: u,
        viewTransition: c,
        children: d,
      } = t,
      f = Fv(t, C2),
      h = fu(u, { relative: f.relative }),
      p = Ur(),
      v = w.useContext(Av),
      { navigator: g, basename: b } = w.useContext(Xn),
      m = v != null && A2(h) && c === !0,
      x = g.encodeLocation ? g.encodeLocation(h).pathname : h.pathname,
      y = p.pathname,
      k =
        v && v.navigation && v.navigation.location
          ? v.navigation.location.pathname
          : null;
    (i ||
      ((y = y.toLowerCase()),
      (k = k ? k.toLowerCase() : null),
      (x = x.toLowerCase())),
      k && b && (k = _o(k, b) || k));
    const N = x !== "/" && x.endsWith("/") ? x.length - 1 : x.length;
    let C = y === x || (!s && y.startsWith(x) && y.charAt(N) === "/"),
      j =
        k != null &&
        (k === x || (!s && k.startsWith(x) && k.charAt(x.length) === "/")),
      P = { isActive: C, isPending: j, isTransitioning: m },
      T = C ? r : void 0,
      I;
    typeof o == "function"
      ? (I = o(P))
      : (I = [
          o,
          C ? "active" : null,
          j ? "pending" : null,
          m ? "transitioning" : null,
        ]
          .filter(Boolean)
          .join(" "));
    let D = typeof a == "function" ? a(P) : a;
    return w.createElement(
      It,
      Tl({}, f, {
        "aria-current": T,
        className: I,
        ref: n,
        style: D,
        to: u,
        viewTransition: c,
      }),
      typeof d == "function" ? d(P) : d,
    );
  });
var _d;
(function (e) {
  ((e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState"));
})(_d || (_d = {}));
var Cm;
(function (e) {
  ((e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration"));
})(Cm || (Cm = {}));
function M2(e) {
  let t = w.useContext(cu);
  return (t || Te(!1), t);
}
function T2(e, t) {
  let {
      target: n,
      replace: r,
      state: i,
      preventScrollReset: o,
      relative: s,
      viewTransition: a,
    } = t === void 0 ? {} : t,
    u = Jn(),
    c = Ur(),
    d = fu(e, { relative: s });
  return w.useCallback(
    (f) => {
      if (b2(f, n)) {
        f.preventDefault();
        let h = r !== void 0 ? r : Ml(c) === Ml(d);
        u(e, {
          replace: h,
          state: i,
          preventScrollReset: o,
          relative: s,
          viewTransition: a,
        });
      }
    },
    [c, u, d, r, i, n, e, o, s, a],
  );
}
function Bv(e) {
  let t = w.useRef(Pd(e)),
    n = w.useRef(!1),
    r = Ur(),
    i = w.useMemo(() => k2(r.search, n.current ? null : t.current), [r.search]),
    o = Jn(),
    s = w.useCallback(
      (a, u) => {
        const c = Pd(typeof a == "function" ? a(i) : a);
        ((n.current = !0), o("?" + c, u));
      },
      [o, i],
    );
  return [i, s];
}
function A2(e, t) {
  t === void 0 && (t = {});
  let n = w.useContext(E2);
  n == null && Te(!1);
  let { basename: r } = M2(_d.useViewTransitionState),
    i = fu(e, { relative: t.relative });
  if (!n.isTransitioning) return !1;
  let o = _o(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    s = _o(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return Ed(i.pathname, s) != null || Ed(i.pathname, o) != null;
}
var sa = class {
    constructor() {
      ((this.listeners = new Set()),
        (this.subscribe = this.subscribe.bind(this)));
    }
    subscribe(e) {
      return (
        this.listeners.add(e),
        this.onSubscribe(),
        () => {
          (this.listeners.delete(e), this.onUnsubscribe());
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  vi = typeof window > "u" || "Deno" in globalThis;
function Vt() {}
function I2(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Rd(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function $v(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function no(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ln(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Nm(e, t) {
  const {
    type: n = "all",
    exact: r,
    fetchStatus: i,
    predicate: o,
    queryKey: s,
    stale: a,
  } = e;
  if (s) {
    if (r) {
      if (t.queryHash !== pp(s, t.options)) return !1;
    } else if (!Vs(t.queryKey, s)) return !1;
  }
  if (n !== "all") {
    const u = t.isActive();
    if ((n === "active" && !u) || (n === "inactive" && u)) return !1;
  }
  return !(
    (typeof a == "boolean" && t.isStale() !== a) ||
    (i && i !== t.state.fetchStatus) ||
    (o && !o(t))
  );
}
function Em(e, t) {
  const { exact: n, status: r, predicate: i, mutationKey: o } = e;
  if (o) {
    if (!t.options.mutationKey) return !1;
    if (n) {
      if (Ws(t.options.mutationKey) !== Ws(o)) return !1;
    } else if (!Vs(t.options.mutationKey, o)) return !1;
  }
  return !((r && t.state.status !== r) || (i && !i(t)));
}
function pp(e, t) {
  return ((t == null ? void 0 : t.queryKeyHashFn) || Ws)(e);
}
function Ws(e) {
  return JSON.stringify(e, (t, n) =>
    Td(n)
      ? Object.keys(n)
          .sort()
          .reduce((r, i) => ((r[i] = n[i]), r), {})
      : n,
  );
}
function Vs(e, t) {
  return e === t
    ? !0
    : typeof e != typeof t
      ? !1
      : e && t && typeof e == "object" && typeof t == "object"
        ? !Object.keys(t).some((n) => !Vs(e[n], t[n]))
        : !1;
}
function Uv(e, t) {
  if (e === t) return e;
  const n = jm(e) && jm(t);
  if (n || (Td(e) && Td(t))) {
    const r = n ? e : Object.keys(e),
      i = r.length,
      o = n ? t : Object.keys(t),
      s = o.length,
      a = n ? [] : {};
    let u = 0;
    for (let c = 0; c < s; c++) {
      const d = n ? c : o[c];
      ((!n && r.includes(d)) || n) && e[d] === void 0 && t[d] === void 0
        ? ((a[d] = void 0), u++)
        : ((a[d] = Uv(e[d], t[d])), a[d] === e[d] && e[d] !== void 0 && u++);
    }
    return i === s && u === i ? e : a;
  }
  return t;
}
function Md(e, t) {
  if (!t || Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (e[n] !== t[n]) return !1;
  return !0;
}
function jm(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function Td(e) {
  if (!Pm(e)) return !1;
  const t = e.constructor;
  if (t === void 0) return !0;
  const n = t.prototype;
  return !(
    !Pm(n) ||
    !n.hasOwnProperty("isPrototypeOf") ||
    Object.getPrototypeOf(e) !== Object.prototype
  );
}
function Pm(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function O2(e) {
  return new Promise((t) => {
    setTimeout(t, e);
  });
}
function Ad(e, t, n) {
  return typeof n.structuralSharing == "function"
    ? n.structuralSharing(e, t)
    : n.structuralSharing !== !1
      ? Uv(e, t)
      : t;
}
function D2(e, t, n = 0) {
  const r = [...e, t];
  return n && r.length > n ? r.slice(1) : r;
}
function L2(e, t, n = 0) {
  const r = [t, ...e];
  return n && r.length > n ? r.slice(0, -1) : r;
}
var hp = Symbol();
function Wv(e, t) {
  return !e.queryFn && t != null && t.initialPromise
    ? () => t.initialPromise
    : !e.queryFn || e.queryFn === hp
      ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`))
      : e.queryFn;
}
var ii,
  hr,
  lo,
  sy,
  z2 =
    ((sy = class extends sa {
      constructor() {
        super();
        te(this, ii);
        te(this, hr);
        te(this, lo);
        q(this, lo, (t) => {
          if (!vi && window.addEventListener) {
            const n = () => t();
            return (
              window.addEventListener("visibilitychange", n, !1),
              () => {
                window.removeEventListener("visibilitychange", n);
              }
            );
          }
        });
      }
      onSubscribe() {
        R(this, hr) || this.setEventListener(R(this, lo));
      }
      onUnsubscribe() {
        var t;
        this.hasListeners() ||
          ((t = R(this, hr)) == null || t.call(this), q(this, hr, void 0));
      }
      setEventListener(t) {
        var n;
        (q(this, lo, t),
          (n = R(this, hr)) == null || n.call(this),
          q(
            this,
            hr,
            t((r) => {
              typeof r == "boolean" ? this.setFocused(r) : this.onFocus();
            }),
          ));
      }
      setFocused(t) {
        R(this, ii) !== t && (q(this, ii, t), this.onFocus());
      }
      onFocus() {
        const t = this.isFocused();
        this.listeners.forEach((n) => {
          n(t);
        });
      }
      isFocused() {
        var t;
        return typeof R(this, ii) == "boolean"
          ? R(this, ii)
          : ((t = globalThis.document) == null ? void 0 : t.visibilityState) !==
              "hidden";
      }
    }),
    (ii = new WeakMap()),
    (hr = new WeakMap()),
    (lo = new WeakMap()),
    sy),
  mp = new z2(),
  uo,
  mr,
  co,
  ay,
  F2 =
    ((ay = class extends sa {
      constructor() {
        super();
        te(this, uo, !0);
        te(this, mr);
        te(this, co);
        q(this, co, (t) => {
          if (!vi && window.addEventListener) {
            const n = () => t(!0),
              r = () => t(!1);
            return (
              window.addEventListener("online", n, !1),
              window.addEventListener("offline", r, !1),
              () => {
                (window.removeEventListener("online", n),
                  window.removeEventListener("offline", r));
              }
            );
          }
        });
      }
      onSubscribe() {
        R(this, mr) || this.setEventListener(R(this, co));
      }
      onUnsubscribe() {
        var t;
        this.hasListeners() ||
          ((t = R(this, mr)) == null || t.call(this), q(this, mr, void 0));
      }
      setEventListener(t) {
        var n;
        (q(this, co, t),
          (n = R(this, mr)) == null || n.call(this),
          q(this, mr, t(this.setOnline.bind(this))));
      }
      setOnline(t) {
        R(this, uo) !== t &&
          (q(this, uo, t),
          this.listeners.forEach((r) => {
            r(t);
          }));
      }
      isOnline() {
        return R(this, uo);
      }
    }),
    (uo = new WeakMap()),
    (mr = new WeakMap()),
    (co = new WeakMap()),
    ay),
  Al = new F2();
function Id() {
  let e, t;
  const n = new Promise((i, o) => {
    ((e = i), (t = o));
  });
  ((n.status = "pending"), n.catch(() => {}));
  function r(i) {
    (Object.assign(n, i), delete n.resolve, delete n.reject);
  }
  return (
    (n.resolve = (i) => {
      (r({ status: "fulfilled", value: i }), e(i));
    }),
    (n.reject = (i) => {
      (r({ status: "rejected", reason: i }), t(i));
    }),
    n
  );
}
function B2(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function Vv(e) {
  return (e ?? "online") === "online" ? Al.isOnline() : !0;
}
var Hv = class extends Error {
  constructor(e) {
    (super("CancelledError"),
      (this.revert = e == null ? void 0 : e.revert),
      (this.silent = e == null ? void 0 : e.silent));
  }
};
function sc(e) {
  return e instanceof Hv;
}
function qv(e) {
  let t = !1,
    n = 0,
    r = !1,
    i;
  const o = Id(),
    s = (g) => {
      var b;
      r || (h(new Hv(g)), (b = e.abort) == null || b.call(e));
    },
    a = () => {
      t = !0;
    },
    u = () => {
      t = !1;
    },
    c = () =>
      mp.isFocused() &&
      (e.networkMode === "always" || Al.isOnline()) &&
      e.canRun(),
    d = () => Vv(e.networkMode) && e.canRun(),
    f = (g) => {
      var b;
      r ||
        ((r = !0),
        (b = e.onSuccess) == null || b.call(e, g),
        i == null || i(),
        o.resolve(g));
    },
    h = (g) => {
      var b;
      r ||
        ((r = !0),
        (b = e.onError) == null || b.call(e, g),
        i == null || i(),
        o.reject(g));
    },
    p = () =>
      new Promise((g) => {
        var b;
        ((i = (m) => {
          (r || c()) && g(m);
        }),
          (b = e.onPause) == null || b.call(e));
      }).then(() => {
        var g;
        ((i = void 0), r || (g = e.onContinue) == null || g.call(e));
      }),
    v = () => {
      if (r) return;
      let g;
      const b = n === 0 ? e.initialPromise : void 0;
      try {
        g = b ?? e.fn();
      } catch (m) {
        g = Promise.reject(m);
      }
      Promise.resolve(g)
        .then(f)
        .catch((m) => {
          var C;
          if (r) return;
          const x = e.retry ?? (vi ? 0 : 3),
            y = e.retryDelay ?? B2,
            k = typeof y == "function" ? y(n, m) : y,
            N =
              x === !0 ||
              (typeof x == "number" && n < x) ||
              (typeof x == "function" && x(n, m));
          if (t || !N) {
            h(m);
            return;
          }
          (n++,
            (C = e.onFail) == null || C.call(e, n, m),
            O2(k)
              .then(() => (c() ? void 0 : p()))
              .then(() => {
                t ? h(m) : v();
              }));
        });
    };
  return {
    promise: o,
    cancel: s,
    continue: () => (i == null || i(), o),
    cancelRetry: a,
    continueRetry: u,
    canStart: d,
    start: () => (d() ? v() : p().then(v), o),
  };
}
function $2() {
  let e = [],
    t = 0,
    n = (a) => {
      a();
    },
    r = (a) => {
      a();
    },
    i = (a) => setTimeout(a, 0);
  const o = (a) => {
      t
        ? e.push(a)
        : i(() => {
            n(a);
          });
    },
    s = () => {
      const a = e;
      ((e = []),
        a.length &&
          i(() => {
            r(() => {
              a.forEach((u) => {
                n(u);
              });
            });
          }));
    };
  return {
    batch: (a) => {
      let u;
      t++;
      try {
        u = a();
      } finally {
        (t--, t || s());
      }
      return u;
    },
    batchCalls:
      (a) =>
      (...u) => {
        o(() => {
          a(...u);
        });
      },
    schedule: o,
    setNotifyFunction: (a) => {
      n = a;
    },
    setBatchNotifyFunction: (a) => {
      r = a;
    },
    setScheduler: (a) => {
      i = a;
    },
  };
}
var Ze = $2(),
  oi,
  ly,
  Qv =
    ((ly = class {
      constructor() {
        te(this, oi);
      }
      destroy() {
        this.clearGcTimeout();
      }
      scheduleGc() {
        (this.clearGcTimeout(),
          Rd(this.gcTime) &&
            q(
              this,
              oi,
              setTimeout(() => {
                this.optionalRemove();
              }, this.gcTime),
            ));
      }
      updateGcTime(e) {
        this.gcTime = Math.max(
          this.gcTime || 0,
          e ?? (vi ? 1 / 0 : 5 * 60 * 1e3),
        );
      }
      clearGcTimeout() {
        R(this, oi) && (clearTimeout(R(this, oi)), q(this, oi, void 0));
      }
    }),
    (oi = new WeakMap()),
    ly),
  fo,
  po,
  Wt,
  ot,
  Xs,
  si,
  on,
  Dn,
  uy,
  U2 =
    ((uy = class extends Qv {
      constructor(t) {
        super();
        te(this, on);
        te(this, fo);
        te(this, po);
        te(this, Wt);
        te(this, ot);
        te(this, Xs);
        te(this, si);
        (q(this, si, !1),
          q(this, Xs, t.defaultOptions),
          this.setOptions(t.options),
          (this.observers = []),
          q(this, Wt, t.cache),
          (this.queryKey = t.queryKey),
          (this.queryHash = t.queryHash),
          q(this, fo, W2(this.options)),
          (this.state = t.state ?? R(this, fo)),
          this.scheduleGc());
      }
      get meta() {
        return this.options.meta;
      }
      get promise() {
        var t;
        return (t = R(this, ot)) == null ? void 0 : t.promise;
      }
      setOptions(t) {
        ((this.options = { ...R(this, Xs), ...t }),
          this.updateGcTime(this.options.gcTime));
      }
      optionalRemove() {
        !this.observers.length &&
          this.state.fetchStatus === "idle" &&
          R(this, Wt).remove(this);
      }
      setData(t, n) {
        const r = Ad(this.state.data, t, this.options);
        return (
          fe(this, on, Dn).call(this, {
            data: r,
            type: "success",
            dataUpdatedAt: n == null ? void 0 : n.updatedAt,
            manual: n == null ? void 0 : n.manual,
          }),
          r
        );
      }
      setState(t, n) {
        fe(this, on, Dn).call(this, {
          type: "setState",
          state: t,
          setStateOptions: n,
        });
      }
      cancel(t) {
        var r, i;
        const n = (r = R(this, ot)) == null ? void 0 : r.promise;
        return (
          (i = R(this, ot)) == null || i.cancel(t),
          n ? n.then(Vt).catch(Vt) : Promise.resolve()
        );
      }
      destroy() {
        (super.destroy(), this.cancel({ silent: !0 }));
      }
      reset() {
        (this.destroy(), this.setState(R(this, fo)));
      }
      isActive() {
        return this.observers.some((t) => ln(t.options.enabled, this) !== !1);
      }
      isDisabled() {
        return this.getObserversCount() > 0
          ? !this.isActive()
          : this.options.queryFn === hp ||
              this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
      }
      isStale() {
        return this.state.isInvalidated
          ? !0
          : this.getObserversCount() > 0
            ? this.observers.some((t) => t.getCurrentResult().isStale)
            : this.state.data === void 0;
      }
      isStaleByTime(t = 0) {
        return (
          this.state.isInvalidated ||
          this.state.data === void 0 ||
          !$v(this.state.dataUpdatedAt, t)
        );
      }
      onFocus() {
        var n;
        const t = this.observers.find((r) => r.shouldFetchOnWindowFocus());
        (t == null || t.refetch({ cancelRefetch: !1 }),
          (n = R(this, ot)) == null || n.continue());
      }
      onOnline() {
        var n;
        const t = this.observers.find((r) => r.shouldFetchOnReconnect());
        (t == null || t.refetch({ cancelRefetch: !1 }),
          (n = R(this, ot)) == null || n.continue());
      }
      addObserver(t) {
        this.observers.includes(t) ||
          (this.observers.push(t),
          this.clearGcTimeout(),
          R(this, Wt).notify({
            type: "observerAdded",
            query: this,
            observer: t,
          }));
      }
      removeObserver(t) {
        this.observers.includes(t) &&
          ((this.observers = this.observers.filter((n) => n !== t)),
          this.observers.length ||
            (R(this, ot) &&
              (R(this, si)
                ? R(this, ot).cancel({ revert: !0 })
                : R(this, ot).cancelRetry()),
            this.scheduleGc()),
          R(this, Wt).notify({
            type: "observerRemoved",
            query: this,
            observer: t,
          }));
      }
      getObserversCount() {
        return this.observers.length;
      }
      invalidate() {
        this.state.isInvalidated ||
          fe(this, on, Dn).call(this, { type: "invalidate" });
      }
      fetch(t, n) {
        var u, c, d;
        if (this.state.fetchStatus !== "idle") {
          if (this.state.data !== void 0 && n != null && n.cancelRefetch)
            this.cancel({ silent: !0 });
          else if (R(this, ot))
            return (R(this, ot).continueRetry(), R(this, ot).promise);
        }
        if ((t && this.setOptions(t), !this.options.queryFn)) {
          const f = this.observers.find((h) => h.options.queryFn);
          f && this.setOptions(f.options);
        }
        const r = new AbortController(),
          i = (f) => {
            Object.defineProperty(f, "signal", {
              enumerable: !0,
              get: () => (q(this, si, !0), r.signal),
            });
          },
          o = () => {
            const f = Wv(this.options, n),
              h = { queryKey: this.queryKey, meta: this.meta };
            return (
              i(h),
              q(this, si, !1),
              this.options.persister ? this.options.persister(f, h, this) : f(h)
            );
          },
          s = {
            fetchOptions: n,
            options: this.options,
            queryKey: this.queryKey,
            state: this.state,
            fetchFn: o,
          };
        (i(s),
          (u = this.options.behavior) == null || u.onFetch(s, this),
          q(this, po, this.state),
          (this.state.fetchStatus === "idle" ||
            this.state.fetchMeta !==
              ((c = s.fetchOptions) == null ? void 0 : c.meta)) &&
            fe(this, on, Dn).call(this, {
              type: "fetch",
              meta: (d = s.fetchOptions) == null ? void 0 : d.meta,
            }));
        const a = (f) => {
          var h, p, v, g;
          ((sc(f) && f.silent) ||
            fe(this, on, Dn).call(this, { type: "error", error: f }),
            sc(f) ||
              ((p = (h = R(this, Wt).config).onError) == null ||
                p.call(h, f, this),
              (g = (v = R(this, Wt).config).onSettled) == null ||
                g.call(v, this.state.data, f, this)),
            this.scheduleGc());
        };
        return (
          q(
            this,
            ot,
            qv({
              initialPromise: n == null ? void 0 : n.initialPromise,
              fn: s.fetchFn,
              abort: r.abort.bind(r),
              onSuccess: (f) => {
                var h, p, v, g;
                if (f === void 0) {
                  a(new Error(`${this.queryHash} data is undefined`));
                  return;
                }
                try {
                  this.setData(f);
                } catch (b) {
                  a(b);
                  return;
                }
                ((p = (h = R(this, Wt).config).onSuccess) == null ||
                  p.call(h, f, this),
                  (g = (v = R(this, Wt).config).onSettled) == null ||
                    g.call(v, f, this.state.error, this),
                  this.scheduleGc());
              },
              onError: a,
              onFail: (f, h) => {
                fe(this, on, Dn).call(this, {
                  type: "failed",
                  failureCount: f,
                  error: h,
                });
              },
              onPause: () => {
                fe(this, on, Dn).call(this, { type: "pause" });
              },
              onContinue: () => {
                fe(this, on, Dn).call(this, { type: "continue" });
              },
              retry: s.options.retry,
              retryDelay: s.options.retryDelay,
              networkMode: s.options.networkMode,
              canRun: () => !0,
            }),
          ),
          R(this, ot).start()
        );
      }
    }),
    (fo = new WeakMap()),
    (po = new WeakMap()),
    (Wt = new WeakMap()),
    (ot = new WeakMap()),
    (Xs = new WeakMap()),
    (si = new WeakMap()),
    (on = new WeakSet()),
    (Dn = function (t) {
      const n = (r) => {
        switch (t.type) {
          case "failed":
            return {
              ...r,
              fetchFailureCount: t.failureCount,
              fetchFailureReason: t.error,
            };
          case "pause":
            return { ...r, fetchStatus: "paused" };
          case "continue":
            return { ...r, fetchStatus: "fetching" };
          case "fetch":
            return {
              ...r,
              ...Kv(r.data, this.options),
              fetchMeta: t.meta ?? null,
            };
          case "success":
            return {
              ...r,
              data: t.data,
              dataUpdateCount: r.dataUpdateCount + 1,
              dataUpdatedAt: t.dataUpdatedAt ?? Date.now(),
              error: null,
              isInvalidated: !1,
              status: "success",
              ...(!t.manual && {
                fetchStatus: "idle",
                fetchFailureCount: 0,
                fetchFailureReason: null,
              }),
            };
          case "error":
            const i = t.error;
            return sc(i) && i.revert && R(this, po)
              ? { ...R(this, po), fetchStatus: "idle" }
              : {
                  ...r,
                  error: i,
                  errorUpdateCount: r.errorUpdateCount + 1,
                  errorUpdatedAt: Date.now(),
                  fetchFailureCount: r.fetchFailureCount + 1,
                  fetchFailureReason: i,
                  fetchStatus: "idle",
                  status: "error",
                };
          case "invalidate":
            return { ...r, isInvalidated: !0 };
          case "setState":
            return { ...r, ...t.state };
        }
      };
      ((this.state = n(this.state)),
        Ze.batch(() => {
          (this.observers.forEach((r) => {
            r.onQueryUpdate();
          }),
            R(this, Wt).notify({ query: this, type: "updated", action: t }));
        }));
    }),
    uy);
function Kv(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: Vv(t.networkMode) ? "fetching" : "paused",
    ...(e === void 0 && { error: null, status: "pending" }),
  };
}
function W2(e) {
  const t =
      typeof e.initialData == "function" ? e.initialData() : e.initialData,
    n = t !== void 0,
    r = n
      ? typeof e.initialDataUpdatedAt == "function"
        ? e.initialDataUpdatedAt()
        : e.initialDataUpdatedAt
      : 0;
  return {
    data: t,
    dataUpdateCount: 0,
    dataUpdatedAt: n ? (r ?? Date.now()) : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: n ? "success" : "pending",
    fetchStatus: "idle",
  };
}
var wn,
  cy,
  V2 =
    ((cy = class extends sa {
      constructor(t = {}) {
        super();
        te(this, wn);
        ((this.config = t), q(this, wn, new Map()));
      }
      build(t, n, r) {
        const i = n.queryKey,
          o = n.queryHash ?? pp(i, n);
        let s = this.get(o);
        return (
          s ||
            ((s = new U2({
              cache: this,
              queryKey: i,
              queryHash: o,
              options: t.defaultQueryOptions(n),
              state: r,
              defaultOptions: t.getQueryDefaults(i),
            })),
            this.add(s)),
          s
        );
      }
      add(t) {
        R(this, wn).has(t.queryHash) ||
          (R(this, wn).set(t.queryHash, t),
          this.notify({ type: "added", query: t }));
      }
      remove(t) {
        const n = R(this, wn).get(t.queryHash);
        n &&
          (t.destroy(),
          n === t && R(this, wn).delete(t.queryHash),
          this.notify({ type: "removed", query: t }));
      }
      clear() {
        Ze.batch(() => {
          this.getAll().forEach((t) => {
            this.remove(t);
          });
        });
      }
      get(t) {
        return R(this, wn).get(t);
      }
      getAll() {
        return [...R(this, wn).values()];
      }
      find(t) {
        const n = { exact: !0, ...t };
        return this.getAll().find((r) => Nm(n, r));
      }
      findAll(t = {}) {
        const n = this.getAll();
        return Object.keys(t).length > 0 ? n.filter((r) => Nm(t, r)) : n;
      }
      notify(t) {
        Ze.batch(() => {
          this.listeners.forEach((n) => {
            n(t);
          });
        });
      }
      onFocus() {
        Ze.batch(() => {
          this.getAll().forEach((t) => {
            t.onFocus();
          });
        });
      }
      onOnline() {
        Ze.batch(() => {
          this.getAll().forEach((t) => {
            t.onOnline();
          });
        });
      }
    }),
    (wn = new WeakMap()),
    cy),
  bn,
  ct,
  ai,
  kn,
  lr,
  dy,
  H2 =
    ((dy = class extends Qv {
      constructor(t) {
        super();
        te(this, kn);
        te(this, bn);
        te(this, ct);
        te(this, ai);
        ((this.mutationId = t.mutationId),
          q(this, ct, t.mutationCache),
          q(this, bn, []),
          (this.state = t.state || q2()),
          this.setOptions(t.options),
          this.scheduleGc());
      }
      setOptions(t) {
        ((this.options = t), this.updateGcTime(this.options.gcTime));
      }
      get meta() {
        return this.options.meta;
      }
      addObserver(t) {
        R(this, bn).includes(t) ||
          (R(this, bn).push(t),
          this.clearGcTimeout(),
          R(this, ct).notify({
            type: "observerAdded",
            mutation: this,
            observer: t,
          }));
      }
      removeObserver(t) {
        (q(
          this,
          bn,
          R(this, bn).filter((n) => n !== t),
        ),
          this.scheduleGc(),
          R(this, ct).notify({
            type: "observerRemoved",
            mutation: this,
            observer: t,
          }));
      }
      optionalRemove() {
        R(this, bn).length ||
          (this.state.status === "pending"
            ? this.scheduleGc()
            : R(this, ct).remove(this));
      }
      continue() {
        var t;
        return (
          ((t = R(this, ai)) == null ? void 0 : t.continue()) ??
          this.execute(this.state.variables)
        );
      }
      async execute(t) {
        var i, o, s, a, u, c, d, f, h, p, v, g, b, m, x, y, k, N, C, j;
        q(
          this,
          ai,
          qv({
            fn: () =>
              this.options.mutationFn
                ? this.options.mutationFn(t)
                : Promise.reject(new Error("No mutationFn found")),
            onFail: (P, T) => {
              fe(this, kn, lr).call(this, {
                type: "failed",
                failureCount: P,
                error: T,
              });
            },
            onPause: () => {
              fe(this, kn, lr).call(this, { type: "pause" });
            },
            onContinue: () => {
              fe(this, kn, lr).call(this, { type: "continue" });
            },
            retry: this.options.retry ?? 0,
            retryDelay: this.options.retryDelay,
            networkMode: this.options.networkMode,
            canRun: () => R(this, ct).canRun(this),
          }),
        );
        const n = this.state.status === "pending",
          r = !R(this, ai).canStart();
        try {
          if (!n) {
            (fe(this, kn, lr).call(this, {
              type: "pending",
              variables: t,
              isPaused: r,
            }),
              await ((o = (i = R(this, ct).config).onMutate) == null
                ? void 0
                : o.call(i, t, this)));
            const T = await ((a = (s = this.options).onMutate) == null
              ? void 0
              : a.call(s, t));
            T !== this.state.context &&
              fe(this, kn, lr).call(this, {
                type: "pending",
                context: T,
                variables: t,
                isPaused: r,
              });
          }
          const P = await R(this, ai).start();
          return (
            await ((c = (u = R(this, ct).config).onSuccess) == null
              ? void 0
              : c.call(u, P, t, this.state.context, this)),
            await ((f = (d = this.options).onSuccess) == null
              ? void 0
              : f.call(d, P, t, this.state.context)),
            await ((p = (h = R(this, ct).config).onSettled) == null
              ? void 0
              : p.call(
                  h,
                  P,
                  null,
                  this.state.variables,
                  this.state.context,
                  this,
                )),
            await ((g = (v = this.options).onSettled) == null
              ? void 0
              : g.call(v, P, null, t, this.state.context)),
            fe(this, kn, lr).call(this, { type: "success", data: P }),
            P
          );
        } catch (P) {
          try {
            throw (
              await ((m = (b = R(this, ct).config).onError) == null
                ? void 0
                : m.call(b, P, t, this.state.context, this)),
              await ((y = (x = this.options).onError) == null
                ? void 0
                : y.call(x, P, t, this.state.context)),
              await ((N = (k = R(this, ct).config).onSettled) == null
                ? void 0
                : N.call(
                    k,
                    void 0,
                    P,
                    this.state.variables,
                    this.state.context,
                    this,
                  )),
              await ((j = (C = this.options).onSettled) == null
                ? void 0
                : j.call(C, void 0, P, t, this.state.context)),
              P
            );
          } finally {
            fe(this, kn, lr).call(this, { type: "error", error: P });
          }
        } finally {
          R(this, ct).runNext(this);
        }
      }
    }),
    (bn = new WeakMap()),
    (ct = new WeakMap()),
    (ai = new WeakMap()),
    (kn = new WeakSet()),
    (lr = function (t) {
      const n = (r) => {
        switch (t.type) {
          case "failed":
            return {
              ...r,
              failureCount: t.failureCount,
              failureReason: t.error,
            };
          case "pause":
            return { ...r, isPaused: !0 };
          case "continue":
            return { ...r, isPaused: !1 };
          case "pending":
            return {
              ...r,
              context: t.context,
              data: void 0,
              failureCount: 0,
              failureReason: null,
              error: null,
              isPaused: t.isPaused,
              status: "pending",
              variables: t.variables,
              submittedAt: Date.now(),
            };
          case "success":
            return {
              ...r,
              data: t.data,
              failureCount: 0,
              failureReason: null,
              error: null,
              status: "success",
              isPaused: !1,
            };
          case "error":
            return {
              ...r,
              data: void 0,
              error: t.error,
              failureCount: r.failureCount + 1,
              failureReason: t.error,
              isPaused: !1,
              status: "error",
            };
        }
      };
      ((this.state = n(this.state)),
        Ze.batch(() => {
          (R(this, bn).forEach((r) => {
            r.onMutationUpdate(t);
          }),
            R(this, ct).notify({ mutation: this, type: "updated", action: t }));
        }));
    }),
    dy);
function q2() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0,
  };
}
var Rt,
  Zs,
  fy,
  Q2 =
    ((fy = class extends sa {
      constructor(t = {}) {
        super();
        te(this, Rt);
        te(this, Zs);
        ((this.config = t), q(this, Rt, new Map()), q(this, Zs, Date.now()));
      }
      build(t, n, r) {
        const i = new H2({
          mutationCache: this,
          mutationId: ++pa(this, Zs)._,
          options: t.defaultMutationOptions(n),
          state: r,
        });
        return (this.add(i), i);
      }
      add(t) {
        const n = Ma(t),
          r = R(this, Rt).get(n) ?? [];
        (r.push(t),
          R(this, Rt).set(n, r),
          this.notify({ type: "added", mutation: t }));
      }
      remove(t) {
        var r;
        const n = Ma(t);
        if (R(this, Rt).has(n)) {
          const i =
            (r = R(this, Rt).get(n)) == null
              ? void 0
              : r.filter((o) => o !== t);
          i && (i.length === 0 ? R(this, Rt).delete(n) : R(this, Rt).set(n, i));
        }
        this.notify({ type: "removed", mutation: t });
      }
      canRun(t) {
        var r;
        const n =
          (r = R(this, Rt).get(Ma(t))) == null
            ? void 0
            : r.find((i) => i.state.status === "pending");
        return !n || n === t;
      }
      runNext(t) {
        var r;
        const n =
          (r = R(this, Rt).get(Ma(t))) == null
            ? void 0
            : r.find((i) => i !== t && i.state.isPaused);
        return (n == null ? void 0 : n.continue()) ?? Promise.resolve();
      }
      clear() {
        Ze.batch(() => {
          this.getAll().forEach((t) => {
            this.remove(t);
          });
        });
      }
      getAll() {
        return [...R(this, Rt).values()].flat();
      }
      find(t) {
        const n = { exact: !0, ...t };
        return this.getAll().find((r) => Em(n, r));
      }
      findAll(t = {}) {
        return this.getAll().filter((n) => Em(t, n));
      }
      notify(t) {
        Ze.batch(() => {
          this.listeners.forEach((n) => {
            n(t);
          });
        });
      }
      resumePausedMutations() {
        const t = this.getAll().filter((n) => n.state.isPaused);
        return Ze.batch(() =>
          Promise.all(t.map((n) => n.continue().catch(Vt))),
        );
      }
    }),
    (Rt = new WeakMap()),
    (Zs = new WeakMap()),
    fy);
function Ma(e) {
  var t;
  return (
    ((t = e.options.scope) == null ? void 0 : t.id) ?? String(e.mutationId)
  );
}
function _m(e) {
  return {
    onFetch: (t, n) => {
      var d, f, h, p, v;
      const r = t.options,
        i =
          (h =
            (f = (d = t.fetchOptions) == null ? void 0 : d.meta) == null
              ? void 0
              : f.fetchMore) == null
            ? void 0
            : h.direction,
        o = ((p = t.state.data) == null ? void 0 : p.pages) || [],
        s = ((v = t.state.data) == null ? void 0 : v.pageParams) || [];
      let a = { pages: [], pageParams: [] },
        u = 0;
      const c = async () => {
        let g = !1;
        const b = (y) => {
            Object.defineProperty(y, "signal", {
              enumerable: !0,
              get: () => (
                t.signal.aborted
                  ? (g = !0)
                  : t.signal.addEventListener("abort", () => {
                      g = !0;
                    }),
                t.signal
              ),
            });
          },
          m = Wv(t.options, t.fetchOptions),
          x = async (y, k, N) => {
            if (g) return Promise.reject();
            if (k == null && y.pages.length) return Promise.resolve(y);
            const C = {
              queryKey: t.queryKey,
              pageParam: k,
              direction: N ? "backward" : "forward",
              meta: t.options.meta,
            };
            b(C);
            const j = await m(C),
              { maxPages: P } = t.options,
              T = N ? L2 : D2;
            return {
              pages: T(y.pages, j, P),
              pageParams: T(y.pageParams, k, P),
            };
          };
        if (i && o.length) {
          const y = i === "backward",
            k = y ? K2 : Rm,
            N = { pages: o, pageParams: s },
            C = k(r, N);
          a = await x(N, C, y);
        } else {
          const y = e ?? o.length;
          do {
            const k = u === 0 ? (s[0] ?? r.initialPageParam) : Rm(r, a);
            if (u > 0 && k == null) break;
            ((a = await x(a, k)), u++);
          } while (u < y);
        }
        return a;
      };
      t.options.persister
        ? (t.fetchFn = () => {
            var g, b;
            return (b = (g = t.options).persister) == null
              ? void 0
              : b.call(
                  g,
                  c,
                  {
                    queryKey: t.queryKey,
                    meta: t.options.meta,
                    signal: t.signal,
                  },
                  n,
                );
          })
        : (t.fetchFn = c);
    },
  };
}
function Rm(e, { pages: t, pageParams: n }) {
  const r = t.length - 1;
  return t.length > 0 ? e.getNextPageParam(t[r], t, n[r], n) : void 0;
}
function K2(e, { pages: t, pageParams: n }) {
  var r;
  return t.length > 0
    ? (r = e.getPreviousPageParam) == null
      ? void 0
      : r.call(e, t[0], t, n[0], n)
    : void 0;
}
var Oe,
  gr,
  yr,
  ho,
  mo,
  xr,
  go,
  yo,
  py,
  G2 =
    ((py = class {
      constructor(e = {}) {
        te(this, Oe);
        te(this, gr);
        te(this, yr);
        te(this, ho);
        te(this, mo);
        te(this, xr);
        te(this, go);
        te(this, yo);
        (q(this, Oe, e.queryCache || new V2()),
          q(this, gr, e.mutationCache || new Q2()),
          q(this, yr, e.defaultOptions || {}),
          q(this, ho, new Map()),
          q(this, mo, new Map()),
          q(this, xr, 0));
      }
      mount() {
        (pa(this, xr)._++,
          R(this, xr) === 1 &&
            (q(
              this,
              go,
              mp.subscribe(async (e) => {
                e &&
                  (await this.resumePausedMutations(), R(this, Oe).onFocus());
              }),
            ),
            q(
              this,
              yo,
              Al.subscribe(async (e) => {
                e &&
                  (await this.resumePausedMutations(), R(this, Oe).onOnline());
              }),
            )));
      }
      unmount() {
        var e, t;
        (pa(this, xr)._--,
          R(this, xr) === 0 &&
            ((e = R(this, go)) == null || e.call(this),
            q(this, go, void 0),
            (t = R(this, yo)) == null || t.call(this),
            q(this, yo, void 0)));
      }
      isFetching(e) {
        return R(this, Oe).findAll({ ...e, fetchStatus: "fetching" }).length;
      }
      isMutating(e) {
        return R(this, gr).findAll({ ...e, status: "pending" }).length;
      }
      getQueryData(e) {
        var n;
        const t = this.defaultQueryOptions({ queryKey: e });
        return (n = R(this, Oe).get(t.queryHash)) == null
          ? void 0
          : n.state.data;
      }
      ensureQueryData(e) {
        const t = this.getQueryData(e.queryKey);
        if (t === void 0) return this.fetchQuery(e);
        {
          const n = this.defaultQueryOptions(e),
            r = R(this, Oe).build(this, n);
          return (
            e.revalidateIfStale &&
              r.isStaleByTime(no(n.staleTime, r)) &&
              this.prefetchQuery(n),
            Promise.resolve(t)
          );
        }
      }
      getQueriesData(e) {
        return R(this, Oe)
          .findAll(e)
          .map(({ queryKey: t, state: n }) => {
            const r = n.data;
            return [t, r];
          });
      }
      setQueryData(e, t, n) {
        const r = this.defaultQueryOptions({ queryKey: e }),
          i = R(this, Oe).get(r.queryHash),
          o = i == null ? void 0 : i.state.data,
          s = I2(t, o);
        if (s !== void 0)
          return R(this, Oe)
            .build(this, r)
            .setData(s, { ...n, manual: !0 });
      }
      setQueriesData(e, t, n) {
        return Ze.batch(() =>
          R(this, Oe)
            .findAll(e)
            .map(({ queryKey: r }) => [r, this.setQueryData(r, t, n)]),
        );
      }
      getQueryState(e) {
        var n;
        const t = this.defaultQueryOptions({ queryKey: e });
        return (n = R(this, Oe).get(t.queryHash)) == null ? void 0 : n.state;
      }
      removeQueries(e) {
        const t = R(this, Oe);
        Ze.batch(() => {
          t.findAll(e).forEach((n) => {
            t.remove(n);
          });
        });
      }
      resetQueries(e, t) {
        const n = R(this, Oe),
          r = { type: "active", ...e };
        return Ze.batch(
          () => (
            n.findAll(e).forEach((i) => {
              i.reset();
            }),
            this.refetchQueries(r, t)
          ),
        );
      }
      cancelQueries(e = {}, t = {}) {
        const n = { revert: !0, ...t },
          r = Ze.batch(() =>
            R(this, Oe)
              .findAll(e)
              .map((i) => i.cancel(n)),
          );
        return Promise.all(r).then(Vt).catch(Vt);
      }
      invalidateQueries(e = {}, t = {}) {
        return Ze.batch(() => {
          if (
            (R(this, Oe)
              .findAll(e)
              .forEach((r) => {
                r.invalidate();
              }),
            e.refetchType === "none")
          )
            return Promise.resolve();
          const n = { ...e, type: e.refetchType ?? e.type ?? "active" };
          return this.refetchQueries(n, t);
        });
      }
      refetchQueries(e = {}, t) {
        const n = {
            ...t,
            cancelRefetch: (t == null ? void 0 : t.cancelRefetch) ?? !0,
          },
          r = Ze.batch(() =>
            R(this, Oe)
              .findAll(e)
              .filter((i) => !i.isDisabled())
              .map((i) => {
                let o = i.fetch(void 0, n);
                return (
                  n.throwOnError || (o = o.catch(Vt)),
                  i.state.fetchStatus === "paused" ? Promise.resolve() : o
                );
              }),
          );
        return Promise.all(r).then(Vt);
      }
      fetchQuery(e) {
        const t = this.defaultQueryOptions(e);
        t.retry === void 0 && (t.retry = !1);
        const n = R(this, Oe).build(this, t);
        return n.isStaleByTime(no(t.staleTime, n))
          ? n.fetch(t)
          : Promise.resolve(n.state.data);
      }
      prefetchQuery(e) {
        return this.fetchQuery(e).then(Vt).catch(Vt);
      }
      fetchInfiniteQuery(e) {
        return ((e.behavior = _m(e.pages)), this.fetchQuery(e));
      }
      prefetchInfiniteQuery(e) {
        return this.fetchInfiniteQuery(e).then(Vt).catch(Vt);
      }
      ensureInfiniteQueryData(e) {
        return ((e.behavior = _m(e.pages)), this.ensureQueryData(e));
      }
      resumePausedMutations() {
        return Al.isOnline()
          ? R(this, gr).resumePausedMutations()
          : Promise.resolve();
      }
      getQueryCache() {
        return R(this, Oe);
      }
      getMutationCache() {
        return R(this, gr);
      }
      getDefaultOptions() {
        return R(this, yr);
      }
      setDefaultOptions(e) {
        q(this, yr, e);
      }
      setQueryDefaults(e, t) {
        R(this, ho).set(Ws(e), { queryKey: e, defaultOptions: t });
      }
      getQueryDefaults(e) {
        const t = [...R(this, ho).values()];
        let n = {};
        return (
          t.forEach((r) => {
            Vs(e, r.queryKey) && (n = { ...n, ...r.defaultOptions });
          }),
          n
        );
      }
      setMutationDefaults(e, t) {
        R(this, mo).set(Ws(e), { mutationKey: e, defaultOptions: t });
      }
      getMutationDefaults(e) {
        const t = [...R(this, mo).values()];
        let n = {};
        return (
          t.forEach((r) => {
            Vs(e, r.mutationKey) && (n = { ...n, ...r.defaultOptions });
          }),
          n
        );
      }
      defaultQueryOptions(e) {
        if (e._defaulted) return e;
        const t = {
          ...R(this, yr).queries,
          ...this.getQueryDefaults(e.queryKey),
          ...e,
          _defaulted: !0,
        };
        return (
          t.queryHash || (t.queryHash = pp(t.queryKey, t)),
          t.refetchOnReconnect === void 0 &&
            (t.refetchOnReconnect = t.networkMode !== "always"),
          t.throwOnError === void 0 && (t.throwOnError = !!t.suspense),
          !t.networkMode && t.persister && (t.networkMode = "offlineFirst"),
          t.enabled !== !0 && t.queryFn === hp && (t.enabled = !1),
          t
        );
      }
      defaultMutationOptions(e) {
        return e != null && e._defaulted
          ? e
          : {
              ...R(this, yr).mutations,
              ...((e == null ? void 0 : e.mutationKey) &&
                this.getMutationDefaults(e.mutationKey)),
              ...e,
              _defaulted: !0,
            };
      }
      clear() {
        (R(this, Oe).clear(), R(this, gr).clear());
      }
    }),
    (Oe = new WeakMap()),
    (gr = new WeakMap()),
    (yr = new WeakMap()),
    (ho = new WeakMap()),
    (mo = new WeakMap()),
    (xr = new WeakMap()),
    (go = new WeakMap()),
    (yo = new WeakMap()),
    py),
  vt,
  pe,
  Js,
  dt,
  li,
  xo,
  vr,
  Sn,
  ea,
  vo,
  wo,
  ui,
  ci,
  wr,
  bo,
  xe,
  ls,
  Od,
  Dd,
  Ld,
  zd,
  Fd,
  Bd,
  $d,
  Gv,
  hy,
  Y2 =
    ((hy = class extends sa {
      constructor(t, n) {
        super();
        te(this, xe);
        te(this, vt);
        te(this, pe);
        te(this, Js);
        te(this, dt);
        te(this, li);
        te(this, xo);
        te(this, vr);
        te(this, Sn);
        te(this, ea);
        te(this, vo);
        te(this, wo);
        te(this, ui);
        te(this, ci);
        te(this, wr);
        te(this, bo, new Set());
        ((this.options = n),
          q(this, vt, t),
          q(this, Sn, null),
          q(this, vr, Id()),
          this.options.experimental_prefetchInRender ||
            R(this, vr).reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled",
              ),
            ),
          this.bindMethods(),
          this.setOptions(n));
      }
      bindMethods() {
        this.refetch = this.refetch.bind(this);
      }
      onSubscribe() {
        this.listeners.size === 1 &&
          (R(this, pe).addObserver(this),
          Mm(R(this, pe), this.options)
            ? fe(this, xe, ls).call(this)
            : this.updateResult(),
          fe(this, xe, zd).call(this));
      }
      onUnsubscribe() {
        this.hasListeners() || this.destroy();
      }
      shouldFetchOnReconnect() {
        return Ud(R(this, pe), this.options, this.options.refetchOnReconnect);
      }
      shouldFetchOnWindowFocus() {
        return Ud(R(this, pe), this.options, this.options.refetchOnWindowFocus);
      }
      destroy() {
        ((this.listeners = new Set()),
          fe(this, xe, Fd).call(this),
          fe(this, xe, Bd).call(this),
          R(this, pe).removeObserver(this));
      }
      setOptions(t, n) {
        const r = this.options,
          i = R(this, pe);
        if (
          ((this.options = R(this, vt).defaultQueryOptions(t)),
          this.options.enabled !== void 0 &&
            typeof this.options.enabled != "boolean" &&
            typeof this.options.enabled != "function" &&
            typeof ln(this.options.enabled, R(this, pe)) != "boolean")
        )
          throw new Error(
            "Expected enabled to be a boolean or a callback that returns a boolean",
          );
        (fe(this, xe, $d).call(this),
          R(this, pe).setOptions(this.options),
          r._defaulted &&
            !Md(this.options, r) &&
            R(this, vt)
              .getQueryCache()
              .notify({
                type: "observerOptionsUpdated",
                query: R(this, pe),
                observer: this,
              }));
        const o = this.hasListeners();
        (o &&
          Tm(R(this, pe), i, this.options, r) &&
          fe(this, xe, ls).call(this),
          this.updateResult(n),
          o &&
            (R(this, pe) !== i ||
              ln(this.options.enabled, R(this, pe)) !==
                ln(r.enabled, R(this, pe)) ||
              no(this.options.staleTime, R(this, pe)) !==
                no(r.staleTime, R(this, pe))) &&
            fe(this, xe, Od).call(this));
        const s = fe(this, xe, Dd).call(this);
        o &&
          (R(this, pe) !== i ||
            ln(this.options.enabled, R(this, pe)) !==
              ln(r.enabled, R(this, pe)) ||
            s !== R(this, wr)) &&
          fe(this, xe, Ld).call(this, s);
      }
      getOptimisticResult(t) {
        const n = R(this, vt).getQueryCache().build(R(this, vt), t),
          r = this.createResult(n, t);
        return (
          Z2(this, r) &&
            (q(this, dt, r),
            q(this, xo, this.options),
            q(this, li, R(this, pe).state)),
          r
        );
      }
      getCurrentResult() {
        return R(this, dt);
      }
      trackResult(t, n) {
        const r = {};
        return (
          Object.keys(t).forEach((i) => {
            Object.defineProperty(r, i, {
              configurable: !1,
              enumerable: !0,
              get: () => (this.trackProp(i), n == null || n(i), t[i]),
            });
          }),
          r
        );
      }
      trackProp(t) {
        R(this, bo).add(t);
      }
      getCurrentQuery() {
        return R(this, pe);
      }
      refetch({ ...t } = {}) {
        return this.fetch({ ...t });
      }
      fetchOptimistic(t) {
        const n = R(this, vt).defaultQueryOptions(t),
          r = R(this, vt).getQueryCache().build(R(this, vt), n);
        return r.fetch().then(() => this.createResult(r, n));
      }
      fetch(t) {
        return fe(this, xe, ls)
          .call(this, { ...t, cancelRefetch: t.cancelRefetch ?? !0 })
          .then(() => (this.updateResult(), R(this, dt)));
      }
      createResult(t, n) {
        var P;
        const r = R(this, pe),
          i = this.options,
          o = R(this, dt),
          s = R(this, li),
          a = R(this, xo),
          c = t !== r ? t.state : R(this, Js),
          { state: d } = t;
        let f = { ...d },
          h = !1,
          p;
        if (n._optimisticResults) {
          const T = this.hasListeners(),
            I = !T && Mm(t, n),
            D = T && Tm(t, r, n, i);
          ((I || D) && (f = { ...f, ...Kv(d.data, t.options) }),
            n._optimisticResults === "isRestoring" && (f.fetchStatus = "idle"));
        }
        let { error: v, errorUpdatedAt: g, status: b } = f;
        if (n.select && f.data !== void 0)
          if (
            o &&
            f.data === (s == null ? void 0 : s.data) &&
            n.select === R(this, ea)
          )
            p = R(this, vo);
          else
            try {
              (q(this, ea, n.select),
                (p = n.select(f.data)),
                (p = Ad(o == null ? void 0 : o.data, p, n)),
                q(this, vo, p),
                q(this, Sn, null));
            } catch (T) {
              q(this, Sn, T);
            }
        else p = f.data;
        if (n.placeholderData !== void 0 && p === void 0 && b === "pending") {
          let T;
          if (
            o != null &&
            o.isPlaceholderData &&
            n.placeholderData === (a == null ? void 0 : a.placeholderData)
          )
            T = o.data;
          else if (
            ((T =
              typeof n.placeholderData == "function"
                ? n.placeholderData(
                    (P = R(this, wo)) == null ? void 0 : P.state.data,
                    R(this, wo),
                  )
                : n.placeholderData),
            n.select && T !== void 0)
          )
            try {
              ((T = n.select(T)), q(this, Sn, null));
            } catch (I) {
              q(this, Sn, I);
            }
          T !== void 0 &&
            ((b = "success"),
            (p = Ad(o == null ? void 0 : o.data, T, n)),
            (h = !0));
        }
        R(this, Sn) &&
          ((v = R(this, Sn)),
          (p = R(this, vo)),
          (g = Date.now()),
          (b = "error"));
        const m = f.fetchStatus === "fetching",
          x = b === "pending",
          y = b === "error",
          k = x && m,
          N = p !== void 0,
          j = {
            status: b,
            fetchStatus: f.fetchStatus,
            isPending: x,
            isSuccess: b === "success",
            isError: y,
            isInitialLoading: k,
            isLoading: k,
            data: p,
            dataUpdatedAt: f.dataUpdatedAt,
            error: v,
            errorUpdatedAt: g,
            failureCount: f.fetchFailureCount,
            failureReason: f.fetchFailureReason,
            errorUpdateCount: f.errorUpdateCount,
            isFetched: f.dataUpdateCount > 0 || f.errorUpdateCount > 0,
            isFetchedAfterMount:
              f.dataUpdateCount > c.dataUpdateCount ||
              f.errorUpdateCount > c.errorUpdateCount,
            isFetching: m,
            isRefetching: m && !x,
            isLoadingError: y && !N,
            isPaused: f.fetchStatus === "paused",
            isPlaceholderData: h,
            isRefetchError: y && N,
            isStale: gp(t, n),
            refetch: this.refetch,
            promise: R(this, vr),
          };
        if (this.options.experimental_prefetchInRender) {
          const T = (O) => {
              j.status === "error"
                ? O.reject(j.error)
                : j.data !== void 0 && O.resolve(j.data);
            },
            I = () => {
              const O = q(this, vr, (j.promise = Id()));
              T(O);
            },
            D = R(this, vr);
          switch (D.status) {
            case "pending":
              t.queryHash === r.queryHash && T(D);
              break;
            case "fulfilled":
              (j.status === "error" || j.data !== D.value) && I();
              break;
            case "rejected":
              (j.status !== "error" || j.error !== D.reason) && I();
              break;
          }
        }
        return j;
      }
      updateResult(t) {
        const n = R(this, dt),
          r = this.createResult(R(this, pe), this.options);
        if (
          (q(this, li, R(this, pe).state),
          q(this, xo, this.options),
          R(this, li).data !== void 0 && q(this, wo, R(this, pe)),
          Md(r, n))
        )
          return;
        q(this, dt, r);
        const i = {},
          o = () => {
            if (!n) return !0;
            const { notifyOnChangeProps: s } = this.options,
              a = typeof s == "function" ? s() : s;
            if (a === "all" || (!a && !R(this, bo).size)) return !0;
            const u = new Set(a ?? R(this, bo));
            return (
              this.options.throwOnError && u.add("error"),
              Object.keys(R(this, dt)).some((c) => {
                const d = c;
                return R(this, dt)[d] !== n[d] && u.has(d);
              })
            );
          };
        ((t == null ? void 0 : t.listeners) !== !1 && o() && (i.listeners = !0),
          fe(this, xe, Gv).call(this, { ...i, ...t }));
      }
      onQueryUpdate() {
        (this.updateResult(),
          this.hasListeners() && fe(this, xe, zd).call(this));
      }
    }),
    (vt = new WeakMap()),
    (pe = new WeakMap()),
    (Js = new WeakMap()),
    (dt = new WeakMap()),
    (li = new WeakMap()),
    (xo = new WeakMap()),
    (vr = new WeakMap()),
    (Sn = new WeakMap()),
    (ea = new WeakMap()),
    (vo = new WeakMap()),
    (wo = new WeakMap()),
    (ui = new WeakMap()),
    (ci = new WeakMap()),
    (wr = new WeakMap()),
    (bo = new WeakMap()),
    (xe = new WeakSet()),
    (ls = function (t) {
      fe(this, xe, $d).call(this);
      let n = R(this, pe).fetch(this.options, t);
      return ((t != null && t.throwOnError) || (n = n.catch(Vt)), n);
    }),
    (Od = function () {
      fe(this, xe, Fd).call(this);
      const t = no(this.options.staleTime, R(this, pe));
      if (vi || R(this, dt).isStale || !Rd(t)) return;
      const r = $v(R(this, dt).dataUpdatedAt, t) + 1;
      q(
        this,
        ui,
        setTimeout(() => {
          R(this, dt).isStale || this.updateResult();
        }, r),
      );
    }),
    (Dd = function () {
      return (
        (typeof this.options.refetchInterval == "function"
          ? this.options.refetchInterval(R(this, pe))
          : this.options.refetchInterval) ?? !1
      );
    }),
    (Ld = function (t) {
      (fe(this, xe, Bd).call(this),
        q(this, wr, t),
        !(
          vi ||
          ln(this.options.enabled, R(this, pe)) === !1 ||
          !Rd(R(this, wr)) ||
          R(this, wr) === 0
        ) &&
          q(
            this,
            ci,
            setInterval(
              () => {
                (this.options.refetchIntervalInBackground || mp.isFocused()) &&
                  fe(this, xe, ls).call(this);
              },
              R(this, wr),
            ),
          ));
    }),
    (zd = function () {
      (fe(this, xe, Od).call(this),
        fe(this, xe, Ld).call(this, fe(this, xe, Dd).call(this)));
    }),
    (Fd = function () {
      R(this, ui) && (clearTimeout(R(this, ui)), q(this, ui, void 0));
    }),
    (Bd = function () {
      R(this, ci) && (clearInterval(R(this, ci)), q(this, ci, void 0));
    }),
    ($d = function () {
      const t = R(this, vt).getQueryCache().build(R(this, vt), this.options);
      if (t === R(this, pe)) return;
      const n = R(this, pe);
      (q(this, pe, t),
        q(this, Js, t.state),
        this.hasListeners() &&
          (n == null || n.removeObserver(this), t.addObserver(this)));
    }),
    (Gv = function (t) {
      Ze.batch(() => {
        (t.listeners &&
          this.listeners.forEach((n) => {
            n(R(this, dt));
          }),
          R(this, vt)
            .getQueryCache()
            .notify({ query: R(this, pe), type: "observerResultsUpdated" }));
      });
    }),
    hy);
function X2(e, t) {
  return (
    ln(t.enabled, e) !== !1 &&
    e.state.data === void 0 &&
    !(e.state.status === "error" && t.retryOnMount === !1)
  );
}
function Mm(e, t) {
  return X2(e, t) || (e.state.data !== void 0 && Ud(e, t, t.refetchOnMount));
}
function Ud(e, t, n) {
  if (ln(t.enabled, e) !== !1) {
    const r = typeof n == "function" ? n(e) : n;
    return r === "always" || (r !== !1 && gp(e, t));
  }
  return !1;
}
function Tm(e, t, n, r) {
  return (
    (e !== t || ln(r.enabled, e) === !1) &&
    (!n.suspense || e.state.status !== "error") &&
    gp(e, n)
  );
}
function gp(e, t) {
  return ln(t.enabled, e) !== !1 && e.isStaleByTime(no(t.staleTime, e));
}
function Z2(e, t) {
  return !Md(e.getCurrentResult(), t);
}
var Yv = w.createContext(void 0),
  lt = (e) => {
    const t = w.useContext(Yv);
    if (!t)
      throw new Error("No QueryClient set, use QueryClientProvider to set one");
    return t;
  },
  J2 = ({ client: e, children: t }) => (
    w.useEffect(
      () => (
        e.mount(),
        () => {
          e.unmount();
        }
      ),
      [e],
    ),
    l.jsx(Yv.Provider, { value: e, children: t })
  ),
  Xv = w.createContext(!1),
  eC = () => w.useContext(Xv);
Xv.Provider;
function tC() {
  let e = !1;
  return {
    clearReset: () => {
      e = !1;
    },
    reset: () => {
      e = !0;
    },
    isReset: () => e,
  };
}
var nC = w.createContext(tC()),
  rC = () => w.useContext(nC);
function iC(e, t) {
  return typeof e == "function" ? e(...t) : !!e;
}
function Am() {}
var oC = (e, t) => {
    (e.suspense || e.throwOnError || e.experimental_prefetchInRender) &&
      (t.isReset() || (e.retryOnMount = !1));
  },
  sC = (e) => {
    w.useEffect(() => {
      e.clearReset();
    }, [e]);
  },
  aC = ({ result: e, errorResetBoundary: t, throwOnError: n, query: r }) =>
    e.isError && !t.isReset() && !e.isFetching && r && iC(n, [e.error, r]),
  lC = (e) => {
    e.suspense &&
      (e.staleTime === void 0 && (e.staleTime = 1e3),
      typeof e.gcTime == "number" && (e.gcTime = Math.max(e.gcTime, 1e3)));
  },
  uC = (e, t) => e.isLoading && e.isFetching && !t,
  cC = (e, t) => (e == null ? void 0 : e.suspense) && t.isPending,
  Im = (e, t, n) =>
    t.fetchOptimistic(e).catch(() => {
      n.clearReset();
    });
function dC(e, t, n) {
  var d, f, h, p, v;
  const r = lt(),
    i = eC(),
    o = rC(),
    s = r.defaultQueryOptions(e);
  ((f =
    (d = r.getDefaultOptions().queries) == null
      ? void 0
      : d._experimental_beforeQuery) == null || f.call(d, s),
    (s._optimisticResults = i ? "isRestoring" : "optimistic"),
    lC(s),
    oC(s, o),
    sC(o));
  const a = !r.getQueryCache().get(s.queryHash),
    [u] = w.useState(() => new t(r, s)),
    c = u.getOptimisticResult(s);
  if (
    (w.useSyncExternalStore(
      w.useCallback(
        (g) => {
          const b = i ? Am : u.subscribe(Ze.batchCalls(g));
          return (u.updateResult(), b);
        },
        [u, i],
      ),
      () => u.getCurrentResult(),
      () => u.getCurrentResult(),
    ),
    w.useEffect(() => {
      u.setOptions(s, { listeners: !1 });
    }, [s, u]),
    cC(s, c))
  )
    throw Im(s, u, o);
  if (
    aC({
      result: c,
      errorResetBoundary: o,
      throwOnError: s.throwOnError,
      query: r.getQueryCache().get(s.queryHash),
    })
  )
    throw c.error;
  if (
    ((p =
      (h = r.getDefaultOptions().queries) == null
        ? void 0
        : h._experimental_afterQuery) == null || p.call(h, s, c),
    s.experimental_prefetchInRender && !vi && uC(c, i))
  ) {
    const g = a
      ? Im(s, u, o)
      : (v = r.getQueryCache().get(s.queryHash)) == null
        ? void 0
        : v.promise;
    g == null ||
      g.catch(Am).finally(() => {
        u.updateResult();
      });
  }
  return s.notifyOnChangeProps ? c : u.trackResult(c);
}
function Ge(e, t) {
  return dC(e, Y2);
}
var fC = (e) => {
    switch (e) {
      case "success":
        return mC;
      case "info":
        return yC;
      case "warning":
        return gC;
      case "error":
        return xC;
      default:
        return null;
    }
  },
  pC = Array(12).fill(0),
  hC = ({ visible: e, className: t }) =>
    B.createElement(
      "div",
      {
        className: ["sonner-loading-wrapper", t].filter(Boolean).join(" "),
        "data-visible": e,
      },
      B.createElement(
        "div",
        { className: "sonner-spinner" },
        pC.map((n, r) =>
          B.createElement("div", {
            className: "sonner-loading-bar",
            key: `spinner-bar-${r}`,
          }),
        ),
      ),
    ),
  mC = B.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    B.createElement("path", {
      fillRule: "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
      clipRule: "evenodd",
    }),
  ),
  gC = B.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    B.createElement("path", {
      fillRule: "evenodd",
      d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
      clipRule: "evenodd",
    }),
  ),
  yC = B.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    B.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
      clipRule: "evenodd",
    }),
  ),
  xC = B.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    B.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
      clipRule: "evenodd",
    }),
  ),
  vC = B.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    B.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
    B.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" }),
  ),
  wC = () => {
    let [e, t] = B.useState(document.hidden);
    return (
      B.useEffect(() => {
        let n = () => {
          t(document.hidden);
        };
        return (
          document.addEventListener("visibilitychange", n),
          () => window.removeEventListener("visibilitychange", n)
        );
      }, []),
      e
    );
  },
  Wd = 1,
  bC = class {
    constructor() {
      ((this.subscribe = (e) => (
        this.subscribers.push(e),
        () => {
          let t = this.subscribers.indexOf(e);
          this.subscribers.splice(t, 1);
        }
      )),
        (this.publish = (e) => {
          this.subscribers.forEach((t) => t(e));
        }),
        (this.addToast = (e) => {
          (this.publish(e), (this.toasts = [...this.toasts, e]));
        }),
        (this.create = (e) => {
          var t;
          let { message: n, ...r } = e,
            i =
              typeof (e == null ? void 0 : e.id) == "number" ||
              ((t = e.id) == null ? void 0 : t.length) > 0
                ? e.id
                : Wd++,
            o = this.toasts.find((a) => a.id === i),
            s = e.dismissible === void 0 ? !0 : e.dismissible;
          return (
            o
              ? (this.toasts = this.toasts.map((a) =>
                  a.id === i
                    ? (this.publish({ ...a, ...e, id: i, title: n }),
                      { ...a, ...e, id: i, dismissible: s, title: n })
                    : a,
                ))
              : this.addToast({ title: n, ...r, dismissible: s, id: i }),
            i
          );
        }),
        (this.dismiss = (e) => (
          e ||
            this.toasts.forEach((t) => {
              this.subscribers.forEach((n) => n({ id: t.id, dismiss: !0 }));
            }),
          this.subscribers.forEach((t) => t({ id: e, dismiss: !0 })),
          e
        )),
        (this.message = (e, t) => this.create({ ...t, message: e })),
        (this.error = (e, t) =>
          this.create({ ...t, message: e, type: "error" })),
        (this.success = (e, t) =>
          this.create({ ...t, type: "success", message: e })),
        (this.info = (e, t) => this.create({ ...t, type: "info", message: e })),
        (this.warning = (e, t) =>
          this.create({ ...t, type: "warning", message: e })),
        (this.loading = (e, t) =>
          this.create({ ...t, type: "loading", message: e })),
        (this.promise = (e, t) => {
          if (!t) return;
          let n;
          t.loading !== void 0 &&
            (n = this.create({
              ...t,
              promise: e,
              type: "loading",
              message: t.loading,
              description:
                typeof t.description != "function" ? t.description : void 0,
            }));
          let r = e instanceof Promise ? e : e(),
            i = n !== void 0,
            o,
            s = r
              .then(async (u) => {
                if (((o = ["resolve", u]), B.isValidElement(u)))
                  ((i = !1),
                    this.create({ id: n, type: "default", message: u }));
                else if (SC(u) && !u.ok) {
                  i = !1;
                  let c =
                      typeof t.error == "function"
                        ? await t.error(`HTTP error! status: ${u.status}`)
                        : t.error,
                    d =
                      typeof t.description == "function"
                        ? await t.description(`HTTP error! status: ${u.status}`)
                        : t.description;
                  this.create({
                    id: n,
                    type: "error",
                    message: c,
                    description: d,
                  });
                } else if (t.success !== void 0) {
                  i = !1;
                  let c =
                      typeof t.success == "function"
                        ? await t.success(u)
                        : t.success,
                    d =
                      typeof t.description == "function"
                        ? await t.description(u)
                        : t.description;
                  this.create({
                    id: n,
                    type: "success",
                    message: c,
                    description: d,
                  });
                }
              })
              .catch(async (u) => {
                if (((o = ["reject", u]), t.error !== void 0)) {
                  i = !1;
                  let c =
                      typeof t.error == "function" ? await t.error(u) : t.error,
                    d =
                      typeof t.description == "function"
                        ? await t.description(u)
                        : t.description;
                  this.create({
                    id: n,
                    type: "error",
                    message: c,
                    description: d,
                  });
                }
              })
              .finally(() => {
                var u;
                (i && (this.dismiss(n), (n = void 0)),
                  (u = t.finally) == null || u.call(t));
              }),
            a = () =>
              new Promise((u, c) =>
                s.then(() => (o[0] === "reject" ? c(o[1]) : u(o[1]))).catch(c),
              );
          return typeof n != "string" && typeof n != "number"
            ? { unwrap: a }
            : Object.assign(n, { unwrap: a });
        }),
        (this.custom = (e, t) => {
          let n = (t == null ? void 0 : t.id) || Wd++;
          return (this.create({ jsx: e(n), id: n, ...t }), n);
        }),
        (this.subscribers = []),
        (this.toasts = []));
    }
  },
  Mt = new bC(),
  kC = (e, t) => {
    let n = (t == null ? void 0 : t.id) || Wd++;
    return (Mt.addToast({ title: e, ...t, id: n }), n);
  },
  SC = (e) =>
    e &&
    typeof e == "object" &&
    "ok" in e &&
    typeof e.ok == "boolean" &&
    "status" in e &&
    typeof e.status == "number",
  CC = kC,
  NC = () => Mt.toasts,
  We = Object.assign(
    CC,
    {
      success: Mt.success,
      info: Mt.info,
      warning: Mt.warning,
      error: Mt.error,
      custom: Mt.custom,
      message: Mt.message,
      promise: Mt.promise,
      dismiss: Mt.dismiss,
      loading: Mt.loading,
    },
    { getHistory: NC },
  );
function EC(e, { insertAt: t } = {}) {
  if (typeof document > "u") return;
  let n = document.head || document.getElementsByTagName("head")[0],
    r = document.createElement("style");
  ((r.type = "text/css"),
    t === "top" && n.firstChild
      ? n.insertBefore(r, n.firstChild)
      : n.appendChild(r),
    r.styleSheet
      ? (r.styleSheet.cssText = e)
      : r.appendChild(document.createTextNode(e)));
}
EC(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999;transition:transform .4s ease}:where([data-sonner-toaster][data-lifted="true"]){transform:translateY(-10px)}@media (hover: none) and (pointer: coarse){:where([data-sonner-toaster][data-lifted="true"]){transform:none}}:where([data-sonner-toaster][data-x-position="right"]){right:max(var(--offset),env(safe-area-inset-right))}:where([data-sonner-toaster][data-x-position="left"]){left:max(var(--offset),env(safe-area-inset-left))}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:max(var(--offset),env(safe-area-inset-top))}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:max(var(--offset),env(safe-area-inset-bottom))}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast] [data-close-button]{background:var(--gray1)}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:0;right:0;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount, 0px));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation:swipe-out .2s ease-out forwards}@keyframes swipe-out{0%{transform:translateY(calc(var(--lift) * var(--offset) + var(--swipe-amount)));opacity:1}to{transform:translateY(calc(var(--lift) * var(--offset) + var(--swipe-amount) + var(--lift) * -100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;--mobile-offset: 16px;right:var(--mobile-offset);left:var(--mobile-offset);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset)}[data-sonner-toaster][data-y-position=bottom]{bottom:20px}[data-sonner-toaster][data-y-position=top]{top:20px}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset);right:var(--mobile-offset);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);
function Ta(e) {
  return e.label !== void 0;
}
var jC = 3,
  PC = "32px",
  Om = 4e3,
  _C = 356,
  RC = 14,
  MC = 20,
  TC = 200;
function AC(...e) {
  return e.filter(Boolean).join(" ");
}
var IC = (e) => {
  var t, n, r, i, o, s, a, u, c, d, f;
  let {
      invert: h,
      toast: p,
      unstyled: v,
      interacting: g,
      setHeights: b,
      visibleToasts: m,
      heights: x,
      index: y,
      toasts: k,
      expanded: N,
      removeToast: C,
      defaultRichColors: j,
      closeButton: P,
      style: T,
      cancelButtonStyle: I,
      actionButtonStyle: D,
      className: O = "",
      descriptionClassName: $ = "",
      duration: G,
      position: Q,
      gap: V,
      loadingIcon: Y,
      expandByDefault: A,
      classNames: _,
      icons: S,
      closeButtonAriaLabel: U = "Close toast",
      pauseWhenPageIsHidden: W,
      cn: E,
    } = e,
    [X, ge] = B.useState(!1),
    [oe, ae] = B.useState(!1),
    [He, Se] = B.useState(!1),
    [qe, Bt] = B.useState(!1),
    [Qr, hn] = B.useState(!1),
    [Ri, Kr] = B.useState(0),
    [Mi, Gr] = B.useState(0),
    Tn = B.useRef(p.duration || G || Om),
    An = B.useRef(null),
    mn = B.useRef(null),
    fa = y === 0,
    ju = y + 1 <= m,
    yt = p.type,
    tr = p.dismissible !== !1,
    Pu = p.className || "",
    _u = p.descriptionClassName || "",
    M = B.useMemo(() => x.findIndex((Z) => Z.toastId === p.id) || 0, [x, p.id]),
    F = B.useMemo(() => {
      var Z;
      return (Z = p.closeButton) != null ? Z : P;
    }, [p.closeButton, P]);
  B.useMemo(() => p.duration || G || Om, [p.duration, G]);
  let J = B.useRef(0),
    ee = B.useRef(0),
    Ye = B.useRef(0),
    ye = B.useRef(null),
    [nt, $t] = Q.split("-"),
    nr = B.useMemo(
      () => x.reduce((Z, ue, je) => (je >= M ? Z : Z + ue.height), 0),
      [x, M],
    ),
    rr = wC(),
    Yr = p.invert || h,
    Ti = yt === "loading";
  ((ee.current = B.useMemo(() => M * V + nr, [M, nr])),
    B.useEffect(() => {
      ge(!0);
    }, []),
    B.useEffect(() => {
      let Z = mn.current;
      if (Z) {
        let ue = Z.getBoundingClientRect().height;
        return (
          Gr(ue),
          b((je) => [
            { toastId: p.id, height: ue, position: p.position },
            ...je,
          ]),
          () => b((je) => je.filter((en) => en.toastId !== p.id))
        );
      }
    }, [b, p.id]),
    B.useLayoutEffect(() => {
      if (!X) return;
      let Z = mn.current,
        ue = Z.style.height;
      Z.style.height = "auto";
      let je = Z.getBoundingClientRect().height;
      ((Z.style.height = ue),
        Gr(je),
        b((en) =>
          en.find((gn) => gn.toastId === p.id)
            ? en.map((gn) => (gn.toastId === p.id ? { ...gn, height: je } : gn))
            : [{ toastId: p.id, height: je, position: p.position }, ...en],
        ));
    }, [X, p.title, p.description, b, p.id]));
  let Ut = B.useCallback(() => {
    (ae(!0),
      Kr(ee.current),
      b((Z) => Z.filter((ue) => ue.toastId !== p.id)),
      setTimeout(() => {
        C(p);
      }, TC));
  }, [p, C, b, ee]);
  (B.useEffect(() => {
    if (
      (p.promise && yt === "loading") ||
      p.duration === 1 / 0 ||
      p.type === "loading"
    )
      return;
    let Z;
    return (
      N || g || (W && rr)
        ? (() => {
            if (Ye.current < J.current) {
              let ue = new Date().getTime() - J.current;
              Tn.current = Tn.current - ue;
            }
            Ye.current = new Date().getTime();
          })()
        : Tn.current !== 1 / 0 &&
          ((J.current = new Date().getTime()),
          (Z = setTimeout(() => {
            var ue;
            ((ue = p.onAutoClose) == null || ue.call(p, p), Ut());
          }, Tn.current))),
      () => clearTimeout(Z)
    );
  }, [N, g, p, yt, W, rr, Ut]),
    B.useEffect(() => {
      p.delete && Ut();
    }, [Ut, p.delete]));
  function ut() {
    var Z, ue, je;
    return S != null && S.loading
      ? B.createElement(
          "div",
          {
            className: E(
              _ == null ? void 0 : _.loader,
              (Z = p == null ? void 0 : p.classNames) == null
                ? void 0
                : Z.loader,
              "sonner-loader",
            ),
            "data-visible": yt === "loading",
          },
          S.loading,
        )
      : Y
        ? B.createElement(
            "div",
            {
              className: E(
                _ == null ? void 0 : _.loader,
                (ue = p == null ? void 0 : p.classNames) == null
                  ? void 0
                  : ue.loader,
                "sonner-loader",
              ),
              "data-visible": yt === "loading",
            },
            Y,
          )
        : B.createElement(hC, {
            className: E(
              _ == null ? void 0 : _.loader,
              (je = p == null ? void 0 : p.classNames) == null
                ? void 0
                : je.loader,
            ),
            visible: yt === "loading",
          });
  }
  return B.createElement(
    "li",
    {
      tabIndex: 0,
      ref: mn,
      className: E(
        O,
        Pu,
        _ == null ? void 0 : _.toast,
        (t = p == null ? void 0 : p.classNames) == null ? void 0 : t.toast,
        _ == null ? void 0 : _.default,
        _ == null ? void 0 : _[yt],
        (n = p == null ? void 0 : p.classNames) == null ? void 0 : n[yt],
      ),
      "data-sonner-toast": "",
      "data-rich-colors": (r = p.richColors) != null ? r : j,
      "data-styled": !(p.jsx || p.unstyled || v),
      "data-mounted": X,
      "data-promise": !!p.promise,
      "data-swiped": Qr,
      "data-removed": oe,
      "data-visible": ju,
      "data-y-position": nt,
      "data-x-position": $t,
      "data-index": y,
      "data-front": fa,
      "data-swiping": He,
      "data-dismissible": tr,
      "data-type": yt,
      "data-invert": Yr,
      "data-swipe-out": qe,
      "data-expanded": !!(N || (A && X)),
      style: {
        "--index": y,
        "--toasts-before": y,
        "--z-index": k.length - y,
        "--offset": `${oe ? Ri : ee.current}px`,
        "--initial-height": A ? "auto" : `${Mi}px`,
        ...T,
        ...p.style,
      },
      onPointerDown: (Z) => {
        Ti ||
          !tr ||
          ((An.current = new Date()),
          Kr(ee.current),
          Z.target.setPointerCapture(Z.pointerId),
          Z.target.tagName !== "BUTTON" &&
            (Se(!0), (ye.current = { x: Z.clientX, y: Z.clientY })));
      },
      onPointerUp: () => {
        var Z, ue, je, en;
        if (qe || !tr) return;
        ye.current = null;
        let gn = Number(
            ((Z = mn.current) == null
              ? void 0
              : Z.style.getPropertyValue("--swipe-amount").replace("px", "")) ||
              0,
          ),
          Ru =
            new Date().getTime() -
            ((ue = An.current) == null ? void 0 : ue.getTime()),
          eb = Math.abs(gn) / Ru;
        if (Math.abs(gn) >= MC || eb > 0.11) {
          (Kr(ee.current),
            (je = p.onDismiss) == null || je.call(p, p),
            Ut(),
            Bt(!0),
            hn(!1));
          return;
        }
        ((en = mn.current) == null ||
          en.style.setProperty("--swipe-amount", "0px"),
          Se(!1));
      },
      onPointerMove: (Z) => {
        var ue, je, en;
        if (!ye.current || !tr) return;
        let gn = Z.clientY - ye.current.y,
          Ru =
            ((ue = window.getSelection()) == null
              ? void 0
              : ue.toString().length) > 0;
        (Number(
          ((je = mn.current) == null
            ? void 0
            : je.style.getPropertyValue("--swipe-amount").replace("px", "")) ||
            0,
        ) > 0 && hn(!0),
          !Ru &&
            ((en = mn.current) == null ||
              en.style.setProperty("--swipe-amount", `${Math.max(0, gn)}px`)));
      },
    },
    F && !p.jsx
      ? B.createElement(
          "button",
          {
            "aria-label": U,
            "data-disabled": Ti,
            "data-close-button": !0,
            onClick:
              Ti || !tr
                ? () => {}
                : () => {
                    var Z;
                    (Ut(), (Z = p.onDismiss) == null || Z.call(p, p));
                  },
            className: E(
              _ == null ? void 0 : _.closeButton,
              (i = p == null ? void 0 : p.classNames) == null
                ? void 0
                : i.closeButton,
            ),
          },
          (o = S == null ? void 0 : S.close) != null ? o : vC,
        )
      : null,
    p.jsx || B.isValidElement(p.title)
      ? p.jsx
        ? p.jsx
        : typeof p.title == "function"
          ? p.title()
          : p.title
      : B.createElement(
          B.Fragment,
          null,
          yt || p.icon || p.promise
            ? B.createElement(
                "div",
                {
                  "data-icon": "",
                  className: E(
                    _ == null ? void 0 : _.icon,
                    (s = p == null ? void 0 : p.classNames) == null
                      ? void 0
                      : s.icon,
                  ),
                },
                p.promise || (p.type === "loading" && !p.icon)
                  ? p.icon || ut()
                  : null,
                p.type !== "loading"
                  ? p.icon || (S == null ? void 0 : S[yt]) || fC(yt)
                  : null,
              )
            : null,
          B.createElement(
            "div",
            {
              "data-content": "",
              className: E(
                _ == null ? void 0 : _.content,
                (a = p == null ? void 0 : p.classNames) == null
                  ? void 0
                  : a.content,
              ),
            },
            B.createElement(
              "div",
              {
                "data-title": "",
                className: E(
                  _ == null ? void 0 : _.title,
                  (u = p == null ? void 0 : p.classNames) == null
                    ? void 0
                    : u.title,
                ),
              },
              typeof p.title == "function" ? p.title() : p.title,
            ),
            p.description
              ? B.createElement(
                  "div",
                  {
                    "data-description": "",
                    className: E(
                      $,
                      _u,
                      _ == null ? void 0 : _.description,
                      (c = p == null ? void 0 : p.classNames) == null
                        ? void 0
                        : c.description,
                    ),
                  },
                  typeof p.description == "function"
                    ? p.description()
                    : p.description,
                )
              : null,
          ),
          B.isValidElement(p.cancel)
            ? p.cancel
            : p.cancel && Ta(p.cancel)
              ? B.createElement(
                  "button",
                  {
                    "data-button": !0,
                    "data-cancel": !0,
                    style: p.cancelButtonStyle || I,
                    onClick: (Z) => {
                      var ue, je;
                      Ta(p.cancel) &&
                        tr &&
                        ((je = (ue = p.cancel).onClick) == null ||
                          je.call(ue, Z),
                        Ut());
                    },
                    className: E(
                      _ == null ? void 0 : _.cancelButton,
                      (d = p == null ? void 0 : p.classNames) == null
                        ? void 0
                        : d.cancelButton,
                    ),
                  },
                  p.cancel.label,
                )
              : null,
          B.isValidElement(p.action)
            ? p.action
            : p.action && Ta(p.action)
              ? B.createElement(
                  "button",
                  {
                    "data-button": !0,
                    "data-action": !0,
                    style: p.actionButtonStyle || D,
                    onClick: (Z) => {
                      var ue, je;
                      Ta(p.action) &&
                        ((je = (ue = p.action).onClick) == null ||
                          je.call(ue, Z),
                        !Z.defaultPrevented && Ut());
                    },
                    className: E(
                      _ == null ? void 0 : _.actionButton,
                      (f = p == null ? void 0 : p.classNames) == null
                        ? void 0
                        : f.actionButton,
                    ),
                  },
                  p.action.label,
                )
              : null,
        ),
  );
};
function Dm() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  let e = document.documentElement.getAttribute("dir");
  return e === "auto" || !e
    ? window.getComputedStyle(document.documentElement).direction
    : e;
}
var OC = w.forwardRef(function (e, t) {
  let {
      invert: n,
      position: r = "bottom-right",
      hotkey: i = ["altKey", "KeyT"],
      expand: o,
      closeButton: s,
      className: a,
      offset: u,
      theme: c = "light",
      richColors: d,
      duration: f,
      style: h,
      visibleToasts: p = jC,
      toastOptions: v,
      dir: g = Dm(),
      gap: b = RC,
      loadingIcon: m,
      icons: x,
      containerAriaLabel: y = "Notifications",
      pauseWhenPageIsHidden: k,
      cn: N = AC,
    } = e,
    [C, j] = B.useState([]),
    P = B.useMemo(
      () =>
        Array.from(
          new Set(
            [r].concat(C.filter((W) => W.position).map((W) => W.position)),
          ),
        ),
      [C, r],
    ),
    [T, I] = B.useState([]),
    [D, O] = B.useState(!1),
    [$, G] = B.useState(!1),
    [Q, V] = B.useState(
      c !== "system"
        ? c
        : typeof window < "u" &&
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
    ),
    Y = B.useRef(null),
    A = i.join("+").replace(/Key/g, "").replace(/Digit/g, ""),
    _ = B.useRef(null),
    S = B.useRef(!1),
    U = B.useCallback((W) => {
      j((E) => {
        var X;
        return (
          ((X = E.find((ge) => ge.id === W.id)) != null && X.delete) ||
            Mt.dismiss(W.id),
          E.filter(({ id: ge }) => ge !== W.id)
        );
      });
    }, []);
  return (
    B.useEffect(
      () =>
        Mt.subscribe((W) => {
          if (W.dismiss) {
            j((E) => E.map((X) => (X.id === W.id ? { ...X, delete: !0 } : X)));
            return;
          }
          setTimeout(() => {
            Pv.flushSync(() => {
              j((E) => {
                let X = E.findIndex((ge) => ge.id === W.id);
                return X !== -1
                  ? [...E.slice(0, X), { ...E[X], ...W }, ...E.slice(X + 1)]
                  : [W, ...E];
              });
            });
          });
        }),
      [],
    ),
    B.useEffect(() => {
      if (c !== "system") {
        V(c);
        return;
      }
      if (
        (c === "system" &&
          (window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? V("dark")
            : V("light")),
        typeof window > "u")
      )
        return;
      let W = window.matchMedia("(prefers-color-scheme: dark)");
      try {
        W.addEventListener("change", ({ matches: E }) => {
          V(E ? "dark" : "light");
        });
      } catch {
        W.addListener(({ matches: X }) => {
          try {
            V(X ? "dark" : "light");
          } catch (ge) {
            console.error(ge);
          }
        });
      }
    }, [c]),
    B.useEffect(() => {
      C.length <= 1 && O(!1);
    }, [C]),
    B.useEffect(() => {
      let W = (E) => {
        var X, ge;
        (i.every((oe) => E[oe] || E.code === oe) &&
          (O(!0), (X = Y.current) == null || X.focus()),
          E.code === "Escape" &&
            (document.activeElement === Y.current ||
              ((ge = Y.current) != null &&
                ge.contains(document.activeElement))) &&
            O(!1));
      };
      return (
        document.addEventListener("keydown", W),
        () => document.removeEventListener("keydown", W)
      );
    }, [i]),
    B.useEffect(() => {
      if (Y.current)
        return () => {
          _.current &&
            (_.current.focus({ preventScroll: !0 }),
            (_.current = null),
            (S.current = !1));
        };
    }, [Y.current]),
    B.createElement(
      "section",
      {
        "aria-label": `${y} ${A}`,
        tabIndex: -1,
        "aria-live": "polite",
        "aria-relevant": "additions text",
        "aria-atomic": "false",
      },
      P.map((W, E) => {
        var X;
        let [ge, oe] = W.split("-");
        return C.length
          ? B.createElement(
              "ol",
              {
                key: W,
                dir: g === "auto" ? Dm() : g,
                tabIndex: -1,
                ref: Y,
                className: a,
                "data-sonner-toaster": !0,
                "data-theme": Q,
                "data-y-position": ge,
                "data-lifted": D && C.length > 1 && !o,
                "data-x-position": oe,
                style: {
                  "--front-toast-height": `${((X = T[0]) == null ? void 0 : X.height) || 0}px`,
                  "--offset": typeof u == "number" ? `${u}px` : u || PC,
                  "--width": `${_C}px`,
                  "--gap": `${b}px`,
                  ...h,
                },
                onBlur: (ae) => {
                  S.current &&
                    !ae.currentTarget.contains(ae.relatedTarget) &&
                    ((S.current = !1),
                    _.current &&
                      (_.current.focus({ preventScroll: !0 }),
                      (_.current = null)));
                },
                onFocus: (ae) => {
                  (ae.target instanceof HTMLElement &&
                    ae.target.dataset.dismissible === "false") ||
                    S.current ||
                    ((S.current = !0), (_.current = ae.relatedTarget));
                },
                onMouseEnter: () => O(!0),
                onMouseMove: () => O(!0),
                onMouseLeave: () => {
                  $ || O(!1);
                },
                onPointerDown: (ae) => {
                  (ae.target instanceof HTMLElement &&
                    ae.target.dataset.dismissible === "false") ||
                    G(!0);
                },
                onPointerUp: () => G(!1),
              },
              C.filter(
                (ae) => (!ae.position && E === 0) || ae.position === W,
              ).map((ae, He) => {
                var Se, qe;
                return B.createElement(IC, {
                  key: ae.id,
                  icons: x,
                  index: He,
                  toast: ae,
                  defaultRichColors: d,
                  duration:
                    (Se = v == null ? void 0 : v.duration) != null ? Se : f,
                  className: v == null ? void 0 : v.className,
                  descriptionClassName:
                    v == null ? void 0 : v.descriptionClassName,
                  invert: n,
                  visibleToasts: p,
                  closeButton:
                    (qe = v == null ? void 0 : v.closeButton) != null ? qe : s,
                  interacting: $,
                  position: W,
                  style: v == null ? void 0 : v.style,
                  unstyled: v == null ? void 0 : v.unstyled,
                  classNames: v == null ? void 0 : v.classNames,
                  cancelButtonStyle: v == null ? void 0 : v.cancelButtonStyle,
                  actionButtonStyle: v == null ? void 0 : v.actionButtonStyle,
                  removeToast: U,
                  toasts: C.filter((Bt) => Bt.position == ae.position),
                  heights: T.filter((Bt) => Bt.position == ae.position),
                  setHeights: I,
                  expandByDefault: o,
                  gap: b,
                  loadingIcon: m,
                  expanded: D,
                  pauseWhenPageIsHidden: k,
                  cn: N,
                });
              }),
            )
          : null;
      }),
    )
  );
});
function le(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function (i) {
    if ((e == null || e(i), n === !1 || !i.defaultPrevented))
      return t == null ? void 0 : t(i);
  };
}
function DC(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function pu(...e) {
  return (t) => e.forEach((n) => DC(n, t));
}
function tt(...e) {
  return w.useCallback(pu(...e), e);
}
function LC(e, t) {
  const n = w.createContext(t),
    r = (o) => {
      const { children: s, ...a } = o,
        u = w.useMemo(() => a, Object.values(a));
      return l.jsx(n.Provider, { value: u, children: s });
    };
  r.displayName = e + "Provider";
  function i(o) {
    const s = w.useContext(n);
    if (s) return s;
    if (t !== void 0) return t;
    throw new Error(`\`${o}\` must be used within \`${e}\``);
  }
  return [r, i];
}
function yp(e, t = []) {
  let n = [];
  function r(o, s) {
    const a = w.createContext(s),
      u = n.length;
    n = [...n, s];
    const c = (f) => {
      var m;
      const { scope: h, children: p, ...v } = f,
        g = ((m = h == null ? void 0 : h[e]) == null ? void 0 : m[u]) || a,
        b = w.useMemo(() => v, Object.values(v));
      return l.jsx(g.Provider, { value: b, children: p });
    };
    c.displayName = o + "Provider";
    function d(f, h) {
      var g;
      const p = ((g = h == null ? void 0 : h[e]) == null ? void 0 : g[u]) || a,
        v = w.useContext(p);
      if (v) return v;
      if (s !== void 0) return s;
      throw new Error(`\`${f}\` must be used within \`${o}\``);
    }
    return [c, d];
  }
  const i = () => {
    const o = n.map((s) => w.createContext(s));
    return function (a) {
      const u = (a == null ? void 0 : a[e]) || o;
      return w.useMemo(() => ({ [`__scope${e}`]: { ...a, [e]: u } }), [a, u]);
    };
  };
  return ((i.scopeName = e), [r, zC(i, ...t)]);
}
function zC(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((i) => ({ useScope: i(), scopeName: i.scopeName }));
    return function (o) {
      const s = r.reduce((a, { useScope: u, scopeName: c }) => {
        const f = u(o)[`__scope${c}`];
        return { ...a, ...f };
      }, {});
      return w.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return ((n.scopeName = t.scopeName), n);
}
function fn(e) {
  const t = w.useRef(e);
  return (
    w.useEffect(() => {
      t.current = e;
    }),
    w.useMemo(
      () =>
        (...n) => {
          var r;
          return (r = t.current) == null ? void 0 : r.call(t, ...n);
        },
      [],
    )
  );
}
function xp({ prop: e, defaultProp: t, onChange: n = () => {} }) {
  const [r, i] = FC({ defaultProp: t, onChange: n }),
    o = e !== void 0,
    s = o ? e : r,
    a = fn(n),
    u = w.useCallback(
      (c) => {
        if (o) {
          const f = typeof c == "function" ? c(e) : c;
          f !== e && a(f);
        } else i(c);
      },
      [o, e, i, a],
    );
  return [s, u];
}
function FC({ defaultProp: e, onChange: t }) {
  const n = w.useState(e),
    [r] = n,
    i = w.useRef(r),
    o = fn(t);
  return (
    w.useEffect(() => {
      i.current !== r && (o(r), (i.current = r));
    }, [r, i, o]),
    n
  );
}
var Ro = w.forwardRef((e, t) => {
  const { children: n, ...r } = e,
    i = w.Children.toArray(n),
    o = i.find($C);
  if (o) {
    const s = o.props.children,
      a = i.map((u) =>
        u === o
          ? w.Children.count(s) > 1
            ? w.Children.only(null)
            : w.isValidElement(s)
              ? s.props.children
              : null
          : u,
      );
    return l.jsx(Vd, {
      ...r,
      ref: t,
      children: w.isValidElement(s) ? w.cloneElement(s, void 0, a) : null,
    });
  }
  return l.jsx(Vd, { ...r, ref: t, children: n });
});
Ro.displayName = "Slot";
var Vd = w.forwardRef((e, t) => {
  const { children: n, ...r } = e;
  if (w.isValidElement(n)) {
    const i = WC(n);
    return w.cloneElement(n, { ...UC(r, n.props), ref: t ? pu(t, i) : i });
  }
  return w.Children.count(n) > 1 ? w.Children.only(null) : null;
});
Vd.displayName = "SlotClone";
var BC = ({ children: e }) => l.jsx(l.Fragment, { children: e });
function $C(e) {
  return w.isValidElement(e) && e.type === BC;
}
function UC(e, t) {
  const n = { ...t };
  for (const r in t) {
    const i = e[r],
      o = t[r];
    /^on[A-Z]/.test(r)
      ? i && o
        ? (n[r] = (...a) => {
            (o(...a), i(...a));
          })
        : i && (n[r] = i)
      : r === "style"
        ? (n[r] = { ...i, ...o })
        : r === "className" && (n[r] = [i, o].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function WC(e) {
  var r, i;
  let t =
      (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null
        ? void 0
        : r.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t =
        (i = Object.getOwnPropertyDescriptor(e, "ref")) == null
          ? void 0
          : i.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
var VC = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "span",
    "svg",
    "ul",
  ],
  $e = VC.reduce((e, t) => {
    const n = w.forwardRef((r, i) => {
      const { asChild: o, ...s } = r,
        a = o ? Ro : t;
      return (
        typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
        l.jsx(a, { ...s, ref: i })
      );
    });
    return ((n.displayName = `Primitive.${t}`), { ...e, [t]: n });
  }, {});
function Zv(e, t) {
  e && uu.flushSync(() => e.dispatchEvent(t));
}
function HC(e, t = []) {
  let n = [];
  function r(o, s) {
    const a = w.createContext(s),
      u = n.length;
    n = [...n, s];
    function c(f) {
      const { scope: h, children: p, ...v } = f,
        g = (h == null ? void 0 : h[e][u]) || a,
        b = w.useMemo(() => v, Object.values(v));
      return l.jsx(g.Provider, { value: b, children: p });
    }
    function d(f, h) {
      const p = (h == null ? void 0 : h[e][u]) || a,
        v = w.useContext(p);
      if (v) return v;
      if (s !== void 0) return s;
      throw new Error(`\`${f}\` must be used within \`${o}\``);
    }
    return ((c.displayName = o + "Provider"), [c, d]);
  }
  const i = () => {
    const o = n.map((s) => w.createContext(s));
    return function (a) {
      const u = (a == null ? void 0 : a[e]) || o;
      return w.useMemo(() => ({ [`__scope${e}`]: { ...a, [e]: u } }), [a, u]);
    };
  };
  return ((i.scopeName = e), [r, qC(i, ...t)]);
}
function qC(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((i) => ({ useScope: i(), scopeName: i.scopeName }));
    return function (o) {
      const s = r.reduce((a, { useScope: u, scopeName: c }) => {
        const f = u(o)[`__scope${c}`];
        return { ...a, ...f };
      }, {});
      return w.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return ((n.scopeName = t.scopeName), n);
}
function Jv(e) {
  const t = e + "CollectionProvider",
    [n, r] = HC(t),
    [i, o] = n(t, { collectionRef: { current: null }, itemMap: new Map() }),
    s = (p) => {
      const { scope: v, children: g } = p,
        b = B.useRef(null),
        m = B.useRef(new Map()).current;
      return l.jsx(i, { scope: v, itemMap: m, collectionRef: b, children: g });
    };
  s.displayName = t;
  const a = e + "CollectionSlot",
    u = B.forwardRef((p, v) => {
      const { scope: g, children: b } = p,
        m = o(a, g),
        x = tt(v, m.collectionRef);
      return l.jsx(Ro, { ref: x, children: b });
    });
  u.displayName = a;
  const c = e + "CollectionItemSlot",
    d = "data-radix-collection-item",
    f = B.forwardRef((p, v) => {
      const { scope: g, children: b, ...m } = p,
        x = B.useRef(null),
        y = tt(v, x),
        k = o(c, g);
      return (
        B.useEffect(
          () => (
            k.itemMap.set(x, { ref: x, ...m }),
            () => void k.itemMap.delete(x)
          ),
        ),
        l.jsx(Ro, { [d]: "", ref: y, children: b })
      );
    });
  f.displayName = c;
  function h(p) {
    const v = o(e + "CollectionConsumer", p);
    return B.useCallback(() => {
      const b = v.collectionRef.current;
      if (!b) return [];
      const m = Array.from(b.querySelectorAll(`[${d}]`));
      return Array.from(v.itemMap.values()).sort(
        (k, N) => m.indexOf(k.ref.current) - m.indexOf(N.ref.current),
      );
    }, [v.collectionRef, v.itemMap]);
  }
  return [{ Provider: s, Slot: u, ItemSlot: f }, h, r];
}
var QC = w.createContext(void 0);
function e0(e) {
  const t = w.useContext(QC);
  return e || t || "ltr";
}
function KC(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = fn(e);
  w.useEffect(() => {
    const r = (i) => {
      i.key === "Escape" && n(i);
    };
    return (
      t.addEventListener("keydown", r, { capture: !0 }),
      () => t.removeEventListener("keydown", r, { capture: !0 })
    );
  }, [n, t]);
}
var GC = "DismissableLayer",
  Hd = "dismissableLayer.update",
  YC = "dismissableLayer.pointerDownOutside",
  XC = "dismissableLayer.focusOutside",
  Lm,
  t0 = w.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  vp = w.forwardRef((e, t) => {
    const {
        disableOutsidePointerEvents: n = !1,
        onEscapeKeyDown: r,
        onPointerDownOutside: i,
        onFocusOutside: o,
        onInteractOutside: s,
        onDismiss: a,
        ...u
      } = e,
      c = w.useContext(t0),
      [d, f] = w.useState(null),
      h =
        (d == null ? void 0 : d.ownerDocument) ??
        (globalThis == null ? void 0 : globalThis.document),
      [, p] = w.useState({}),
      v = tt(t, (j) => f(j)),
      g = Array.from(c.layers),
      [b] = [...c.layersWithOutsidePointerEventsDisabled].slice(-1),
      m = g.indexOf(b),
      x = d ? g.indexOf(d) : -1,
      y = c.layersWithOutsidePointerEventsDisabled.size > 0,
      k = x >= m,
      N = eN((j) => {
        const P = j.target,
          T = [...c.branches].some((I) => I.contains(P));
        !k ||
          T ||
          (i == null || i(j),
          s == null || s(j),
          j.defaultPrevented || a == null || a());
      }, h),
      C = tN((j) => {
        const P = j.target;
        [...c.branches].some((I) => I.contains(P)) ||
          (o == null || o(j),
          s == null || s(j),
          j.defaultPrevented || a == null || a());
      }, h);
    return (
      KC((j) => {
        x === c.layers.size - 1 &&
          (r == null || r(j),
          !j.defaultPrevented && a && (j.preventDefault(), a()));
      }, h),
      w.useEffect(() => {
        if (d)
          return (
            n &&
              (c.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((Lm = h.body.style.pointerEvents),
                (h.body.style.pointerEvents = "none")),
              c.layersWithOutsidePointerEventsDisabled.add(d)),
            c.layers.add(d),
            zm(),
            () => {
              n &&
                c.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (h.body.style.pointerEvents = Lm);
            }
          );
      }, [d, h, n, c]),
      w.useEffect(
        () => () => {
          d &&
            (c.layers.delete(d),
            c.layersWithOutsidePointerEventsDisabled.delete(d),
            zm());
        },
        [d, c],
      ),
      w.useEffect(() => {
        const j = () => p({});
        return (
          document.addEventListener(Hd, j),
          () => document.removeEventListener(Hd, j)
        );
      }, []),
      l.jsx($e.div, {
        ...u,
        ref: v,
        style: {
          pointerEvents: y ? (k ? "auto" : "none") : void 0,
          ...e.style,
        },
        onFocusCapture: le(e.onFocusCapture, C.onFocusCapture),
        onBlurCapture: le(e.onBlurCapture, C.onBlurCapture),
        onPointerDownCapture: le(
          e.onPointerDownCapture,
          N.onPointerDownCapture,
        ),
      })
    );
  });
vp.displayName = GC;
var ZC = "DismissableLayerBranch",
  JC = w.forwardRef((e, t) => {
    const n = w.useContext(t0),
      r = w.useRef(null),
      i = tt(t, r);
    return (
      w.useEffect(() => {
        const o = r.current;
        if (o)
          return (
            n.branches.add(o),
            () => {
              n.branches.delete(o);
            }
          );
      }, [n.branches]),
      l.jsx($e.div, { ...e, ref: i })
    );
  });
JC.displayName = ZC;
function eN(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = fn(e),
    r = w.useRef(!1),
    i = w.useRef(() => {});
  return (
    w.useEffect(() => {
      const o = (a) => {
          if (a.target && !r.current) {
            let u = function () {
              n0(YC, n, c, { discrete: !0 });
            };
            const c = { originalEvent: a };
            a.pointerType === "touch"
              ? (t.removeEventListener("click", i.current),
                (i.current = u),
                t.addEventListener("click", i.current, { once: !0 }))
              : u();
          } else t.removeEventListener("click", i.current);
          r.current = !1;
        },
        s = window.setTimeout(() => {
          t.addEventListener("pointerdown", o);
        }, 0);
      return () => {
        (window.clearTimeout(s),
          t.removeEventListener("pointerdown", o),
          t.removeEventListener("click", i.current));
      };
    }, [t, n]),
    { onPointerDownCapture: () => (r.current = !0) }
  );
}
function tN(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = fn(e),
    r = w.useRef(!1);
  return (
    w.useEffect(() => {
      const i = (o) => {
        o.target &&
          !r.current &&
          n0(XC, n, { originalEvent: o }, { discrete: !1 });
      };
      return (
        t.addEventListener("focusin", i),
        () => t.removeEventListener("focusin", i)
      );
    }, [t, n]),
    {
      onFocusCapture: () => (r.current = !0),
      onBlurCapture: () => (r.current = !1),
    }
  );
}
function zm() {
  const e = new CustomEvent(Hd);
  document.dispatchEvent(e);
}
function n0(e, t, n, { discrete: r }) {
  const i = n.originalEvent.target,
    o = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  (t && i.addEventListener(e, t, { once: !0 }),
    r ? Zv(i, o) : i.dispatchEvent(o));
}
var ac = 0;
function r0() {
  w.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return (
      document.body.insertAdjacentElement("afterbegin", e[0] ?? Fm()),
      document.body.insertAdjacentElement("beforeend", e[1] ?? Fm()),
      ac++,
      () => {
        (ac === 1 &&
          document
            .querySelectorAll("[data-radix-focus-guard]")
            .forEach((t) => t.remove()),
          ac--);
      }
    );
  }, []);
}
function Fm() {
  const e = document.createElement("span");
  return (
    e.setAttribute("data-radix-focus-guard", ""),
    (e.tabIndex = 0),
    (e.style.outline = "none"),
    (e.style.opacity = "0"),
    (e.style.position = "fixed"),
    (e.style.pointerEvents = "none"),
    e
  );
}
var lc = "focusScope.autoFocusOnMount",
  uc = "focusScope.autoFocusOnUnmount",
  Bm = { bubbles: !1, cancelable: !0 },
  nN = "FocusScope",
  wp = w.forwardRef((e, t) => {
    const {
        loop: n = !1,
        trapped: r = !1,
        onMountAutoFocus: i,
        onUnmountAutoFocus: o,
        ...s
      } = e,
      [a, u] = w.useState(null),
      c = fn(i),
      d = fn(o),
      f = w.useRef(null),
      h = tt(t, (g) => u(g)),
      p = w.useRef({
        paused: !1,
        pause() {
          this.paused = !0;
        },
        resume() {
          this.paused = !1;
        },
      }).current;
    (w.useEffect(() => {
      if (r) {
        let g = function (y) {
            if (p.paused || !a) return;
            const k = y.target;
            a.contains(k) ? (f.current = k) : ur(f.current, { select: !0 });
          },
          b = function (y) {
            if (p.paused || !a) return;
            const k = y.relatedTarget;
            k !== null && (a.contains(k) || ur(f.current, { select: !0 }));
          },
          m = function (y) {
            if (document.activeElement === document.body)
              for (const N of y) N.removedNodes.length > 0 && ur(a);
          };
        (document.addEventListener("focusin", g),
          document.addEventListener("focusout", b));
        const x = new MutationObserver(m);
        return (
          a && x.observe(a, { childList: !0, subtree: !0 }),
          () => {
            (document.removeEventListener("focusin", g),
              document.removeEventListener("focusout", b),
              x.disconnect());
          }
        );
      }
    }, [r, a, p.paused]),
      w.useEffect(() => {
        if (a) {
          Um.add(p);
          const g = document.activeElement;
          if (!a.contains(g)) {
            const m = new CustomEvent(lc, Bm);
            (a.addEventListener(lc, c),
              a.dispatchEvent(m),
              m.defaultPrevented ||
                (rN(lN(i0(a)), { select: !0 }),
                document.activeElement === g && ur(a)));
          }
          return () => {
            (a.removeEventListener(lc, c),
              setTimeout(() => {
                const m = new CustomEvent(uc, Bm);
                (a.addEventListener(uc, d),
                  a.dispatchEvent(m),
                  m.defaultPrevented || ur(g ?? document.body, { select: !0 }),
                  a.removeEventListener(uc, d),
                  Um.remove(p));
              }, 0));
          };
        }
      }, [a, c, d, p]));
    const v = w.useCallback(
      (g) => {
        if ((!n && !r) || p.paused) return;
        const b = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey,
          m = document.activeElement;
        if (b && m) {
          const x = g.currentTarget,
            [y, k] = iN(x);
          y && k
            ? !g.shiftKey && m === k
              ? (g.preventDefault(), n && ur(y, { select: !0 }))
              : g.shiftKey &&
                m === y &&
                (g.preventDefault(), n && ur(k, { select: !0 }))
            : m === x && g.preventDefault();
        }
      },
      [n, r, p.paused],
    );
    return l.jsx($e.div, { tabIndex: -1, ...s, ref: h, onKeyDown: v });
  });
wp.displayName = nN;
function rN(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if ((ur(r, { select: t }), document.activeElement !== n)) return;
}
function iN(e) {
  const t = i0(e),
    n = $m(t, e),
    r = $m(t.reverse(), e);
  return [n, r];
}
function i0(e) {
  const t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (r) => {
        const i = r.tagName === "INPUT" && r.type === "hidden";
        return r.disabled || r.hidden || i
          ? NodeFilter.FILTER_SKIP
          : r.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; n.nextNode();) t.push(n.currentNode);
  return t;
}
function $m(e, t) {
  for (const n of e) if (!oN(n, { upTo: t })) return n;
}
function oN(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e;) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function sN(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function ur(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    (e.focus({ preventScroll: !0 }), e !== n && sN(e) && t && e.select());
  }
}
var Um = aN();
function aN() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      (t !== n && (n == null || n.pause()), (e = Wm(e, t)), e.unshift(t));
    },
    remove(t) {
      var n;
      ((e = Wm(e, t)), (n = e[0]) == null || n.resume());
    },
  };
}
function Wm(e, t) {
  const n = [...e],
    r = n.indexOf(t);
  return (r !== -1 && n.splice(r, 1), n);
}
function lN(e) {
  return e.filter((t) => t.tagName !== "A");
}
var wi =
    globalThis != null && globalThis.document ? w.useLayoutEffect : () => {},
  uN = Ny.useId || (() => {}),
  cN = 0;
function ro(e) {
  const [t, n] = w.useState(uN());
  return (
    wi(() => {
      n((r) => r ?? String(cN++));
    }, [e]),
    e || (t ? `radix-${t}` : "")
  );
}
const dN = ["top", "right", "bottom", "left"],
  Dr = Math.min,
  Wn = Math.max,
  Il = Math.round,
  Aa = Math.floor,
  Vn = (e) => ({ x: e, y: e }),
  fN = { left: "right", right: "left", bottom: "top", top: "bottom" };
function o0(e, t, n) {
  return Wn(e, Dr(t, n));
}
function Gn(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Lr(e) {
  return e.split("-")[0];
}
function zo(e) {
  return e.split("-")[1];
}
function bp(e) {
  return e === "x" ? "y" : "x";
}
function kp(e) {
  return e === "y" ? "height" : "width";
}
function jn(e) {
  const t = e[0];
  return t === "t" || t === "b" ? "y" : "x";
}
function Sp(e) {
  return bp(jn(e));
}
function pN(e, t, n) {
  n === void 0 && (n = !1);
  const r = zo(e),
    i = Sp(e),
    o = kp(i);
  let s =
    i === "x"
      ? r === (n ? "end" : "start")
        ? "right"
        : "left"
      : r === "start"
        ? "bottom"
        : "top";
  return (t.reference[o] > t.floating[o] && (s = Ol(s)), [s, Ol(s)]);
}
function hN(e) {
  const t = Ol(e);
  return [qd(e), t, qd(t)];
}
function qd(e) {
  return e.includes("start")
    ? e.replace("start", "end")
    : e.replace("end", "start");
}
const Vm = ["left", "right"],
  Hm = ["right", "left"],
  mN = ["top", "bottom"],
  gN = ["bottom", "top"];
function yN(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? (t ? Hm : Vm) : t ? Vm : Hm;
    case "left":
    case "right":
      return t ? mN : gN;
    default:
      return [];
  }
}
function xN(e, t, n, r) {
  const i = zo(e);
  let o = yN(Lr(e), n === "start", r);
  return (
    i && ((o = o.map((s) => s + "-" + i)), t && (o = o.concat(o.map(qd)))),
    o
  );
}
function Ol(e) {
  const t = Lr(e);
  return fN[t] + e.slice(t.length);
}
function vN(e) {
  var t, n, r, i;
  return {
    top: (t = e.top) != null ? t : 0,
    right: (n = e.right) != null ? n : 0,
    bottom: (r = e.bottom) != null ? r : 0,
    left: (i = e.left) != null ? i : 0,
  };
}
function s0(e) {
  return typeof e != "number"
    ? vN(e)
    : { top: e, right: e, bottom: e, left: e };
}
function Dl(e) {
  const { x: t, y: n, width: r, height: i } = e;
  return {
    width: r,
    height: i,
    top: n,
    left: t,
    right: t + r,
    bottom: n + i,
    x: t,
    y: n,
  };
}
function qm(e, t, n) {
  let { reference: r, floating: i } = e;
  const o = jn(t),
    s = Sp(t),
    a = kp(s),
    u = Lr(t),
    c = o === "y",
    d = r.x + r.width / 2 - i.width / 2,
    f = r.y + r.height / 2 - i.height / 2,
    h = r[a] / 2 - i[a] / 2;
  let p;
  switch (u) {
    case "top":
      p = { x: d, y: r.y - i.height };
      break;
    case "bottom":
      p = { x: d, y: r.y + r.height };
      break;
    case "right":
      p = { x: r.x + r.width, y: f };
      break;
    case "left":
      p = { x: r.x - i.width, y: f };
      break;
    default:
      p = { x: r.x, y: r.y };
  }
  const v = zo(t);
  return (v && (p[s] += h * (v === "end" ? 1 : -1) * (n && c ? -1 : 1)), p);
}
async function wN(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: r, y: i, platform: o, rects: s, elements: a, strategy: u } = e,
    {
      boundary: c = "clippingAncestors",
      rootBoundary: d = "viewport",
      elementContext: f = "floating",
      altBoundary: h = !1,
      padding: p = 0,
    } = Gn(t, e),
    v = s0(p),
    b = a[h ? (f === "floating" ? "reference" : "floating") : f],
    m = Dl(
      await o.getClippingRect({
        element:
          (n = await (o.isElement == null ? void 0 : o.isElement(b))) == null ||
          n
            ? b
            : b.contextElement ||
              (await (o.getDocumentElement == null
                ? void 0
                : o.getDocumentElement(a.floating))),
        boundary: c,
        rootBoundary: d,
        strategy: u,
      }),
    ),
    x =
      f === "floating"
        ? { x: r, y: i, width: s.floating.width, height: s.floating.height }
        : s.reference,
    y = await (o.getOffsetParent == null
      ? void 0
      : o.getOffsetParent(a.floating)),
    k = ((await (o.isElement == null ? void 0 : o.isElement(y))) &&
      (await (o.getScale == null ? void 0 : o.getScale(y)))) || { x: 1, y: 1 },
    N = Dl(
      o.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: a,
            rect: x,
            offsetParent: y,
            strategy: u,
          })
        : x,
    );
  return {
    top: (m.top - N.top + v.top) / k.y,
    bottom: (N.bottom - m.bottom + v.bottom) / k.y,
    left: (m.left - N.left + v.left) / k.x,
    right: (N.right - m.right + v.right) / k.x,
  };
}
const bN = 50,
  kN = async (e, t, n) => {
    const {
        placement: r = "bottom",
        strategy: i = "absolute",
        middleware: o = [],
        platform: s,
      } = n,
      a = s.detectOverflow ? s : { ...s, detectOverflow: wN },
      u = await (s.isRTL == null ? void 0 : s.isRTL(t));
    let c = await s.getElementRects({ reference: e, floating: t, strategy: i }),
      { x: d, y: f } = qm(c, r, u),
      h = r,
      p = 0;
    const v = {};
    for (let g = 0; g < o.length; g++) {
      const b = o[g];
      if (!b) continue;
      const { name: m, fn: x } = b,
        {
          x: y,
          y: k,
          data: N,
          reset: C,
        } = await x({
          x: d,
          y: f,
          initialPlacement: r,
          placement: h,
          strategy: i,
          middlewareData: v,
          rects: c,
          platform: a,
          elements: { reference: e, floating: t },
        });
      ((d = y ?? d),
        (f = k ?? f),
        (v[m] = { ...v[m], ...N }),
        C &&
          p < bN &&
          (p++,
          typeof C == "object" &&
            (C.placement && (h = C.placement),
            C.rects &&
              (c =
                C.rects === !0
                  ? await s.getElementRects({
                      reference: e,
                      floating: t,
                      strategy: i,
                    })
                  : C.rects),
            ({ x: d, y: f } = qm(c, h, u))),
          (g = -1)));
    }
    return { x: d, y: f, placement: h, strategy: i, middlewareData: v };
  },
  SN = (e) => ({
    name: "arrow",
    options: e,
    async fn(t) {
      const {
          x: n,
          y: r,
          placement: i,
          rects: o,
          platform: s,
          elements: a,
          middlewareData: u,
        } = t,
        { element: c, padding: d = 0 } = Gn(e, t) || {};
      if (c == null) return {};
      const f = s0(d),
        h = { x: n, y: r },
        p = Sp(i),
        v = kp(p),
        g = await s.getDimensions(c),
        b = p === "y",
        m = b ? "top" : "left",
        x = b ? "bottom" : "right",
        y = b ? "clientHeight" : "clientWidth",
        k = o.reference[v] + o.reference[p] - h[p] - o.floating[v],
        N = h[p] - o.reference[p],
        C = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(c));
      let j = C ? C[y] : 0;
      (!j || !(await (s.isElement == null ? void 0 : s.isElement(C)))) &&
        (j = a.floating[y] || o.floating[v]);
      const P = k / 2 - N / 2,
        T = j / 2 - g[v] / 2 - 1,
        I = Dr(f[m], T),
        D = Dr(f[x], T),
        O = j - g[v] - D,
        $ = j / 2 - g[v] / 2 + P,
        G = o0(I, $, O),
        Q =
          !u.arrow &&
          zo(i) != null &&
          $ !== G &&
          o.reference[v] / 2 - ($ < I ? I : D) - g[v] / 2 < 0,
        V = Q ? ($ < I ? $ - I : $ - O) : 0;
      return {
        [p]: h[p] + V,
        data: {
          [p]: G,
          centerOffset: $ - G - V,
          ...(Q && { alignmentOffset: V }),
        },
        reset: Q,
      };
    },
  }),
  CN = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "flip",
        options: e,
        async fn(t) {
          var n, r;
          const {
              placement: i,
              middlewareData: o,
              rects: s,
              initialPlacement: a,
              platform: u,
              elements: c,
            } = t,
            {
              mainAxis: d = !0,
              crossAxis: f = !0,
              fallbackPlacements: h,
              fallbackStrategy: p = "bestFit",
              fallbackAxisSideDirection: v = "none",
              flipAlignment: g = !0,
              ...b
            } = Gn(e, t);
          if ((n = o.arrow) != null && n.alignmentOffset) return {};
          const m = Lr(i),
            x = jn(a),
            y = Lr(a) === a,
            k = await (u.isRTL == null ? void 0 : u.isRTL(c.floating)),
            N = h || (y || !g ? [Ol(a)] : hN(a)),
            C = v !== "none";
          !h && C && N.push(...xN(a, g, v, k));
          const j = [a, ...N],
            P = await u.detectOverflow(t, b),
            T = [];
          let I = ((r = o.flip) == null ? void 0 : r.overflows) || [];
          if ((d && T.push(P[m]), f)) {
            const G = pN(i, s, k);
            T.push(P[G[0]], P[G[1]]);
          }
          if (
            ((I = [...I, { placement: i, overflows: T }]),
            !T.every((G) => G <= 0))
          ) {
            var D, O;
            const G = (((D = o.flip) == null ? void 0 : D.index) || 0) + 1,
              Q = j[G];
            if (
              Q &&
              (!(f === "alignment" ? x !== jn(Q) : !1) ||
                I.every((A) =>
                  jn(A.placement) === x ? A.overflows[0] > 0 : !0,
                ))
            )
              return {
                data: { index: G, overflows: I },
                reset: { placement: Q },
              };
            let V =
              (O = I.filter((Y) => Y.overflows[0] <= 0).sort(
                (Y, A) => Y.overflows[1] - A.overflows[1],
              )[0]) == null
                ? void 0
                : O.placement;
            if (!V)
              switch (p) {
                case "bestFit": {
                  var $;
                  const Y =
                    ($ = I.filter((A) => {
                      if (C) {
                        const _ = jn(A.placement);
                        return _ === x || _ === "y";
                      }
                      return !0;
                    })
                      .map((A) => [
                        A.placement,
                        A.overflows
                          .filter((_) => _ > 0)
                          .reduce((_, S) => _ + S, 0),
                      ])
                      .sort((A, _) => A[1] - _[1])[0]) == null
                      ? void 0
                      : $[0];
                  Y && (V = Y);
                  break;
                }
                case "initialPlacement":
                  V = a;
                  break;
              }
            if (i !== V) return { reset: { placement: V } };
          }
          return {};
        },
      }
    );
  };
function Qm(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width,
  };
}
function Km(e) {
  return dN.some((t) => e[t] >= 0);
}
const NN = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "hide",
        options: e,
        async fn(t) {
          const { rects: n, platform: r } = t,
            { strategy: i = "referenceHidden", ...o } = Gn(e, t);
          switch (i) {
            case "referenceHidden": {
              const s = await r.detectOverflow(t, {
                  ...o,
                  elementContext: "reference",
                }),
                a = Qm(s, n.reference);
              return {
                data: { referenceHiddenOffsets: a, referenceHidden: Km(a) },
              };
            }
            case "escaped": {
              const s = await r.detectOverflow(t, { ...o, altBoundary: !0 }),
                a = Qm(s, n.floating);
              return { data: { escapedOffsets: a, escaped: Km(a) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  a0 = new Set(["left", "top"]);
async function EN(e, t) {
  const { placement: n, platform: r, elements: i } = e,
    o = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)),
    s = Lr(n),
    a = zo(n),
    u = jn(n) === "y",
    c = a0.has(s) ? -1 : 1,
    d = o && u ? -1 : 1,
    f = Gn(t, e);
  let {
    mainAxis: h,
    crossAxis: p,
    alignmentAxis: v,
  } = typeof f == "number"
    ? { mainAxis: f, crossAxis: 0, alignmentAxis: null }
    : {
        mainAxis: f.mainAxis || 0,
        crossAxis: f.crossAxis || 0,
        alignmentAxis: f.alignmentAxis,
      };
  return (
    a && typeof v == "number" && (p = a === "end" ? v * -1 : v),
    u ? { x: p * d, y: h * c } : { x: h * c, y: p * d }
  );
}
const jN = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: "offset",
        options: e,
        async fn(t) {
          var n, r;
          const { x: i, y: o, placement: s, middlewareData: a } = t,
            u = await EN(t, e);
          return s === ((n = a.offset) == null ? void 0 : n.placement) &&
            (r = a.arrow) != null &&
            r.alignmentOffset
            ? {}
            : { x: i + u.x, y: o + u.y, data: { ...u, placement: s } };
        },
      }
    );
  },
  PN = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "shift",
        options: e,
        async fn(t) {
          const { x: n, y: r, placement: i, platform: o } = t,
            {
              mainAxis: s = !0,
              crossAxis: a = !1,
              limiter: u = {
                fn: (x) => {
                  let { x: y, y: k } = x;
                  return { x: y, y: k };
                },
              },
              ...c
            } = Gn(e, t),
            d = { x: n, y: r },
            f = await o.detectOverflow(t, c),
            h = jn(i),
            p = bp(h);
          let v = d[p],
            g = d[h];
          const b = (x, y) =>
            o0(
              y + f[x === "y" ? "top" : "left"],
              y,
              y - f[x === "y" ? "bottom" : "right"],
            );
          (s && (v = b(p, v)), a && (g = b(h, g)));
          const m = u.fn({ ...t, [p]: v, [h]: g });
          return {
            ...m,
            data: { x: m.x - n, y: m.y - r, enabled: { [p]: s, [h]: a } },
          };
        },
      }
    );
  },
  _N = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(t) {
          var n, r;
          const { x: i, y: o, placement: s, rects: a, middlewareData: u } = t,
            { offset: c = 0, mainAxis: d = !0, crossAxis: f = !0 } = Gn(e, t),
            h = { x: i, y: o },
            p = jn(s),
            v = bp(p);
          let g = h[v],
            b = h[p];
          const m = Gn(c, t),
            x =
              typeof m == "number"
                ? { mainAxis: m, crossAxis: 0 }
                : {
                    mainAxis: (n = m.mainAxis) != null ? n : 0,
                    crossAxis: (r = m.crossAxis) != null ? r : 0,
                  };
          if (d) {
            const N = v === "y" ? "height" : "width",
              C = a.reference[v] - a.floating[N] + x.mainAxis,
              j = a.reference[v] + a.reference[N] - x.mainAxis;
            g < C ? (g = C) : g > j && (g = j);
          }
          if (f) {
            var y, k;
            const N = v === "y" ? "width" : "height",
              C = a0.has(Lr(s)),
              j =
                a.reference[p] -
                a.floating[N] +
                ((C && ((y = u.offset) == null ? void 0 : y[p])) || 0) +
                (C ? 0 : x.crossAxis),
              P =
                a.reference[p] +
                a.reference[N] +
                (C ? 0 : ((k = u.offset) == null ? void 0 : k[p]) || 0) -
                (C ? x.crossAxis : 0);
            b < j ? (b = j) : b > P && (b = P);
          }
          return { [v]: g, [p]: b };
        },
      }
    );
  },
  RN = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "size",
        options: e,
        async fn(t) {
          const { placement: n, rects: r, platform: i, elements: o } = t,
            { apply: s = () => {}, ...a } = Gn(e, t),
            u = await i.detectOverflow(t, a),
            c = Lr(n),
            d = zo(n),
            f = jn(n) === "y",
            { width: h, height: p } = r.floating;
          let v, g;
          c === "top" || c === "bottom"
            ? ((v = c),
              (g =
                d ===
                ((await (i.isRTL == null ? void 0 : i.isRTL(o.floating)))
                  ? "start"
                  : "end")
                  ? "left"
                  : "right"))
            : ((g = c), (v = d === "end" ? "top" : "bottom"));
          const b = p - u.top - u.bottom,
            m = h - u.left - u.right,
            x = Dr(p - u[v], b),
            y = Dr(h - u[g], m),
            k = t.middlewareData.shift,
            N = !k;
          let C = x,
            j = y;
          (k != null && k.enabled.x && (j = m),
            k != null && k.enabled.y && (C = b),
            N &&
              !d &&
              (f
                ? (j = h - 2 * Wn(u.left, u.right))
                : (C = p - 2 * Wn(u.top, u.bottom))),
            await s({ ...t, availableWidth: j, availableHeight: C }));
          const P = await i.getDimensions(o.floating);
          return h !== P.width || p !== P.height
            ? { reset: { rects: !0 } }
            : {};
        },
      }
    );
  };
function hu() {
  return typeof window < "u";
}
function Fo(e) {
  return l0(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Et(e) {
  var t;
  return (
    (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) ||
    window
  );
}
function er(e) {
  var t;
  return (t = (l0(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : t.documentElement;
}
function l0(e) {
  return hu() ? e instanceof Node || e instanceof Et(e).Node : !1;
}
function Rn(e) {
  return hu() ? e instanceof Element || e instanceof Et(e).Element : !1;
}
function Wr(e) {
  return hu() ? e instanceof HTMLElement || e instanceof Et(e).HTMLElement : !1;
}
function Gm(e) {
  return !hu() || typeof ShadowRoot > "u"
    ? !1
    : e instanceof ShadowRoot || e instanceof Et(e).ShadowRoot;
}
function mu(e) {
  const { overflow: t, overflowX: n, overflowY: r, display: i } = Mn(e);
  return (
    /auto|scroll|overlay|hidden|clip/.test(t + r + n) &&
    i !== "inline" &&
    i !== "contents"
  );
}
function MN(e) {
  return /^(table|td|th)$/.test(Fo(e));
}
function gu(e) {
  try {
    if (e.matches(":popover-open")) return !0;
  } catch {}
  try {
    return e.matches(":modal");
  } catch {
    return !1;
  }
}
const TN = /transform|translate|scale|rotate|perspective|filter/,
  AN = /paint|layout|strict|content/,
  Xr = (e) => !!e && e !== "none";
let cc;
function Cp(e) {
  const t = Rn(e) ? Mn(e) : e;
  return (
    Xr(t.transform) ||
    Xr(t.translate) ||
    Xr(t.scale) ||
    Xr(t.rotate) ||
    Xr(t.perspective) ||
    (!Np() && (Xr(t.backdropFilter) || Xr(t.filter))) ||
    TN.test(t.willChange || "") ||
    AN.test(t.contain || "")
  );
}
function IN(e) {
  let t = bi(e);
  for (; Wr(t) && !Hs(t);) {
    if (Cp(t)) return t;
    if (gu(t)) return null;
    t = bi(t);
  }
  return null;
}
function Np() {
  return (
    cc == null &&
      (cc =
        typeof CSS < "u" &&
        CSS.supports &&
        CSS.supports("-webkit-backdrop-filter", "none")),
    cc
  );
}
function Hs(e) {
  return /^(html|body|#document)$/.test(Fo(e));
}
function Mn(e) {
  return Et(e).getComputedStyle(e);
}
function yu(e) {
  return Rn(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function bi(e) {
  if (Fo(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || (Gm(e) && e.host) || er(e);
  return Gm(t) ? t.host : t;
}
function u0(e) {
  const t = bi(e);
  return Hs(t) ? (e.ownerDocument || e).body : Wr(t) && mu(t) ? t : u0(t);
}
function qs(e, t, n) {
  var r;
  (t === void 0 && (t = []), n === void 0 && (n = !0));
  const i = u0(e),
    o = i === ((r = e.ownerDocument) == null ? void 0 : r.body),
    s = Et(i);
  if (o) {
    const a = Qd(s);
    return t.concat(
      s,
      s.visualViewport || [],
      mu(i) ? i : [],
      a && n ? qs(a) : [],
    );
  } else return t.concat(i, qs(i, [], n));
}
function Qd(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function c0(e) {
  const t = Mn(e);
  let n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0;
  const i = Wr(e),
    o = i ? e.offsetWidth : n,
    s = i ? e.offsetHeight : r,
    a = Il(n) !== o || Il(r) !== s;
  return (a && ((n = o), (r = s)), { width: n, height: r, $: a });
}
function Ep(e) {
  return Rn(e) ? e : e.contextElement;
}
function io(e) {
  const t = Ep(e);
  if (!Wr(t)) return Vn(1);
  const n = t.getBoundingClientRect(),
    { width: r, height: i, $: o } = c0(t);
  let s = (o ? Il(n.width) : n.width) / r,
    a = (o ? Il(n.height) : n.height) / i;
  return (
    (!s || !Number.isFinite(s)) && (s = 1),
    (!a || !Number.isFinite(a)) && (a = 1),
    { x: s, y: a }
  );
}
const ON = Vn(0);
function d0(e) {
  const t = Et(e);
  return !Np() || !t.visualViewport
    ? ON
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function DN(e, t, n) {
  return (t === void 0 && (t = !1), !!n && t && n === Et(e));
}
function ki(e, t, n, r) {
  (t === void 0 && (t = !1), n === void 0 && (n = !1));
  const i = e.getBoundingClientRect(),
    o = Ep(e);
  let s = Vn(1);
  t && (r ? Rn(r) && (s = io(r)) : (s = io(e)));
  const a = DN(o, n, r) ? d0(o) : Vn(0);
  let u = (i.left + a.x) / s.x,
    c = (i.top + a.y) / s.y,
    d = i.width / s.x,
    f = i.height / s.y;
  if (o && r) {
    const h = Et(o),
      p = Rn(r) ? Et(r) : r;
    let v = h,
      g = Qd(v);
    for (; g && p !== v;) {
      const b = io(g),
        m = g.getBoundingClientRect(),
        x = Mn(g),
        y = m.left + (g.clientLeft + parseFloat(x.paddingLeft)) * b.x,
        k = m.top + (g.clientTop + parseFloat(x.paddingTop)) * b.y;
      ((u *= b.x),
        (c *= b.y),
        (d *= b.x),
        (f *= b.y),
        (u += y),
        (c += k),
        (v = Et(g)),
        (g = Qd(v)));
    }
  }
  return Dl({ width: d, height: f, x: u, y: c });
}
function xu(e, t) {
  const n = yu(e).scrollLeft;
  return t ? t.left + n : ki(er(e)).left + n;
}
function f0(e, t) {
  const n = e.getBoundingClientRect(),
    r = n.left + t.scrollLeft - xu(e, n),
    i = n.top + t.scrollTop;
  return { x: r, y: i };
}
function LN(e) {
  let { elements: t, rect: n, offsetParent: r, strategy: i } = e;
  const o = i === "fixed",
    s = er(r),
    a = t ? gu(t.floating) : !1;
  if (r === s || (a && o)) return n;
  let u = { scrollLeft: 0, scrollTop: 0 },
    c = Vn(1);
  const d = Vn(0),
    f = Wr(r);
  if ((f || !o) && ((Fo(r) !== "body" || mu(s)) && (u = yu(r)), f)) {
    const p = ki(r);
    ((c = io(r)), (d.x = p.x + r.clientLeft), (d.y = p.y + r.clientTop));
  }
  const h = s && !f && !o ? f0(s, u) : Vn(0);
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - u.scrollLeft * c.x + d.x + h.x,
    y: n.y * c.y - u.scrollTop * c.y + d.y + h.y,
  };
}
function zN(e) {
  return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function FN(e) {
  const t = yu(e),
    n = e.ownerDocument.body,
    r = Wn(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth),
    i = Wn(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight);
  let o = -t.scrollLeft + xu(e);
  const s = -t.scrollTop;
  return (
    Mn(n).direction === "rtl" && (o += Wn(e.clientWidth, n.clientWidth) - r),
    { width: r, height: i, x: o, y: s }
  );
}
const BN = 25;
function $N(e, t, n) {
  n === void 0 && (n = "viewport");
  const r = n === "layoutViewport",
    i = Et(e),
    o = er(e),
    s = i.visualViewport;
  let a = o.clientWidth,
    u = o.clientHeight,
    c = 0,
    d = 0;
  if (s) {
    const h = !Np() || t === "fixed";
    r
      ? h || ((c = -s.offsetLeft), (d = -s.offsetTop))
      : ((a = s.width),
        (u = s.height),
        h && ((c = s.offsetLeft), (d = s.offsetTop)));
  }
  if (xu(o) <= 0) {
    const h = o.ownerDocument,
      p = h.body,
      v = getComputedStyle(p),
      g =
        (h.compatMode === "CSS1Compat" &&
          parseFloat(v.marginLeft) + parseFloat(v.marginRight)) ||
        0,
      b = Math.abs(o.clientWidth - p.clientWidth - g),
      m =
        getComputedStyle(o).scrollbarGutter === "stable both-edges" ? b / 2 : b;
    m <= BN && (a -= m);
  }
  return { width: a, height: u, x: c, y: d };
}
function UN(e, t) {
  const n = ki(e, !0, t === "fixed"),
    r = n.top + e.clientTop,
    i = n.left + e.clientLeft,
    o = io(e),
    s = e.clientWidth * o.x,
    a = e.clientHeight * o.y,
    u = i * o.x,
    c = r * o.y;
  return { width: s, height: a, x: u, y: c };
}
function Ym(e, t, n) {
  let r;
  if (t === "viewport" || t === "layoutViewport") r = $N(e, n, t);
  else if (t === "document") r = FN(er(e));
  else if (Rn(t)) r = UN(t, n);
  else {
    const i = d0(e);
    r = { x: t.x - i.x, y: t.y - i.y, width: t.width, height: t.height };
  }
  return Dl(r);
}
function WN(e, t) {
  const n = t.get(e);
  if (n) return n;
  let r = qs(e, [], !1).filter((a) => Rn(a) && Fo(a) !== "body"),
    i = null;
  const o = Mn(e).position === "fixed";
  let s = o ? bi(e) : e;
  for (; Rn(s) && !Hs(s);) {
    const a = Mn(s),
      u = Cp(s),
      c = i ? i.position : o ? "fixed" : "";
    (!u && (c === "fixed" || (c === "absolute" && a.position === "static"))
      ? (r = r.filter((f) => f !== s))
      : (i = a),
      (s = bi(s)));
  }
  return (t.set(e, r), r);
}
function VN(e) {
  let { element: t, boundary: n, rootBoundary: r, strategy: i } = e;
  const s = [
      ...(n === "clippingAncestors"
        ? gu(t)
          ? []
          : WN(t, this._c)
        : [].concat(n)),
      r,
    ],
    a = Ym(t, s[0], i);
  let u = a.top,
    c = a.right,
    d = a.bottom,
    f = a.left;
  for (let h = 1; h < s.length; h++) {
    const p = Ym(t, s[h], i);
    ((u = Wn(p.top, u)),
      (c = Dr(p.right, c)),
      (d = Dr(p.bottom, d)),
      (f = Wn(p.left, f)));
  }
  return { width: c - f, height: d - u, x: f, y: u };
}
function HN(e) {
  const { width: t, height: n } = c0(e);
  return { width: t, height: n };
}
function qN(e, t, n) {
  const r = Wr(t),
    i = er(t),
    o = n === "fixed",
    s = ki(e, !0, o, t);
  let a = { scrollLeft: 0, scrollTop: 0 };
  const u = Vn(0);
  if ((r || !o) && ((Fo(t) !== "body" || mu(i)) && (a = yu(t)), r)) {
    const h = ki(t, !0, o, t);
    ((u.x = h.x + t.clientLeft), (u.y = h.y + t.clientTop));
  }
  !r && i && (u.x = xu(i));
  const c = i && !r && !o ? f0(i, a) : Vn(0),
    d = s.left + a.scrollLeft - u.x - c.x,
    f = s.top + a.scrollTop - u.y - c.y;
  return { x: d, y: f, width: s.width, height: s.height };
}
function dc(e) {
  return Mn(e).position === "static";
}
function Xm(e, t) {
  if (!Wr(e) || Mn(e).position === "fixed") return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return (er(e) === n && (n = n.ownerDocument.body), n);
}
function p0(e, t) {
  const n = Et(e);
  if (gu(e)) return n;
  if (!Wr(e)) {
    let i = bi(e);
    for (; i && !Hs(i);) {
      if (Rn(i) && !dc(i)) return i;
      i = bi(i);
    }
    return n;
  }
  let r = Xm(e, t);
  for (; r && MN(r) && dc(r);) r = Xm(r, t);
  return r && Hs(r) && dc(r) && !Cp(r) ? n : r || IN(e) || n;
}
const QN = async function (e) {
  const t = this.getOffsetParent || p0,
    n = this.getDimensions,
    r = await n(e.floating);
  return {
    reference: qN(e.reference, await t(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: r.width, height: r.height },
  };
};
function KN(e) {
  return Mn(e).direction === "rtl";
}
const GN = {
  convertOffsetParentRelativeRectToViewportRelativeRect: LN,
  getDocumentElement: er,
  getClippingRect: VN,
  getOffsetParent: p0,
  getElementRects: QN,
  getClientRects: zN,
  getDimensions: HN,
  getScale: io,
  isElement: Rn,
  isRTL: KN,
};
function h0(e, t) {
  return (
    e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
  );
}
function YN(e, t, n) {
  let r = null,
    i;
  const o = er(e);
  function s() {
    var d;
    (clearTimeout(i), (d = r) == null || d.disconnect(), (r = null));
  }
  function a(d, f) {
    (d === void 0 && (d = !1), f === void 0 && (f = 1), s());
    const h = e.getBoundingClientRect(),
      { left: p, top: v, width: g, height: b } = h;
    if ((d || t(), !g || !b)) return;
    const m = Aa(v),
      x = Aa(o.clientWidth - (p + g)),
      y = Aa(o.clientHeight - (v + b)),
      k = Aa(p),
      C = {
        rootMargin: -m + "px " + -x + "px " + -y + "px " + -k + "px",
        threshold: Wn(0, Dr(1, f)) || 1,
      };
    let j = !0;
    function P(T) {
      const I = T[0].intersectionRatio;
      if (!h0(h, e.getBoundingClientRect())) return a();
      if (I !== f) {
        if (!j) return a();
        I
          ? a(!1, I)
          : (i = setTimeout(() => {
              a(!1, 1e-7);
            }, 1e3));
      }
      j = !1;
    }
    try {
      r = new IntersectionObserver(P, { ...C, root: o.ownerDocument });
    } catch {
      r = new IntersectionObserver(P, C);
    }
    r.observe(e);
  }
  const u = Et(e),
    c = () => a(n);
  return (
    u.addEventListener("resize", c),
    a(!0),
    () => {
      (u.removeEventListener("resize", c), s());
    }
  );
}
function XN(e, t, n, r) {
  r === void 0 && (r = {});
  const {
      ancestorScroll: i = !0,
      ancestorResize: o = !0,
      elementResize: s = typeof ResizeObserver == "function",
      layoutShift: a = typeof IntersectionObserver == "function",
      animationFrame: u = !1,
    } = r,
    c = Ep(e),
    d = i || o ? [...(c ? qs(c) : []), ...(t ? qs(t) : [])] : [];
  d.forEach((m) => {
    (i && m.addEventListener("scroll", n),
      o && m.addEventListener("resize", n));
  });
  const f = c && a ? YN(c, n, o) : null;
  let h = -1,
    p = null;
  s &&
    ((p = new ResizeObserver((m) => {
      let [x] = m;
      (x &&
        x.target === c &&
        p &&
        t &&
        (p.unobserve(t),
        cancelAnimationFrame(h),
        (h = requestAnimationFrame(() => {
          var y;
          (y = p) == null || y.observe(t);
        }))),
        n());
    })),
    c && !u && p.observe(c),
    t && p.observe(t));
  let v,
    g = u ? ki(e) : null;
  u && b();
  function b() {
    const m = ki(e);
    (g && !h0(g, m) && n(), (g = m), (v = requestAnimationFrame(b)));
  }
  return (
    n(),
    () => {
      var m;
      (d.forEach((x) => {
        (i && x.removeEventListener("scroll", n),
          o && x.removeEventListener("resize", n));
      }),
        f == null || f(),
        (m = p) == null || m.disconnect(),
        (p = null),
        u && cancelAnimationFrame(v));
    }
  );
}
const ZN = jN,
  JN = PN,
  eE = CN,
  tE = RN,
  nE = NN,
  Zm = SN,
  rE = _N,
  iE = (e, t, n) => {
    const r = new Map(),
      i = n ?? {},
      o = { ...GN, ...i.platform, _c: r };
    return kN(e, t, { ...i, platform: o });
  };
var oE = typeof document < "u",
  sE = function () {},
  nl = oE ? w.useLayoutEffect : sE;
function Ll(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (typeof e == "function" && e.toString() === t.toString()) return !0;
  let n, r, i;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1;
      for (r = n; r-- !== 0;) if (!Ll(e[r], t[r])) return !1;
      return !0;
    }
    if (((i = Object.keys(e)), (n = i.length), n !== Object.keys(t).length))
      return !1;
    for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
    for (r = n; r-- !== 0;) {
      const o = i[r];
      if (!(o === "_owner" && e.$$typeof) && !Ll(e[o], t[o])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function m0(e) {
  return typeof window > "u"
    ? 1
    : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Jm(e, t) {
  const n = m0(e);
  return Math.round(t * n) / n;
}
function fc(e) {
  const t = w.useRef(e);
  return (
    nl(() => {
      t.current = e;
    }),
    t
  );
}
function aE(e) {
  e === void 0 && (e = {});
  const {
      placement: t = "bottom",
      strategy: n = "absolute",
      middleware: r = [],
      platform: i,
      elements: { reference: o, floating: s } = {},
      transform: a = !0,
      whileElementsMounted: u,
      open: c,
    } = e,
    [d, f] = w.useState({
      x: 0,
      y: 0,
      strategy: n,
      placement: t,
      middlewareData: {},
      isPositioned: !1,
    }),
    [h, p] = w.useState(r);
  Ll(h, r) || p(r);
  const [v, g] = w.useState(null),
    [b, m] = w.useState(null),
    x = w.useCallback((A) => {
      A !== C.current && ((C.current = A), g(A));
    }, []),
    y = w.useCallback((A) => {
      A !== j.current && ((j.current = A), m(A));
    }, []),
    k = o || v,
    N = s || b,
    C = w.useRef(null),
    j = w.useRef(null),
    P = w.useRef(d),
    T = u != null,
    I = fc(u),
    D = fc(i),
    O = fc(c),
    $ = w.useCallback(() => {
      if (!C.current || !j.current) return;
      const A = { placement: t, strategy: n, middleware: h };
      (D.current && (A.platform = D.current),
        iE(C.current, j.current, A).then((_) => {
          const S = { ..._, isPositioned: O.current !== !1 };
          G.current &&
            !Ll(P.current, S) &&
            ((P.current = S),
            uu.flushSync(() => {
              f(S);
            }));
        }));
    }, [h, t, n, D, O]);
  nl(() => {
    c === !1 &&
      P.current.isPositioned &&
      ((P.current.isPositioned = !1), f((A) => ({ ...A, isPositioned: !1 })));
  }, [c]);
  const G = w.useRef(!1);
  (nl(
    () => (
      (G.current = !0),
      () => {
        G.current = !1;
      }
    ),
    [],
  ),
    nl(() => {
      if ((k && (C.current = k), N && (j.current = N), k && N)) {
        if (I.current) return I.current(k, N, $);
        $();
      }
    }, [k, N, $, I, T]));
  const Q = w.useMemo(
      () => ({ reference: C, floating: j, setReference: x, setFloating: y }),
      [x, y],
    ),
    V = w.useMemo(() => ({ reference: k, floating: N }), [k, N]),
    Y = w.useMemo(() => {
      const A = { position: n, left: 0, top: 0 };
      if (!V.floating) return A;
      const _ = Jm(V.floating, d.x),
        S = Jm(V.floating, d.y);
      return a
        ? {
            ...A,
            transform: "translate(" + _ + "px, " + S + "px)",
            ...(m0(V.floating) >= 1.5 && { willChange: "transform" }),
          }
        : { position: n, left: _, top: S };
    }, [n, a, V.floating, d.x, d.y]);
  return w.useMemo(
    () => ({ ...d, update: $, refs: Q, elements: V, floatingStyles: Y }),
    [d, $, Q, V, Y],
  );
}
const lE = (e) => {
    function t(n) {
      return {}.hasOwnProperty.call(n, "current");
    }
    return {
      name: "arrow",
      options: e,
      fn(n) {
        const { element: r, padding: i } = typeof e == "function" ? e(n) : e;
        return r && t(r)
          ? r.current != null
            ? Zm({ element: r.current, padding: i }).fn(n)
            : {}
          : r
            ? Zm({ element: r, padding: i }).fn(n)
            : {};
      },
    };
  },
  uE = (e, t) => {
    const n = ZN(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  cE = (e, t) => {
    const n = JN(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  dE = (e, t) => ({ fn: rE(e).fn, options: [e, t] }),
  fE = (e, t) => {
    const n = eE(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  pE = (e, t) => {
    const n = tE(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  hE = (e, t) => {
    const n = nE(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  mE = (e, t) => {
    const n = lE(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  };
var gE = "Arrow",
  g0 = w.forwardRef((e, t) => {
    const { children: n, width: r = 10, height: i = 5, ...o } = e;
    return l.jsx($e.svg, {
      ...o,
      ref: t,
      width: r,
      height: i,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : l.jsx("polygon", { points: "0,0 30,0 15,10" }),
    });
  });
g0.displayName = gE;
var yE = g0;
function xE(e, t = []) {
  let n = [];
  function r(o, s) {
    const a = w.createContext(s),
      u = n.length;
    n = [...n, s];
    function c(f) {
      const { scope: h, children: p, ...v } = f,
        g = (h == null ? void 0 : h[e][u]) || a,
        b = w.useMemo(() => v, Object.values(v));
      return l.jsx(g.Provider, { value: b, children: p });
    }
    function d(f, h) {
      const p = (h == null ? void 0 : h[e][u]) || a,
        v = w.useContext(p);
      if (v) return v;
      if (s !== void 0) return s;
      throw new Error(`\`${f}\` must be used within \`${o}\``);
    }
    return ((c.displayName = o + "Provider"), [c, d]);
  }
  const i = () => {
    const o = n.map((s) => w.createContext(s));
    return function (a) {
      const u = (a == null ? void 0 : a[e]) || o;
      return w.useMemo(() => ({ [`__scope${e}`]: { ...a, [e]: u } }), [a, u]);
    };
  };
  return ((i.scopeName = e), [r, vE(i, ...t)]);
}
function vE(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((i) => ({ useScope: i(), scopeName: i.scopeName }));
    return function (o) {
      const s = r.reduce((a, { useScope: u, scopeName: c }) => {
        const f = u(o)[`__scope${c}`];
        return { ...a, ...f };
      }, {});
      return w.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return ((n.scopeName = t.scopeName), n);
}
function wE(e) {
  const [t, n] = w.useState(void 0);
  return (
    wi(() => {
      if (e) {
        n({ width: e.offsetWidth, height: e.offsetHeight });
        const r = new ResizeObserver((i) => {
          if (!Array.isArray(i) || !i.length) return;
          const o = i[0];
          let s, a;
          if ("borderBoxSize" in o) {
            const u = o.borderBoxSize,
              c = Array.isArray(u) ? u[0] : u;
            ((s = c.inlineSize), (a = c.blockSize));
          } else ((s = e.offsetWidth), (a = e.offsetHeight));
          n({ width: s, height: a });
        });
        return (r.observe(e, { box: "border-box" }), () => r.unobserve(e));
      } else n(void 0);
    }, [e]),
    t
  );
}
var jp = "Popper",
  [y0, x0] = xE(jp),
  [bE, v0] = y0(jp),
  w0 = (e) => {
    const { __scopePopper: t, children: n } = e,
      [r, i] = w.useState(null);
    return l.jsx(bE, { scope: t, anchor: r, onAnchorChange: i, children: n });
  };
w0.displayName = jp;
var b0 = "PopperAnchor",
  k0 = w.forwardRef((e, t) => {
    const { __scopePopper: n, virtualRef: r, ...i } = e,
      o = v0(b0, n),
      s = w.useRef(null),
      a = tt(t, s);
    return (
      w.useEffect(() => {
        o.onAnchorChange((r == null ? void 0 : r.current) || s.current);
      }),
      r ? null : l.jsx($e.div, { ...i, ref: a })
    );
  });
k0.displayName = b0;
var Pp = "PopperContent",
  [kE, SE] = y0(Pp),
  S0 = w.forwardRef((e, t) => {
    var ae, He, Se, qe, Bt, Qr;
    const {
        __scopePopper: n,
        side: r = "bottom",
        sideOffset: i = 0,
        align: o = "center",
        alignOffset: s = 0,
        arrowPadding: a = 0,
        avoidCollisions: u = !0,
        collisionBoundary: c = [],
        collisionPadding: d = 0,
        sticky: f = "partial",
        hideWhenDetached: h = !1,
        updatePositionStrategy: p = "optimized",
        onPlaced: v,
        ...g
      } = e,
      b = v0(Pp, n),
      [m, x] = w.useState(null),
      y = tt(t, (hn) => x(hn)),
      [k, N] = w.useState(null),
      C = wE(k),
      j = (C == null ? void 0 : C.width) ?? 0,
      P = (C == null ? void 0 : C.height) ?? 0,
      T = r + (o !== "center" ? "-" + o : ""),
      I =
        typeof d == "number"
          ? d
          : { top: 0, right: 0, bottom: 0, left: 0, ...d },
      D = Array.isArray(c) ? c : [c],
      O = D.length > 0,
      $ = { padding: I, boundary: D.filter(NE), altBoundary: O },
      {
        refs: G,
        floatingStyles: Q,
        placement: V,
        isPositioned: Y,
        middlewareData: A,
      } = aE({
        strategy: "fixed",
        placement: T,
        whileElementsMounted: (...hn) =>
          XN(...hn, { animationFrame: p === "always" }),
        elements: { reference: b.anchor },
        middleware: [
          uE({ mainAxis: i + P, alignmentAxis: s }),
          u &&
            cE({
              mainAxis: !0,
              crossAxis: !1,
              limiter: f === "partial" ? dE() : void 0,
              ...$,
            }),
          u && fE({ ...$ }),
          pE({
            ...$,
            apply: ({
              elements: hn,
              rects: Ri,
              availableWidth: Kr,
              availableHeight: Mi,
            }) => {
              const { width: Gr, height: Tn } = Ri.reference,
                An = hn.floating.style;
              (An.setProperty("--radix-popper-available-width", `${Kr}px`),
                An.setProperty("--radix-popper-available-height", `${Mi}px`),
                An.setProperty("--radix-popper-anchor-width", `${Gr}px`),
                An.setProperty("--radix-popper-anchor-height", `${Tn}px`));
            },
          }),
          k && mE({ element: k, padding: a }),
          EE({ arrowWidth: j, arrowHeight: P }),
          h && hE({ strategy: "referenceHidden", ...$ }),
        ],
      }),
      [_, S] = E0(V),
      U = fn(v);
    wi(() => {
      Y && (U == null || U());
    }, [Y, U]);
    const W = (ae = A.arrow) == null ? void 0 : ae.x,
      E = (He = A.arrow) == null ? void 0 : He.y,
      X = ((Se = A.arrow) == null ? void 0 : Se.centerOffset) !== 0,
      [ge, oe] = w.useState();
    return (
      wi(() => {
        m && oe(window.getComputedStyle(m).zIndex);
      }, [m]),
      l.jsx("div", {
        ref: G.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...Q,
          transform: Y ? Q.transform : "translate(0, -200%)",
          minWidth: "max-content",
          zIndex: ge,
          "--radix-popper-transform-origin": [
            (qe = A.transformOrigin) == null ? void 0 : qe.x,
            (Bt = A.transformOrigin) == null ? void 0 : Bt.y,
          ].join(" "),
          ...(((Qr = A.hide) == null ? void 0 : Qr.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none",
          }),
        },
        dir: e.dir,
        children: l.jsx(kE, {
          scope: n,
          placedSide: _,
          onArrowChange: N,
          arrowX: W,
          arrowY: E,
          shouldHideArrow: X,
          children: l.jsx($e.div, {
            "data-side": _,
            "data-align": S,
            ...g,
            ref: y,
            style: { ...g.style, animation: Y ? void 0 : "none" },
          }),
        }),
      })
    );
  });
S0.displayName = Pp;
var C0 = "PopperArrow",
  CE = { top: "bottom", right: "left", bottom: "top", left: "right" },
  N0 = w.forwardRef(function (t, n) {
    const { __scopePopper: r, ...i } = t,
      o = SE(C0, r),
      s = CE[o.placedSide];
    return l.jsx("span", {
      ref: o.onArrowChange,
      style: {
        position: "absolute",
        left: o.arrowX,
        top: o.arrowY,
        [s]: 0,
        transformOrigin: {
          top: "",
          right: "0 0",
          bottom: "center 0",
          left: "100% 0",
        }[o.placedSide],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: "rotate(180deg)",
          left: "translateY(50%) rotate(-90deg) translateX(50%)",
        }[o.placedSide],
        visibility: o.shouldHideArrow ? "hidden" : void 0,
      },
      children: l.jsx(yE, {
        ...i,
        ref: n,
        style: { ...i.style, display: "block" },
      }),
    });
  });
N0.displayName = C0;
function NE(e) {
  return e !== null;
}
var EE = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var b, m, x;
    const { placement: n, rects: r, middlewareData: i } = t,
      s = ((b = i.arrow) == null ? void 0 : b.centerOffset) !== 0,
      a = s ? 0 : e.arrowWidth,
      u = s ? 0 : e.arrowHeight,
      [c, d] = E0(n),
      f = { start: "0%", center: "50%", end: "100%" }[d],
      h = (((m = i.arrow) == null ? void 0 : m.x) ?? 0) + a / 2,
      p = (((x = i.arrow) == null ? void 0 : x.y) ?? 0) + u / 2;
    let v = "",
      g = "";
    return (
      c === "bottom"
        ? ((v = s ? f : `${h}px`), (g = `${-u}px`))
        : c === "top"
          ? ((v = s ? f : `${h}px`), (g = `${r.floating.height + u}px`))
          : c === "right"
            ? ((v = `${-u}px`), (g = s ? f : `${p}px`))
            : c === "left" &&
              ((v = `${r.floating.width + u}px`), (g = s ? f : `${p}px`)),
      { data: { x: v, y: g } }
    );
  },
});
function E0(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var jE = w0,
  PE = k0,
  _E = S0,
  RE = N0,
  ME = "Portal",
  _p = w.forwardRef((e, t) => {
    var a;
    const { container: n, ...r } = e,
      [i, o] = w.useState(!1);
    wi(() => o(!0), []);
    const s =
      n ||
      (i &&
        ((a = globalThis == null ? void 0 : globalThis.document) == null
          ? void 0
          : a.body));
    return s ? Pv.createPortal(l.jsx($e.div, { ...r, ref: t }), s) : null;
  });
_p.displayName = ME;
function TE(e, t) {
  return w.useReducer((n, r) => t[n][r] ?? n, e);
}
var Vr = (e) => {
  const { present: t, children: n } = e,
    r = AE(t),
    i =
      typeof n == "function" ? n({ present: r.isPresent }) : w.Children.only(n),
    o = tt(r.ref, IE(i));
  return typeof n == "function" || r.isPresent
    ? w.cloneElement(i, { ref: o })
    : null;
};
Vr.displayName = "Presence";
function AE(e) {
  const [t, n] = w.useState(),
    r = w.useRef({}),
    i = w.useRef(e),
    o = w.useRef("none"),
    s = e ? "mounted" : "unmounted",
    [a, u] = TE(s, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    w.useEffect(() => {
      const c = Ia(r.current);
      o.current = a === "mounted" ? c : "none";
    }, [a]),
    wi(() => {
      const c = r.current,
        d = i.current;
      if (d !== e) {
        const h = o.current,
          p = Ia(c);
        (e
          ? u("MOUNT")
          : p === "none" || (c == null ? void 0 : c.display) === "none"
            ? u("UNMOUNT")
            : u(d && h !== p ? "ANIMATION_OUT" : "UNMOUNT"),
          (i.current = e));
      }
    }, [e, u]),
    wi(() => {
      if (t) {
        let c;
        const d = t.ownerDocument.defaultView ?? window,
          f = (p) => {
            const g = Ia(r.current).includes(p.animationName);
            if (p.target === t && g && (u("ANIMATION_END"), !i.current)) {
              const b = t.style.animationFillMode;
              ((t.style.animationFillMode = "forwards"),
                (c = d.setTimeout(() => {
                  t.style.animationFillMode === "forwards" &&
                    (t.style.animationFillMode = b);
                })));
            }
          },
          h = (p) => {
            p.target === t && (o.current = Ia(r.current));
          };
        return (
          t.addEventListener("animationstart", h),
          t.addEventListener("animationcancel", f),
          t.addEventListener("animationend", f),
          () => {
            (d.clearTimeout(c),
              t.removeEventListener("animationstart", h),
              t.removeEventListener("animationcancel", f),
              t.removeEventListener("animationend", f));
          }
        );
      } else u("ANIMATION_END");
    }, [t, u]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(a),
      ref: w.useCallback((c) => {
        (c && (r.current = getComputedStyle(c)), n(c));
      }, []),
    }
  );
}
function Ia(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function IE(e) {
  var r, i;
  let t =
      (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null
        ? void 0
        : r.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t =
        (i = Object.getOwnPropertyDescriptor(e, "ref")) == null
          ? void 0
          : i.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
function OE(e, t = []) {
  let n = [];
  function r(o, s) {
    const a = w.createContext(s),
      u = n.length;
    n = [...n, s];
    function c(f) {
      const { scope: h, children: p, ...v } = f,
        g = (h == null ? void 0 : h[e][u]) || a,
        b = w.useMemo(() => v, Object.values(v));
      return l.jsx(g.Provider, { value: b, children: p });
    }
    function d(f, h) {
      const p = (h == null ? void 0 : h[e][u]) || a,
        v = w.useContext(p);
      if (v) return v;
      if (s !== void 0) return s;
      throw new Error(`\`${f}\` must be used within \`${o}\``);
    }
    return ((c.displayName = o + "Provider"), [c, d]);
  }
  const i = () => {
    const o = n.map((s) => w.createContext(s));
    return function (a) {
      const u = (a == null ? void 0 : a[e]) || o;
      return w.useMemo(() => ({ [`__scope${e}`]: { ...a, [e]: u } }), [a, u]);
    };
  };
  return ((i.scopeName = e), [r, DE(i, ...t)]);
}
function DE(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((i) => ({ useScope: i(), scopeName: i.scopeName }));
    return function (o) {
      const s = r.reduce((a, { useScope: u, scopeName: c }) => {
        const f = u(o)[`__scope${c}`];
        return { ...a, ...f };
      }, {});
      return w.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return ((n.scopeName = t.scopeName), n);
}
var pc = "rovingFocusGroup.onEntryFocus",
  LE = { bubbles: !1, cancelable: !0 },
  vu = "RovingFocusGroup",
  [Kd, j0, zE] = Jv(vu),
  [FE, P0] = OE(vu, [zE]),
  [BE, $E] = FE(vu),
  _0 = w.forwardRef((e, t) =>
    l.jsx(Kd.Provider, {
      scope: e.__scopeRovingFocusGroup,
      children: l.jsx(Kd.Slot, {
        scope: e.__scopeRovingFocusGroup,
        children: l.jsx(UE, { ...e, ref: t }),
      }),
    }),
  );
_0.displayName = vu;
var UE = w.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: n,
        orientation: r,
        loop: i = !1,
        dir: o,
        currentTabStopId: s,
        defaultCurrentTabStopId: a,
        onCurrentTabStopIdChange: u,
        onEntryFocus: c,
        preventScrollOnEntryFocus: d = !1,
        ...f
      } = e,
      h = w.useRef(null),
      p = tt(t, h),
      v = e0(o),
      [g = null, b] = xp({ prop: s, defaultProp: a, onChange: u }),
      [m, x] = w.useState(!1),
      y = fn(c),
      k = j0(n),
      N = w.useRef(!1),
      [C, j] = w.useState(0);
    return (
      w.useEffect(() => {
        const P = h.current;
        if (P)
          return (
            P.addEventListener(pc, y),
            () => P.removeEventListener(pc, y)
          );
      }, [y]),
      l.jsx(BE, {
        scope: n,
        orientation: r,
        dir: v,
        loop: i,
        currentTabStopId: g,
        onItemFocus: w.useCallback((P) => b(P), [b]),
        onItemShiftTab: w.useCallback(() => x(!0), []),
        onFocusableItemAdd: w.useCallback(() => j((P) => P + 1), []),
        onFocusableItemRemove: w.useCallback(() => j((P) => P - 1), []),
        children: l.jsx($e.div, {
          tabIndex: m || C === 0 ? -1 : 0,
          "data-orientation": r,
          ...f,
          ref: p,
          style: { outline: "none", ...e.style },
          onMouseDown: le(e.onMouseDown, () => {
            N.current = !0;
          }),
          onFocus: le(e.onFocus, (P) => {
            const T = !N.current;
            if (P.target === P.currentTarget && T && !m) {
              const I = new CustomEvent(pc, LE);
              if ((P.currentTarget.dispatchEvent(I), !I.defaultPrevented)) {
                const D = k().filter((V) => V.focusable),
                  O = D.find((V) => V.active),
                  $ = D.find((V) => V.id === g),
                  Q = [O, $, ...D].filter(Boolean).map((V) => V.ref.current);
                T0(Q, d);
              }
            }
            N.current = !1;
          }),
          onBlur: le(e.onBlur, () => x(!1)),
        }),
      })
    );
  }),
  R0 = "RovingFocusGroupItem",
  M0 = w.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: n,
        focusable: r = !0,
        active: i = !1,
        tabStopId: o,
        ...s
      } = e,
      a = ro(),
      u = o || a,
      c = $E(R0, n),
      d = c.currentTabStopId === u,
      f = j0(n),
      { onFocusableItemAdd: h, onFocusableItemRemove: p } = c;
    return (
      w.useEffect(() => {
        if (r) return (h(), () => p());
      }, [r, h, p]),
      l.jsx(Kd.ItemSlot, {
        scope: n,
        id: u,
        focusable: r,
        active: i,
        children: l.jsx($e.span, {
          tabIndex: d ? 0 : -1,
          "data-orientation": c.orientation,
          ...s,
          ref: t,
          onMouseDown: le(e.onMouseDown, (v) => {
            r ? c.onItemFocus(u) : v.preventDefault();
          }),
          onFocus: le(e.onFocus, () => c.onItemFocus(u)),
          onKeyDown: le(e.onKeyDown, (v) => {
            if (v.key === "Tab" && v.shiftKey) {
              c.onItemShiftTab();
              return;
            }
            if (v.target !== v.currentTarget) return;
            const g = HE(v, c.orientation, c.dir);
            if (g !== void 0) {
              if (v.metaKey || v.ctrlKey || v.altKey || v.shiftKey) return;
              v.preventDefault();
              let m = f()
                .filter((x) => x.focusable)
                .map((x) => x.ref.current);
              if (g === "last") m.reverse();
              else if (g === "prev" || g === "next") {
                g === "prev" && m.reverse();
                const x = m.indexOf(v.currentTarget);
                m = c.loop ? qE(m, x + 1) : m.slice(x + 1);
              }
              setTimeout(() => T0(m));
            }
          }),
        }),
      })
    );
  });
M0.displayName = R0;
var WE = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last",
};
function VE(e, t) {
  return t !== "rtl"
    ? e
    : e === "ArrowLeft"
      ? "ArrowRight"
      : e === "ArrowRight"
        ? "ArrowLeft"
        : e;
}
function HE(e, t, n) {
  const r = VE(e.key, n);
  if (
    !(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) &&
    !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))
  )
    return WE[r];
}
function T0(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (
      r === n ||
      (r.focus({ preventScroll: t }), document.activeElement !== n)
    )
      return;
}
function qE(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var QE = _0,
  KE = M0,
  GE = function (e) {
    if (typeof document > "u") return null;
    var t = Array.isArray(e) ? e[0] : e;
    return t.ownerDocument.body;
  },
  Ii = new WeakMap(),
  Oa = new WeakMap(),
  Da = {},
  hc = 0,
  A0 = function (e) {
    return e && (e.host || A0(e.parentNode));
  },
  YE = function (e, t) {
    return t
      .map(function (n) {
        if (e.contains(n)) return n;
        var r = A0(n);
        return r && e.contains(r)
          ? r
          : (console.error(
              "aria-hidden",
              n,
              "in not contained inside",
              e,
              ". Doing nothing",
            ),
            null);
      })
      .filter(function (n) {
        return !!n;
      });
  },
  XE = function (e, t, n, r) {
    var i = YE(t, Array.isArray(e) ? e : [e]);
    Da[n] || (Da[n] = new WeakMap());
    var o = Da[n],
      s = [],
      a = new Set(),
      u = new Set(i),
      c = function (f) {
        !f || a.has(f) || (a.add(f), c(f.parentNode));
      };
    i.forEach(c);
    var d = function (f) {
      !f ||
        u.has(f) ||
        Array.prototype.forEach.call(f.children, function (h) {
          if (a.has(h)) d(h);
          else
            try {
              var p = h.getAttribute(r),
                v = p !== null && p !== "false",
                g = (Ii.get(h) || 0) + 1,
                b = (o.get(h) || 0) + 1;
              (Ii.set(h, g),
                o.set(h, b),
                s.push(h),
                g === 1 && v && Oa.set(h, !0),
                b === 1 && h.setAttribute(n, "true"),
                v || h.setAttribute(r, "true"));
            } catch (m) {
              console.error("aria-hidden: cannot operate on ", h, m);
            }
        });
    };
    return (
      d(t),
      a.clear(),
      hc++,
      function () {
        (s.forEach(function (f) {
          var h = Ii.get(f) - 1,
            p = o.get(f) - 1;
          (Ii.set(f, h),
            o.set(f, p),
            h || (Oa.has(f) || f.removeAttribute(r), Oa.delete(f)),
            p || f.removeAttribute(n));
        }),
          hc--,
          hc ||
            ((Ii = new WeakMap()),
            (Ii = new WeakMap()),
            (Oa = new WeakMap()),
            (Da = {})));
      }
    );
  },
  I0 = function (e, t, n) {
    n === void 0 && (n = "data-aria-hidden");
    var r = Array.from(Array.isArray(e) ? e : [e]),
      i = GE(e);
    return i
      ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))),
        XE(r, i, n, "aria-hidden"))
      : function () {
          return null;
        };
  },
  Nn = function () {
    return (
      (Nn =
        Object.assign ||
        function (t) {
          for (var n, r = 1, i = arguments.length; r < i; r++) {
            n = arguments[r];
            for (var o in n)
              Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
          }
          return t;
        }),
      Nn.apply(this, arguments)
    );
  };
function O0(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) &&
      t.indexOf(r) < 0 &&
      (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
        (n[r[i]] = e[r[i]]);
  return n;
}
function ZE(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = t.length, o; r < i; r++)
      (o || !(r in t)) &&
        (o || (o = Array.prototype.slice.call(t, 0, r)), (o[r] = t[r]));
  return e.concat(o || Array.prototype.slice.call(t));
}
var rl = "right-scroll-bar-position",
  il = "width-before-scroll-bar",
  JE = "with-scroll-bars-hidden",
  ej = "--removed-body-scroll-bar-size";
function mc(e, t) {
  return (typeof e == "function" ? e(t) : e && (e.current = t), e);
}
function tj(e, t) {
  var n = w.useState(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var i = n.value;
          i !== r && ((n.value = r), n.callback(r, i));
        },
      },
    };
  })[0];
  return ((n.callback = t), n.facade);
}
var nj = typeof window < "u" ? w.useLayoutEffect : w.useEffect,
  eg = new WeakMap();
function rj(e, t) {
  var n = tj(null, function (r) {
    return e.forEach(function (i) {
      return mc(i, r);
    });
  });
  return (
    nj(
      function () {
        var r = eg.get(n);
        if (r) {
          var i = new Set(r),
            o = new Set(e),
            s = n.current;
          (i.forEach(function (a) {
            o.has(a) || mc(a, null);
          }),
            o.forEach(function (a) {
              i.has(a) || mc(a, s);
            }));
        }
        eg.set(n, e);
      },
      [e],
    ),
    n
  );
}
function ij(e) {
  return e;
}
function oj(e, t) {
  t === void 0 && (t = ij);
  var n = [],
    r = !1,
    i = {
      read: function () {
        if (r)
          throw new Error(
            "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
          );
        return n.length ? n[n.length - 1] : e;
      },
      useMedium: function (o) {
        var s = t(o, r);
        return (
          n.push(s),
          function () {
            n = n.filter(function (a) {
              return a !== s;
            });
          }
        );
      },
      assignSyncMedium: function (o) {
        for (r = !0; n.length;) {
          var s = n;
          ((n = []), s.forEach(o));
        }
        n = {
          push: function (a) {
            return o(a);
          },
          filter: function () {
            return n;
          },
        };
      },
      assignMedium: function (o) {
        r = !0;
        var s = [];
        if (n.length) {
          var a = n;
          ((n = []), a.forEach(o), (s = n));
        }
        var u = function () {
            var d = s;
            ((s = []), d.forEach(o));
          },
          c = function () {
            return Promise.resolve().then(u);
          };
        (c(),
          (n = {
            push: function (d) {
              (s.push(d), c());
            },
            filter: function (d) {
              return ((s = s.filter(d)), n);
            },
          }));
      },
    };
  return i;
}
function sj(e) {
  e === void 0 && (e = {});
  var t = oj(null);
  return ((t.options = Nn({ async: !0, ssr: !1 }, e)), t);
}
var D0 = function (e) {
  var t = e.sideCar,
    n = O0(e, ["sideCar"]);
  if (!t)
    throw new Error(
      "Sidecar: please provide `sideCar` property to import the right car",
    );
  var r = t.read();
  if (!r) throw new Error("Sidecar medium not found");
  return w.createElement(r, Nn({}, n));
};
D0.isSideCarExport = !0;
function aj(e, t) {
  return (e.useMedium(t), D0);
}
var L0 = sj(),
  gc = function () {},
  wu = w.forwardRef(function (e, t) {
    var n = w.useRef(null),
      r = w.useState({
        onScrollCapture: gc,
        onWheelCapture: gc,
        onTouchMoveCapture: gc,
      }),
      i = r[0],
      o = r[1],
      s = e.forwardProps,
      a = e.children,
      u = e.className,
      c = e.removeScrollBar,
      d = e.enabled,
      f = e.shards,
      h = e.sideCar,
      p = e.noIsolation,
      v = e.inert,
      g = e.allowPinchZoom,
      b = e.as,
      m = b === void 0 ? "div" : b,
      x = e.gapMode,
      y = O0(e, [
        "forwardProps",
        "children",
        "className",
        "removeScrollBar",
        "enabled",
        "shards",
        "sideCar",
        "noIsolation",
        "inert",
        "allowPinchZoom",
        "as",
        "gapMode",
      ]),
      k = h,
      N = rj([n, t]),
      C = Nn(Nn({}, y), i);
    return w.createElement(
      w.Fragment,
      null,
      d &&
        w.createElement(k, {
          sideCar: L0,
          removeScrollBar: c,
          shards: f,
          noIsolation: p,
          inert: v,
          setCallbacks: o,
          allowPinchZoom: !!g,
          lockRef: n,
          gapMode: x,
        }),
      s
        ? w.cloneElement(w.Children.only(a), Nn(Nn({}, C), { ref: N }))
        : w.createElement(m, Nn({}, C, { className: u, ref: N }), a),
    );
  });
wu.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
wu.classNames = { fullWidth: il, zeroRight: rl };
var lj = function () {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function uj() {
  if (!document) return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = lj();
  return (t && e.setAttribute("nonce", t), e);
}
function cj(e, t) {
  e.styleSheet
    ? (e.styleSheet.cssText = t)
    : e.appendChild(document.createTextNode(t));
}
function dj(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var fj = function () {
    var e = 0,
      t = null;
    return {
      add: function (n) {
        (e == 0 && (t = uj()) && (cj(t, n), dj(t)), e++);
      },
      remove: function () {
        (e--,
          !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null)));
      },
    };
  },
  pj = function () {
    var e = fj();
    return function (t, n) {
      w.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove();
            }
          );
        },
        [t && n],
      );
    };
  },
  z0 = function () {
    var e = pj(),
      t = function (n) {
        var r = n.styles,
          i = n.dynamic;
        return (e(r, i), null);
      };
    return t;
  },
  hj = { left: 0, top: 0, right: 0, gap: 0 },
  yc = function (e) {
    return parseInt(e || "", 10) || 0;
  },
  mj = function (e) {
    var t = window.getComputedStyle(document.body),
      n = t[e === "padding" ? "paddingLeft" : "marginLeft"],
      r = t[e === "padding" ? "paddingTop" : "marginTop"],
      i = t[e === "padding" ? "paddingRight" : "marginRight"];
    return [yc(n), yc(r), yc(i)];
  },
  gj = function (e) {
    if ((e === void 0 && (e = "margin"), typeof window > "u")) return hj;
    var t = mj(e),
      n = document.documentElement.clientWidth,
      r = window.innerWidth;
    return {
      left: t[0],
      top: t[1],
      right: t[2],
      gap: Math.max(0, r - n + t[2] - t[0]),
    };
  },
  yj = z0(),
  oo = "data-scroll-locked",
  xj = function (e, t, n, r) {
    var i = e.left,
      o = e.top,
      s = e.right,
      a = e.gap;
    return (
      n === void 0 && (n = "margin"),
      `
  .`
        .concat(
          JE,
          ` {
   overflow: hidden `,
        )
        .concat(
          r,
          `;
   padding-right: `,
        )
        .concat(a, "px ")
        .concat(
          r,
          `;
  }
  body[`,
        )
        .concat(
          oo,
          `] {
    overflow: hidden `,
        )
        .concat(
          r,
          `;
    overscroll-behavior: contain;
    `,
        )
        .concat(
          [
            t && "position: relative ".concat(r, ";"),
            n === "margin" &&
              `
    padding-left: `
                .concat(
                  i,
                  `px;
    padding-top: `,
                )
                .concat(
                  o,
                  `px;
    padding-right: `,
                )
                .concat(
                  s,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `,
                )
                .concat(a, "px ")
                .concat(
                  r,
                  `;
    `,
                ),
            n === "padding" &&
              "padding-right: ".concat(a, "px ").concat(r, ";"),
          ]
            .filter(Boolean)
            .join(""),
          `
  }
  
  .`,
        )
        .concat(
          rl,
          ` {
    right: `,
        )
        .concat(a, "px ")
        .concat(
          r,
          `;
  }
  
  .`,
        )
        .concat(
          il,
          ` {
    margin-right: `,
        )
        .concat(a, "px ")
        .concat(
          r,
          `;
  }
  
  .`,
        )
        .concat(rl, " .")
        .concat(
          rl,
          ` {
    right: 0 `,
        )
        .concat(
          r,
          `;
  }
  
  .`,
        )
        .concat(il, " .")
        .concat(
          il,
          ` {
    margin-right: 0 `,
        )
        .concat(
          r,
          `;
  }
  
  body[`,
        )
        .concat(
          oo,
          `] {
    `,
        )
        .concat(ej, ": ")
        .concat(
          a,
          `px;
  }
`,
        )
    );
  },
  tg = function () {
    var e = parseInt(document.body.getAttribute(oo) || "0", 10);
    return isFinite(e) ? e : 0;
  },
  vj = function () {
    w.useEffect(function () {
      return (
        document.body.setAttribute(oo, (tg() + 1).toString()),
        function () {
          var e = tg() - 1;
          e <= 0
            ? document.body.removeAttribute(oo)
            : document.body.setAttribute(oo, e.toString());
        }
      );
    }, []);
  },
  wj = function (e) {
    var t = e.noRelative,
      n = e.noImportant,
      r = e.gapMode,
      i = r === void 0 ? "margin" : r;
    vj();
    var o = w.useMemo(
      function () {
        return gj(i);
      },
      [i],
    );
    return w.createElement(yj, { styles: xj(o, !t, i, n ? "" : "!important") });
  },
  Gd = !1;
if (typeof window < "u")
  try {
    var La = Object.defineProperty({}, "passive", {
      get: function () {
        return ((Gd = !0), !0);
      },
    });
    (window.addEventListener("test", La, La),
      window.removeEventListener("test", La, La));
  } catch {
    Gd = !1;
  }
var Oi = Gd ? { passive: !1 } : !1,
  bj = function (e) {
    return e.tagName === "TEXTAREA";
  },
  F0 = function (e, t) {
    if (!(e instanceof Element)) return !1;
    var n = window.getComputedStyle(e);
    return (
      n[t] !== "hidden" &&
      !(n.overflowY === n.overflowX && !bj(e) && n[t] === "visible")
    );
  },
  kj = function (e) {
    return F0(e, "overflowY");
  },
  Sj = function (e) {
    return F0(e, "overflowX");
  },
  ng = function (e, t) {
    var n = t.ownerDocument,
      r = t;
    do {
      typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
      var i = B0(e, r);
      if (i) {
        var o = $0(e, r),
          s = o[1],
          a = o[2];
        if (s > a) return !0;
      }
      r = r.parentNode;
    } while (r && r !== n.body);
    return !1;
  },
  Cj = function (e) {
    var t = e.scrollTop,
      n = e.scrollHeight,
      r = e.clientHeight;
    return [t, n, r];
  },
  Nj = function (e) {
    var t = e.scrollLeft,
      n = e.scrollWidth,
      r = e.clientWidth;
    return [t, n, r];
  },
  B0 = function (e, t) {
    return e === "v" ? kj(t) : Sj(t);
  },
  $0 = function (e, t) {
    return e === "v" ? Cj(t) : Nj(t);
  },
  Ej = function (e, t) {
    return e === "h" && t === "rtl" ? -1 : 1;
  },
  jj = function (e, t, n, r, i) {
    var o = Ej(e, window.getComputedStyle(t).direction),
      s = o * r,
      a = n.target,
      u = t.contains(a),
      c = !1,
      d = s > 0,
      f = 0,
      h = 0;
    do {
      var p = $0(e, a),
        v = p[0],
        g = p[1],
        b = p[2],
        m = g - b - o * v;
      ((v || m) && B0(e, a) && ((f += m), (h += v)),
        a instanceof ShadowRoot ? (a = a.host) : (a = a.parentNode));
    } while ((!u && a !== document.body) || (u && (t.contains(a) || t === a)));
    return (((d && Math.abs(f) < 1) || (!d && Math.abs(h) < 1)) && (c = !0), c);
  },
  za = function (e) {
    return "changedTouches" in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0];
  },
  rg = function (e) {
    return [e.deltaX, e.deltaY];
  },
  ig = function (e) {
    return e && "current" in e ? e.current : e;
  },
  Pj = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  _j = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`,
      )
      .concat(
        e,
        ` {pointer-events: all;}
`,
      );
  },
  Rj = 0,
  Di = [];
function Mj(e) {
  var t = w.useRef([]),
    n = w.useRef([0, 0]),
    r = w.useRef(),
    i = w.useState(Rj++)[0],
    o = w.useState(z0)[0],
    s = w.useRef(e);
  (w.useEffect(
    function () {
      s.current = e;
    },
    [e],
  ),
    w.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add("block-interactivity-".concat(i));
          var g = ZE([e.lockRef.current], (e.shards || []).map(ig), !0).filter(
            Boolean,
          );
          return (
            g.forEach(function (b) {
              return b.classList.add("allow-interactivity-".concat(i));
            }),
            function () {
              (document.body.classList.remove("block-interactivity-".concat(i)),
                g.forEach(function (b) {
                  return b.classList.remove("allow-interactivity-".concat(i));
                }));
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards],
    ));
  var a = w.useCallback(function (g, b) {
      if (
        ("touches" in g && g.touches.length === 2) ||
        (g.type === "wheel" && g.ctrlKey)
      )
        return !s.current.allowPinchZoom;
      var m = za(g),
        x = n.current,
        y = "deltaX" in g ? g.deltaX : x[0] - m[0],
        k = "deltaY" in g ? g.deltaY : x[1] - m[1],
        N,
        C = g.target,
        j = Math.abs(y) > Math.abs(k) ? "h" : "v";
      if ("touches" in g && j === "h" && C.type === "range") return !1;
      var P = ng(j, C);
      if (!P) return !0;
      if ((P ? (N = j) : ((N = j === "v" ? "h" : "v"), (P = ng(j, C))), !P))
        return !1;
      if (
        (!r.current && "changedTouches" in g && (y || k) && (r.current = N), !N)
      )
        return !0;
      var T = r.current || N;
      return jj(T, b, g, T === "h" ? y : k);
    }, []),
    u = w.useCallback(function (g) {
      var b = g;
      if (!(!Di.length || Di[Di.length - 1] !== o)) {
        var m = "deltaY" in b ? rg(b) : za(b),
          x = t.current.filter(function (N) {
            return (
              N.name === b.type &&
              (N.target === b.target || b.target === N.shadowParent) &&
              Pj(N.delta, m)
            );
          })[0];
        if (x && x.should) {
          b.cancelable && b.preventDefault();
          return;
        }
        if (!x) {
          var y = (s.current.shards || [])
              .map(ig)
              .filter(Boolean)
              .filter(function (N) {
                return N.contains(b.target);
              }),
            k = y.length > 0 ? a(b, y[0]) : !s.current.noIsolation;
          k && b.cancelable && b.preventDefault();
        }
      }
    }, []),
    c = w.useCallback(function (g, b, m, x) {
      var y = { name: g, delta: b, target: m, should: x, shadowParent: Tj(m) };
      (t.current.push(y),
        setTimeout(function () {
          t.current = t.current.filter(function (k) {
            return k !== y;
          });
        }, 1));
    }, []),
    d = w.useCallback(function (g) {
      ((n.current = za(g)), (r.current = void 0));
    }, []),
    f = w.useCallback(function (g) {
      c(g.type, rg(g), g.target, a(g, e.lockRef.current));
    }, []),
    h = w.useCallback(function (g) {
      c(g.type, za(g), g.target, a(g, e.lockRef.current));
    }, []);
  w.useEffect(function () {
    return (
      Di.push(o),
      e.setCallbacks({
        onScrollCapture: f,
        onWheelCapture: f,
        onTouchMoveCapture: h,
      }),
      document.addEventListener("wheel", u, Oi),
      document.addEventListener("touchmove", u, Oi),
      document.addEventListener("touchstart", d, Oi),
      function () {
        ((Di = Di.filter(function (g) {
          return g !== o;
        })),
          document.removeEventListener("wheel", u, Oi),
          document.removeEventListener("touchmove", u, Oi),
          document.removeEventListener("touchstart", d, Oi));
      }
    );
  }, []);
  var p = e.removeScrollBar,
    v = e.inert;
  return w.createElement(
    w.Fragment,
    null,
    v ? w.createElement(o, { styles: _j(i) }) : null,
    p ? w.createElement(wj, { gapMode: e.gapMode }) : null,
  );
}
function Tj(e) {
  for (var t = null; e !== null;)
    (e instanceof ShadowRoot && ((t = e.host), (e = e.host)),
      (e = e.parentNode));
  return t;
}
const Aj = aj(L0, Mj);
var Rp = w.forwardRef(function (e, t) {
  return w.createElement(wu, Nn({}, e, { ref: t, sideCar: Aj }));
});
Rp.classNames = wu.classNames;
var Yd = ["Enter", " "],
  Ij = ["ArrowDown", "PageUp", "Home"],
  U0 = ["ArrowUp", "PageDown", "End"],
  Oj = [...Ij, ...U0],
  Dj = { ltr: [...Yd, "ArrowRight"], rtl: [...Yd, "ArrowLeft"] },
  Lj = { ltr: ["ArrowLeft"], rtl: ["ArrowRight"] },
  aa = "Menu",
  [Qs, zj, Fj] = Jv(aa),
  [Ei, W0] = yp(aa, [Fj, x0, P0]),
  bu = x0(),
  V0 = P0(),
  [Bj, ji] = Ei(aa),
  [$j, la] = Ei(aa),
  H0 = (e) => {
    const {
        __scopeMenu: t,
        open: n = !1,
        children: r,
        dir: i,
        onOpenChange: o,
        modal: s = !0,
      } = e,
      a = bu(t),
      [u, c] = w.useState(null),
      d = w.useRef(!1),
      f = fn(o),
      h = e0(i);
    return (
      w.useEffect(() => {
        const p = () => {
            ((d.current = !0),
              document.addEventListener("pointerdown", v, {
                capture: !0,
                once: !0,
              }),
              document.addEventListener("pointermove", v, {
                capture: !0,
                once: !0,
              }));
          },
          v = () => (d.current = !1);
        return (
          document.addEventListener("keydown", p, { capture: !0 }),
          () => {
            (document.removeEventListener("keydown", p, { capture: !0 }),
              document.removeEventListener("pointerdown", v, { capture: !0 }),
              document.removeEventListener("pointermove", v, { capture: !0 }));
          }
        );
      }, []),
      l.jsx(jE, {
        ...a,
        children: l.jsx(Bj, {
          scope: t,
          open: n,
          onOpenChange: f,
          content: u,
          onContentChange: c,
          children: l.jsx($j, {
            scope: t,
            onClose: w.useCallback(() => f(!1), [f]),
            isUsingKeyboardRef: d,
            dir: h,
            modal: s,
            children: r,
          }),
        }),
      })
    );
  };
H0.displayName = aa;
var Uj = "MenuAnchor",
  Mp = w.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e,
      i = bu(n);
    return l.jsx(PE, { ...i, ...r, ref: t });
  });
Mp.displayName = Uj;
var Tp = "MenuPortal",
  [Wj, q0] = Ei(Tp, { forceMount: void 0 }),
  Q0 = (e) => {
    const { __scopeMenu: t, forceMount: n, children: r, container: i } = e,
      o = ji(Tp, t);
    return l.jsx(Wj, {
      scope: t,
      forceMount: n,
      children: l.jsx(Vr, {
        present: n || o.open,
        children: l.jsx(_p, { asChild: !0, container: i, children: r }),
      }),
    });
  };
Q0.displayName = Tp;
var Yt = "MenuContent",
  [Vj, Ap] = Ei(Yt),
  K0 = w.forwardRef((e, t) => {
    const n = q0(Yt, e.__scopeMenu),
      { forceMount: r = n.forceMount, ...i } = e,
      o = ji(Yt, e.__scopeMenu),
      s = la(Yt, e.__scopeMenu);
    return l.jsx(Qs.Provider, {
      scope: e.__scopeMenu,
      children: l.jsx(Vr, {
        present: r || o.open,
        children: l.jsx(Qs.Slot, {
          scope: e.__scopeMenu,
          children: s.modal
            ? l.jsx(Hj, { ...i, ref: t })
            : l.jsx(qj, { ...i, ref: t }),
        }),
      }),
    });
  }),
  Hj = w.forwardRef((e, t) => {
    const n = ji(Yt, e.__scopeMenu),
      r = w.useRef(null),
      i = tt(t, r);
    return (
      w.useEffect(() => {
        const o = r.current;
        if (o) return I0(o);
      }, []),
      l.jsx(Ip, {
        ...e,
        ref: i,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: le(e.onFocusOutside, (o) => o.preventDefault(), {
          checkForDefaultPrevented: !1,
        }),
        onDismiss: () => n.onOpenChange(!1),
      })
    );
  }),
  qj = w.forwardRef((e, t) => {
    const n = ji(Yt, e.__scopeMenu);
    return l.jsx(Ip, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1),
    });
  }),
  Ip = w.forwardRef((e, t) => {
    const {
        __scopeMenu: n,
        loop: r = !1,
        trapFocus: i,
        onOpenAutoFocus: o,
        onCloseAutoFocus: s,
        disableOutsidePointerEvents: a,
        onEntryFocus: u,
        onEscapeKeyDown: c,
        onPointerDownOutside: d,
        onFocusOutside: f,
        onInteractOutside: h,
        onDismiss: p,
        disableOutsideScroll: v,
        ...g
      } = e,
      b = ji(Yt, n),
      m = la(Yt, n),
      x = bu(n),
      y = V0(n),
      k = zj(n),
      [N, C] = w.useState(null),
      j = w.useRef(null),
      P = tt(t, j, b.onContentChange),
      T = w.useRef(0),
      I = w.useRef(""),
      D = w.useRef(0),
      O = w.useRef(null),
      $ = w.useRef("right"),
      G = w.useRef(0),
      Q = v ? Rp : w.Fragment,
      V = v ? { as: Ro, allowPinchZoom: !0 } : void 0,
      Y = (_) => {
        var ae, He;
        const S = I.current + _,
          U = k().filter((Se) => !Se.disabled),
          W = document.activeElement,
          E =
            (ae = U.find((Se) => Se.ref.current === W)) == null
              ? void 0
              : ae.textValue,
          X = U.map((Se) => Se.textValue),
          ge = iP(X, S, E),
          oe =
            (He = U.find((Se) => Se.textValue === ge)) == null
              ? void 0
              : He.ref.current;
        ((function Se(qe) {
          ((I.current = qe),
            window.clearTimeout(T.current),
            qe !== "" && (T.current = window.setTimeout(() => Se(""), 1e3)));
        })(S),
          oe && setTimeout(() => oe.focus()));
      };
    (w.useEffect(() => () => window.clearTimeout(T.current), []), r0());
    const A = w.useCallback((_) => {
      var U, W;
      return (
        $.current === ((U = O.current) == null ? void 0 : U.side) &&
        sP(_, (W = O.current) == null ? void 0 : W.area)
      );
    }, []);
    return l.jsx(Vj, {
      scope: n,
      searchRef: I,
      onItemEnter: w.useCallback(
        (_) => {
          A(_) && _.preventDefault();
        },
        [A],
      ),
      onItemLeave: w.useCallback(
        (_) => {
          var S;
          A(_) || ((S = j.current) == null || S.focus(), C(null));
        },
        [A],
      ),
      onTriggerLeave: w.useCallback(
        (_) => {
          A(_) && _.preventDefault();
        },
        [A],
      ),
      pointerGraceTimerRef: D,
      onPointerGraceIntentChange: w.useCallback((_) => {
        O.current = _;
      }, []),
      children: l.jsx(Q, {
        ...V,
        children: l.jsx(wp, {
          asChild: !0,
          trapped: i,
          onMountAutoFocus: le(o, (_) => {
            var S;
            (_.preventDefault(),
              (S = j.current) == null || S.focus({ preventScroll: !0 }));
          }),
          onUnmountAutoFocus: s,
          children: l.jsx(vp, {
            asChild: !0,
            disableOutsidePointerEvents: a,
            onEscapeKeyDown: c,
            onPointerDownOutside: d,
            onFocusOutside: f,
            onInteractOutside: h,
            onDismiss: p,
            children: l.jsx(QE, {
              asChild: !0,
              ...y,
              dir: m.dir,
              orientation: "vertical",
              loop: r,
              currentTabStopId: N,
              onCurrentTabStopIdChange: C,
              onEntryFocus: le(u, (_) => {
                m.isUsingKeyboardRef.current || _.preventDefault();
              }),
              preventScrollOnEntryFocus: !0,
              children: l.jsx(_E, {
                role: "menu",
                "aria-orientation": "vertical",
                "data-state": c1(b.open),
                "data-radix-menu-content": "",
                dir: m.dir,
                ...x,
                ...g,
                ref: P,
                style: { outline: "none", ...g.style },
                onKeyDown: le(g.onKeyDown, (_) => {
                  const U =
                      _.target.closest("[data-radix-menu-content]") ===
                      _.currentTarget,
                    W = _.ctrlKey || _.altKey || _.metaKey,
                    E = _.key.length === 1;
                  U &&
                    (_.key === "Tab" && _.preventDefault(),
                    !W && E && Y(_.key));
                  const X = j.current;
                  if (_.target !== X || !Oj.includes(_.key)) return;
                  _.preventDefault();
                  const oe = k()
                    .filter((ae) => !ae.disabled)
                    .map((ae) => ae.ref.current);
                  (U0.includes(_.key) && oe.reverse(), nP(oe));
                }),
                onBlur: le(e.onBlur, (_) => {
                  _.currentTarget.contains(_.target) ||
                    (window.clearTimeout(T.current), (I.current = ""));
                }),
                onPointerMove: le(
                  e.onPointerMove,
                  Ks((_) => {
                    const S = _.target,
                      U = G.current !== _.clientX;
                    if (_.currentTarget.contains(S) && U) {
                      const W = _.clientX > G.current ? "right" : "left";
                      (($.current = W), (G.current = _.clientX));
                    }
                  }),
                ),
              }),
            }),
          }),
        }),
      }),
    });
  });
K0.displayName = Yt;
var Qj = "MenuGroup",
  Op = w.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return l.jsx($e.div, { role: "group", ...r, ref: t });
  });
Op.displayName = Qj;
var Kj = "MenuLabel",
  G0 = w.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return l.jsx($e.div, { ...r, ref: t });
  });
G0.displayName = Kj;
var zl = "MenuItem",
  og = "menu.itemSelect",
  ku = w.forwardRef((e, t) => {
    const { disabled: n = !1, onSelect: r, ...i } = e,
      o = w.useRef(null),
      s = la(zl, e.__scopeMenu),
      a = Ap(zl, e.__scopeMenu),
      u = tt(t, o),
      c = w.useRef(!1),
      d = () => {
        const f = o.current;
        if (!n && f) {
          const h = new CustomEvent(og, { bubbles: !0, cancelable: !0 });
          (f.addEventListener(og, (p) => (r == null ? void 0 : r(p)), {
            once: !0,
          }),
            Zv(f, h),
            h.defaultPrevented ? (c.current = !1) : s.onClose());
        }
      };
    return l.jsx(Y0, {
      ...i,
      ref: u,
      disabled: n,
      onClick: le(e.onClick, d),
      onPointerDown: (f) => {
        var h;
        ((h = e.onPointerDown) == null || h.call(e, f), (c.current = !0));
      },
      onPointerUp: le(e.onPointerUp, (f) => {
        var h;
        c.current || (h = f.currentTarget) == null || h.click();
      }),
      onKeyDown: le(e.onKeyDown, (f) => {
        const h = a.searchRef.current !== "";
        n ||
          (h && f.key === " ") ||
          (Yd.includes(f.key) && (f.currentTarget.click(), f.preventDefault()));
      }),
    });
  });
ku.displayName = zl;
var Y0 = w.forwardRef((e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: i, ...o } = e,
      s = Ap(zl, n),
      a = V0(n),
      u = w.useRef(null),
      c = tt(t, u),
      [d, f] = w.useState(!1),
      [h, p] = w.useState("");
    return (
      w.useEffect(() => {
        const v = u.current;
        v && p((v.textContent ?? "").trim());
      }, [o.children]),
      l.jsx(Qs.ItemSlot, {
        scope: n,
        disabled: r,
        textValue: i ?? h,
        children: l.jsx(KE, {
          asChild: !0,
          ...a,
          focusable: !r,
          children: l.jsx($e.div, {
            role: "menuitem",
            "data-highlighted": d ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...o,
            ref: c,
            onPointerMove: le(
              e.onPointerMove,
              Ks((v) => {
                r
                  ? s.onItemLeave(v)
                  : (s.onItemEnter(v),
                    v.defaultPrevented ||
                      v.currentTarget.focus({ preventScroll: !0 }));
              }),
            ),
            onPointerLeave: le(
              e.onPointerLeave,
              Ks((v) => s.onItemLeave(v)),
            ),
            onFocus: le(e.onFocus, () => f(!0)),
            onBlur: le(e.onBlur, () => f(!1)),
          }),
        }),
      })
    );
  }),
  Gj = "MenuCheckboxItem",
  X0 = w.forwardRef((e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...i } = e;
    return l.jsx(n1, {
      scope: e.__scopeMenu,
      checked: n,
      children: l.jsx(ku, {
        role: "menuitemcheckbox",
        "aria-checked": Fl(n) ? "mixed" : n,
        ...i,
        ref: t,
        "data-state": Lp(n),
        onSelect: le(
          i.onSelect,
          () => (r == null ? void 0 : r(Fl(n) ? !0 : !n)),
          { checkForDefaultPrevented: !1 },
        ),
      }),
    });
  });
X0.displayName = Gj;
var Z0 = "MenuRadioGroup",
  [Yj, Xj] = Ei(Z0, { value: void 0, onValueChange: () => {} }),
  J0 = w.forwardRef((e, t) => {
    const { value: n, onValueChange: r, ...i } = e,
      o = fn(r);
    return l.jsx(Yj, {
      scope: e.__scopeMenu,
      value: n,
      onValueChange: o,
      children: l.jsx(Op, { ...i, ref: t }),
    });
  });
J0.displayName = Z0;
var e1 = "MenuRadioItem",
  t1 = w.forwardRef((e, t) => {
    const { value: n, ...r } = e,
      i = Xj(e1, e.__scopeMenu),
      o = n === i.value;
    return l.jsx(n1, {
      scope: e.__scopeMenu,
      checked: o,
      children: l.jsx(ku, {
        role: "menuitemradio",
        "aria-checked": o,
        ...r,
        ref: t,
        "data-state": Lp(o),
        onSelect: le(
          r.onSelect,
          () => {
            var s;
            return (s = i.onValueChange) == null ? void 0 : s.call(i, n);
          },
          { checkForDefaultPrevented: !1 },
        ),
      }),
    });
  });
t1.displayName = e1;
var Dp = "MenuItemIndicator",
  [n1, Zj] = Ei(Dp, { checked: !1 }),
  r1 = w.forwardRef((e, t) => {
    const { __scopeMenu: n, forceMount: r, ...i } = e,
      o = Zj(Dp, n);
    return l.jsx(Vr, {
      present: r || Fl(o.checked) || o.checked === !0,
      children: l.jsx($e.span, { ...i, ref: t, "data-state": Lp(o.checked) }),
    });
  });
r1.displayName = Dp;
var Jj = "MenuSeparator",
  i1 = w.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return l.jsx($e.div, {
      role: "separator",
      "aria-orientation": "horizontal",
      ...r,
      ref: t,
    });
  });
i1.displayName = Jj;
var eP = "MenuArrow",
  o1 = w.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e,
      i = bu(n);
    return l.jsx(RE, { ...i, ...r, ref: t });
  });
o1.displayName = eP;
var tP = "MenuSub",
  [b5, s1] = Ei(tP),
  us = "MenuSubTrigger",
  a1 = w.forwardRef((e, t) => {
    const n = ji(us, e.__scopeMenu),
      r = la(us, e.__scopeMenu),
      i = s1(us, e.__scopeMenu),
      o = Ap(us, e.__scopeMenu),
      s = w.useRef(null),
      { pointerGraceTimerRef: a, onPointerGraceIntentChange: u } = o,
      c = { __scopeMenu: e.__scopeMenu },
      d = w.useCallback(() => {
        (s.current && window.clearTimeout(s.current), (s.current = null));
      }, []);
    return (
      w.useEffect(() => d, [d]),
      w.useEffect(() => {
        const f = a.current;
        return () => {
          (window.clearTimeout(f), u(null));
        };
      }, [a, u]),
      l.jsx(Mp, {
        asChild: !0,
        ...c,
        children: l.jsx(Y0, {
          id: i.triggerId,
          "aria-haspopup": "menu",
          "aria-expanded": n.open,
          "aria-controls": i.contentId,
          "data-state": c1(n.open),
          ...e,
          ref: pu(t, i.onTriggerChange),
          onClick: (f) => {
            var h;
            ((h = e.onClick) == null || h.call(e, f),
              !(e.disabled || f.defaultPrevented) &&
                (f.currentTarget.focus(), n.open || n.onOpenChange(!0)));
          },
          onPointerMove: le(
            e.onPointerMove,
            Ks((f) => {
              (o.onItemEnter(f),
                !f.defaultPrevented &&
                  !e.disabled &&
                  !n.open &&
                  !s.current &&
                  (o.onPointerGraceIntentChange(null),
                  (s.current = window.setTimeout(() => {
                    (n.onOpenChange(!0), d());
                  }, 100))));
            }),
          ),
          onPointerLeave: le(
            e.onPointerLeave,
            Ks((f) => {
              var p, v;
              d();
              const h =
                (p = n.content) == null ? void 0 : p.getBoundingClientRect();
              if (h) {
                const g = (v = n.content) == null ? void 0 : v.dataset.side,
                  b = g === "right",
                  m = b ? -5 : 5,
                  x = h[b ? "left" : "right"],
                  y = h[b ? "right" : "left"];
                (o.onPointerGraceIntentChange({
                  area: [
                    { x: f.clientX + m, y: f.clientY },
                    { x, y: h.top },
                    { x: y, y: h.top },
                    { x: y, y: h.bottom },
                    { x, y: h.bottom },
                  ],
                  side: g,
                }),
                  window.clearTimeout(a.current),
                  (a.current = window.setTimeout(
                    () => o.onPointerGraceIntentChange(null),
                    300,
                  )));
              } else {
                if ((o.onTriggerLeave(f), f.defaultPrevented)) return;
                o.onPointerGraceIntentChange(null);
              }
            }),
          ),
          onKeyDown: le(e.onKeyDown, (f) => {
            var p;
            const h = o.searchRef.current !== "";
            e.disabled ||
              (h && f.key === " ") ||
              (Dj[r.dir].includes(f.key) &&
                (n.onOpenChange(!0),
                (p = n.content) == null || p.focus(),
                f.preventDefault()));
          }),
        }),
      })
    );
  });
a1.displayName = us;
var l1 = "MenuSubContent",
  u1 = w.forwardRef((e, t) => {
    const n = q0(Yt, e.__scopeMenu),
      { forceMount: r = n.forceMount, ...i } = e,
      o = ji(Yt, e.__scopeMenu),
      s = la(Yt, e.__scopeMenu),
      a = s1(l1, e.__scopeMenu),
      u = w.useRef(null),
      c = tt(t, u);
    return l.jsx(Qs.Provider, {
      scope: e.__scopeMenu,
      children: l.jsx(Vr, {
        present: r || o.open,
        children: l.jsx(Qs.Slot, {
          scope: e.__scopeMenu,
          children: l.jsx(Ip, {
            id: a.contentId,
            "aria-labelledby": a.triggerId,
            ...i,
            ref: c,
            align: "start",
            side: s.dir === "rtl" ? "left" : "right",
            disableOutsidePointerEvents: !1,
            disableOutsideScroll: !1,
            trapFocus: !1,
            onOpenAutoFocus: (d) => {
              var f;
              (s.isUsingKeyboardRef.current &&
                ((f = u.current) == null || f.focus()),
                d.preventDefault());
            },
            onCloseAutoFocus: (d) => d.preventDefault(),
            onFocusOutside: le(e.onFocusOutside, (d) => {
              d.target !== a.trigger && o.onOpenChange(!1);
            }),
            onEscapeKeyDown: le(e.onEscapeKeyDown, (d) => {
              (s.onClose(), d.preventDefault());
            }),
            onKeyDown: le(e.onKeyDown, (d) => {
              var p;
              const f = d.currentTarget.contains(d.target),
                h = Lj[s.dir].includes(d.key);
              f &&
                h &&
                (o.onOpenChange(!1),
                (p = a.trigger) == null || p.focus(),
                d.preventDefault());
            }),
          }),
        }),
      }),
    });
  });
u1.displayName = l1;
function c1(e) {
  return e ? "open" : "closed";
}
function Fl(e) {
  return e === "indeterminate";
}
function Lp(e) {
  return Fl(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function nP(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function rP(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function iP(e, t, n) {
  const i = t.length > 1 && Array.from(t).every((c) => c === t[0]) ? t[0] : t,
    o = n ? e.indexOf(n) : -1;
  let s = rP(e, Math.max(o, 0));
  i.length === 1 && (s = s.filter((c) => c !== n));
  const u = s.find((c) => c.toLowerCase().startsWith(i.toLowerCase()));
  return u !== n ? u : void 0;
}
function oP(e, t) {
  const { x: n, y: r } = e;
  let i = !1;
  for (let o = 0, s = t.length - 1; o < t.length; s = o++) {
    const a = t[o].x,
      u = t[o].y,
      c = t[s].x,
      d = t[s].y;
    u > r != d > r && n < ((c - a) * (r - u)) / (d - u) + a && (i = !i);
  }
  return i;
}
function sP(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return oP(n, t);
}
function Ks(e) {
  return (t) => (t.pointerType === "mouse" ? e(t) : void 0);
}
var aP = H0,
  lP = Mp,
  uP = Q0,
  cP = K0,
  dP = Op,
  fP = G0,
  pP = ku,
  hP = X0,
  mP = J0,
  gP = t1,
  yP = r1,
  xP = i1,
  vP = o1,
  wP = a1,
  bP = u1,
  zp = "DropdownMenu",
  [kP] = yp(zp, [W0]),
  gt = W0(),
  [SP, d1] = kP(zp),
  f1 = (e) => {
    const {
        __scopeDropdownMenu: t,
        children: n,
        dir: r,
        open: i,
        defaultOpen: o,
        onOpenChange: s,
        modal: a = !0,
      } = e,
      u = gt(t),
      c = w.useRef(null),
      [d = !1, f] = xp({ prop: i, defaultProp: o, onChange: s });
    return l.jsx(SP, {
      scope: t,
      triggerId: ro(),
      triggerRef: c,
      contentId: ro(),
      open: d,
      onOpenChange: f,
      onOpenToggle: w.useCallback(() => f((h) => !h), [f]),
      modal: a,
      children: l.jsx(aP, {
        ...u,
        open: d,
        onOpenChange: f,
        dir: r,
        modal: a,
        children: n,
      }),
    });
  };
f1.displayName = zp;
var p1 = "DropdownMenuTrigger",
  h1 = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...i } = e,
      o = d1(p1, n),
      s = gt(n);
    return l.jsx(lP, {
      asChild: !0,
      ...s,
      children: l.jsx($e.button, {
        type: "button",
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": o.open,
        "aria-controls": o.open ? o.contentId : void 0,
        "data-state": o.open ? "open" : "closed",
        "data-disabled": r ? "" : void 0,
        disabled: r,
        ...i,
        ref: pu(t, o.triggerRef),
        onPointerDown: le(e.onPointerDown, (a) => {
          !r &&
            a.button === 0 &&
            a.ctrlKey === !1 &&
            (o.onOpenToggle(), o.open || a.preventDefault());
        }),
        onKeyDown: le(e.onKeyDown, (a) => {
          r ||
            (["Enter", " "].includes(a.key) && o.onOpenToggle(),
            a.key === "ArrowDown" && o.onOpenChange(!0),
            ["Enter", " ", "ArrowDown"].includes(a.key) && a.preventDefault());
        }),
      }),
    });
  });
h1.displayName = p1;
var CP = "DropdownMenuPortal",
  m1 = (e) => {
    const { __scopeDropdownMenu: t, ...n } = e,
      r = gt(t);
    return l.jsx(uP, { ...r, ...n });
  };
m1.displayName = CP;
var g1 = "DropdownMenuContent",
  y1 = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      i = d1(g1, n),
      o = gt(n),
      s = w.useRef(!1);
    return l.jsx(cP, {
      id: i.contentId,
      "aria-labelledby": i.triggerId,
      ...o,
      ...r,
      ref: t,
      onCloseAutoFocus: le(e.onCloseAutoFocus, (a) => {
        var u;
        (s.current || (u = i.triggerRef.current) == null || u.focus(),
          (s.current = !1),
          a.preventDefault());
      }),
      onInteractOutside: le(e.onInteractOutside, (a) => {
        const u = a.detail.originalEvent,
          c = u.button === 0 && u.ctrlKey === !0,
          d = u.button === 2 || c;
        (!i.modal || d) && (s.current = !0);
      }),
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin":
          "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width":
          "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height":
          "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width":
          "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height":
          "var(--radix-popper-anchor-height)",
      },
    });
  });
y1.displayName = g1;
var NP = "DropdownMenuGroup",
  EP = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      i = gt(n);
    return l.jsx(dP, { ...i, ...r, ref: t });
  });
EP.displayName = NP;
var jP = "DropdownMenuLabel",
  x1 = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      i = gt(n);
    return l.jsx(fP, { ...i, ...r, ref: t });
  });
x1.displayName = jP;
var PP = "DropdownMenuItem",
  v1 = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      i = gt(n);
    return l.jsx(pP, { ...i, ...r, ref: t });
  });
v1.displayName = PP;
var _P = "DropdownMenuCheckboxItem",
  RP = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      i = gt(n);
    return l.jsx(hP, { ...i, ...r, ref: t });
  });
RP.displayName = _P;
var MP = "DropdownMenuRadioGroup",
  TP = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      i = gt(n);
    return l.jsx(mP, { ...i, ...r, ref: t });
  });
TP.displayName = MP;
var AP = "DropdownMenuRadioItem",
  IP = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      i = gt(n);
    return l.jsx(gP, { ...i, ...r, ref: t });
  });
IP.displayName = AP;
var OP = "DropdownMenuItemIndicator",
  DP = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      i = gt(n);
    return l.jsx(yP, { ...i, ...r, ref: t });
  });
DP.displayName = OP;
var LP = "DropdownMenuSeparator",
  w1 = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      i = gt(n);
    return l.jsx(xP, { ...i, ...r, ref: t });
  });
w1.displayName = LP;
var zP = "DropdownMenuArrow",
  FP = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      i = gt(n);
    return l.jsx(vP, { ...i, ...r, ref: t });
  });
FP.displayName = zP;
var BP = "DropdownMenuSubTrigger",
  $P = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      i = gt(n);
    return l.jsx(wP, { ...i, ...r, ref: t });
  });
$P.displayName = BP;
var UP = "DropdownMenuSubContent",
  WP = w.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      i = gt(n);
    return l.jsx(bP, {
      ...i,
      ...r,
      ref: t,
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin":
          "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width":
          "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height":
          "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width":
          "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height":
          "var(--radix-popper-anchor-height)",
      },
    });
  });
WP.displayName = UP;
var b1 = f1,
  k1 = h1,
  S1 = m1,
  C1 = y1,
  N1 = x1,
  Li = v1,
  VP = w1;
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const HP = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  E1 = (...e) =>
    e
      .filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n)
      .join(" ")
      .trim();
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var qP = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const QP = w.forwardRef(
  (
    {
      color: e = "currentColor",
      size: t = 24,
      strokeWidth: n = 2,
      absoluteStrokeWidth: r,
      className: i = "",
      children: o,
      iconNode: s,
      ...a
    },
    u,
  ) =>
    w.createElement(
      "svg",
      {
        ref: u,
        ...qP,
        width: t,
        height: t,
        stroke: e,
        strokeWidth: r ? (Number(n) * 24) / Number(t) : n,
        className: E1("lucide", i),
        ...a,
      },
      [
        ...s.map(([c, d]) => w.createElement(c, d)),
        ...(Array.isArray(o) ? o : [o]),
      ],
    ),
);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const K = (e, t) => {
  const n = w.forwardRef(({ className: r, ...i }, o) =>
    w.createElement(QP, {
      ref: o,
      iconNode: t,
      className: E1(`lucide-${HP(e)}`, r),
      ...i,
    }),
  );
  return ((n.displayName = `${e}`), n);
};
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const sg = K("Archive", [
  [
    "rect",
    { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" },
  ],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" }],
  ["path", { d: "M10 12h4", key: "a56b0p" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const KP = K("ArrowDownRight", [
  ["path", { d: "m7 7 10 10", key: "1fmybs" }],
  ["path", { d: "M17 7v10H7", key: "6fjiku" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const GP = K("ArrowDown", [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const YP = K("ArrowLeftRight", [
  ["path", { d: "M8 3 4 7l4 4", key: "9rb6wj" }],
  ["path", { d: "M4 7h16", key: "6tx8e3" }],
  ["path", { d: "m16 21 4-4-4-4", key: "siv7j2" }],
  ["path", { d: "M20 17H4", key: "h6l3hr" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Bl = K("ArrowRight", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const j1 = K("ArrowUpRight", [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const XP = K("ArrowUp", [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const P1 = K("BadgeCheck", [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336",
    },
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ZP = K("Banknote", [
  [
    "rect",
    { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" },
  ],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M6 12h.01M18 12h.01", key: "113zkx" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const JP = K("BookOpen", [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y",
    },
  ],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const e_ = K("Calculator", [
  [
    "rect",
    { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" },
  ],
  ["line", { x1: "8", x2: "16", y1: "6", y2: "6", key: "x4nwl0" }],
  ["line", { x1: "16", x2: "16", y1: "14", y2: "18", key: "wjye3r" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const t_ = K("CalendarCheck2", [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  [
    "path",
    {
      d: "M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8",
      key: "bce9hv",
    },
  ],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m16 20 2 2 4-4", key: "13tcca" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Mo = K("CalendarDays", [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  [
    "rect",
    { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" },
  ],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const n_ = K("ChartLine", [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "m19 9-5 5-4-4-3 3", key: "2osh9i" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Jt = K("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const r_ = K("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const i_ = K("ChevronsUpDown", [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const o_ = K("CircleDashed", [
  ["path", { d: "M10.1 2.182a10 10 0 0 1 3.8 0", key: "5ilxe3" }],
  ["path", { d: "M13.9 21.818a10 10 0 0 1-3.8 0", key: "11zvb9" }],
  ["path", { d: "M17.609 3.721a10 10 0 0 1 2.69 2.7", key: "1iw5b2" }],
  ["path", { d: "M2.182 13.9a10 10 0 0 1 0-3.8", key: "c0bmvh" }],
  ["path", { d: "M20.279 17.609a10 10 0 0 1-2.7 2.69", key: "1ruxm7" }],
  ["path", { d: "M21.818 10.1a10 10 0 0 1 0 3.8", key: "qkgqxc" }],
  ["path", { d: "M3.721 6.391a10 10 0 0 1 2.7-2.69", key: "1mcia2" }],
  ["path", { d: "M6.391 20.279a10 10 0 0 1-2.69-2.7", key: "1fvljs" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const s_ = K("CircleDollarSign", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const a_ = K("CloudUpload", [
  ["path", { d: "M12 13v8", key: "1l5pq0" }],
  [
    "path",
    {
      d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
      key: "1pljnt",
    },
  ],
  ["path", { d: "m8 17 4-4 4 4", key: "1quai1" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const l_ = K("Coffee", [
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M14 2v2", key: "6buw04" }],
  [
    "path",
    {
      d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1",
      key: "pwadti",
    },
  ],
  ["path", { d: "M6 2v2", key: "colzsn" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const _1 = K("Coins", [
  ["circle", { cx: "8", cy: "8", r: "6", key: "3yglwk" }],
  ["path", { d: "M18.09 10.37A6 6 0 1 1 10.34 18", key: "t5s6rm" }],
  ["path", { d: "M7 6h1v4", key: "1obek4" }],
  ["path", { d: "m16.71 13.88.7.71-2.82 2.82", key: "1rbuyh" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const u_ = K("CreditCard", [
  [
    "rect",
    { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" },
  ],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const c_ = K("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const d_ = K("FileSpreadsheet", [
  [
    "path",
    {
      d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
      key: "1rqfz7",
    },
  ],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M8 13h2", key: "yr2amv" }],
  ["path", { d: "M14 13h2", key: "un5t4a" }],
  ["path", { d: "M8 17h2", key: "2yhykz" }],
  ["path", { d: "M14 17h2", key: "10kma7" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const f_ = K("Fuel", [
  ["line", { x1: "3", x2: "15", y1: "22", y2: "22", key: "xegly4" }],
  ["line", { x1: "4", x2: "14", y1: "9", y2: "9", key: "xcnuvu" }],
  ["path", { d: "M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18", key: "16j0yd" }],
  [
    "path",
    {
      d: "M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5",
      key: "7cu91f",
    },
  ],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const p_ = K("GitFork", [
  ["circle", { cx: "12", cy: "18", r: "3", key: "1mpf1b" }],
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }],
  ["path", { d: "M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9", key: "1uq4wg" }],
  ["path", { d: "M12 12v3", key: "158kv8" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const h_ = K("GraduationCap", [
  [
    "path",
    {
      d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      key: "j76jl0",
    },
  ],
  ["path", { d: "M22 10v6", key: "1lu8f3" }],
  ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", key: "1r8lef" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const m_ = K("HeartPulse", [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky",
    },
  ],
  ["path", { d: "M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27", key: "1uw2ng" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const g_ = K("History", [
  [
    "path",
    { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" },
  ],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const R1 = K("House", [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt",
    },
  ],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const M1 = K("Landmark", [
  ["line", { x1: "3", x2: "21", y1: "22", y2: "22", key: "j8o0r" }],
  ["line", { x1: "6", x2: "6", y1: "18", y2: "11", key: "10tf0k" }],
  ["line", { x1: "10", x2: "10", y1: "18", y2: "11", key: "54lgf6" }],
  ["line", { x1: "14", x2: "14", y1: "18", y2: "11", key: "380y" }],
  ["line", { x1: "18", x2: "18", y1: "18", y2: "11", key: "1kevvc" }],
  ["polygon", { points: "12 2 20 7 4 7", key: "jkujk7" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const zr = K("LoaderCircle", [
  ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const y_ = K("Lock", [
  [
    "rect",
    {
      width: "18",
      height: "11",
      x: "3",
      y: "11",
      rx: "2",
      ry: "2",
      key: "1w4ew1",
    },
  ],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const x_ = K("Moon", [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const T1 = K("PencilLine", [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy",
    },
  ],
  ["path", { d: "m15 5 3 3", key: "1w25hb" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const v_ = K("PiggyBank", [
  [
    "path",
    {
      d: "M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z",
      key: "1ivx2i",
    },
  ],
  ["path", { d: "M2 9v1c0 1.1.9 2 2 2h1", key: "nm575m" }],
  ["path", { d: "M16 11h.01", key: "xkw8gn" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const A1 = K("ReceiptText", [
  [
    "path",
    {
      d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",
      key: "q3az6g",
    },
  ],
  ["path", { d: "M14 8H8", key: "1l3xfs" }],
  ["path", { d: "M16 12H8", key: "1fr5h0" }],
  ["path", { d: "M13 16H8", key: "wsln4y" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const xc = K("RefreshCw", [
  [
    "path",
    { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" },
  ],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  [
    "path",
    { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" },
  ],
  ["path", { d: "M8 16H3v5", key: "1cv678" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const w_ = K("Repeat", [
  ["path", { d: "m17 2 4 4-4 4", key: "nntrym" }],
  ["path", { d: "M3 11v-1a4 4 0 0 1 4-4h14", key: "84bu3i" }],
  ["path", { d: "m7 22-4-4 4-4", key: "1wqhfi" }],
  ["path", { d: "M21 13v1a4 4 0 0 1-4 4H3", key: "1rx37r" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const b_ = K("RotateCcw", [
  [
    "path",
    { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" },
  ],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const k_ = K("Scissors", [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const S_ = K("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const C_ = K("Send", [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3",
    },
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const I1 = K("Settings2", [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const N_ = K("ShieldAlert", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y",
    },
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const O1 = K("ShieldCheck", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y",
    },
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const D1 = K("Shield", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y",
    },
  ],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const E_ = K("ShoppingBag", [
  [
    "path",
    { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", key: "hou9p0" },
  ],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const j_ = K("ShoppingBasket", [
  ["path", { d: "m15 11-1 9", key: "5wnq3a" }],
  ["path", { d: "m19 11-4-7", key: "cnml18" }],
  ["path", { d: "M2 11h20", key: "3eubbj" }],
  [
    "path",
    {
      d: "m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4",
      key: "yiazzp",
    },
  ],
  ["path", { d: "M4.5 15.5h15", key: "13mye1" }],
  ["path", { d: "m5 11 4-7", key: "116ra9" }],
  ["path", { d: "m9 11 1 9", key: "1ojof7" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ua = K("Sparkles", [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx",
    },
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const P_ = K("Sun", [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Bo = K("Target", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const __ = K("Ticket", [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0",
    },
  ],
  ["path", { d: "M13 5v2", key: "dyzc3o" }],
  ["path", { d: "M13 17v2", key: "1ont0d" }],
  ["path", { d: "M13 11v2", key: "1wjjxi" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const L1 = K("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ag = K("Undo2", [
  ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
  [
    "path",
    {
      d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",
      key: "f3b9sd",
    },
  ],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const To = K("Upload", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
  ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const R_ = K("Utensils", [
  ["path", { d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2", key: "cjf0a3" }],
  ["path", { d: "M7 2v20", key: "1473qp" }],
  [
    "path",
    { d: "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7", key: "j28e5" },
  ],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $l = K("Wallet", [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6",
    },
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const M_ = K("Wrench", [
  [
    "path",
    {
      d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
      key: "cbrjhi",
    },
  ],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $o = K("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const T_ = K("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db",
    },
  ],
]);
async function Ie(e, t) {
  const n = await fetch(e, t),
    r = await n.json().catch(() => ({}));
  if (!n.ok) throw new Error(r.detail || n.statusText);
  return r;
}
const Ln = (e, t) => ({
    method: e,
    headers: { "Content-Type": "application/json" },
    body: t === void 0 ? void 0 : JSON.stringify(t),
  }),
  de = {
    conversation: () => Ie("/api/conversation"),
    snapshot: () => Ie("/api/snapshot"),
    accounts: () => Ie("/api/accounts"),
    setActive: (e) => Ie("/api/accounts/active", Ln("POST", { id: e })),
    deleteAccount: (e) => Ie(`/api/accounts/${e}`, { method: "DELETE" }),
    transactions: () => Ie("/api/transactions"),
    categories: () => Ie("/api/categories"),
    setCategory: (e, t, n = !0) =>
      Ie(
        `/api/transactions/${e}`,
        Ln("PATCH", { category: t, apply_to_merchant: n }),
      ),
    settings: () => Ie("/api/settings"),
    developmentLogs: () => Ie("/api/development-logs"),
    archiveDevelopmentLogs: () =>
      Ie("/api/development-logs/archive", { method: "POST" }),
    deleteSchedule: (e) => Ie(`/api/schedules/${e}`, { method: "DELETE" }),
    deleteTxn: (e) => Ie(`/api/transactions/${e}`, { method: "DELETE" }),
    undo: (e) => Ie("/api/undo", Ln("POST", { batch_id: e })),
    checkin: (e, t) => Ie("/api/checkin", Ln("POST", { kind: e, amount: t })),
    newAccount: (e) => Ie("/api/accounts/new", Ln("POST", { name: e })),
    saveSettings: (e) => Ie("/api/settings", Ln("PATCH", e)),
    plans: () => Ie("/api/plans"),
    acceptPlan: (e) => Ie("/api/plan/accept", Ln("POST", { plan: e })),
    resetChat: (e) =>
      Ie(`/api/chat/reset?session_id=${encodeURIComponent(e)}`, {
        method: "POST",
      }),
    importPreview: async (e) => {
      const t = new FormData();
      return (
        t.append("file", e),
        Ie("/api/import/preview", { method: "POST", body: t })
      );
    },
    importCommit: (e, t, n, r) =>
      Ie(
        "/api/import/commit",
        Ln("POST", { token: e, name: t, balance: n, target: r }),
      ),
  };
async function Fp(e, t, n, r) {
  const i = await fetch(e, { ...Ln("POST", t), signal: r });
  if (!i.ok || !i.body) {
    const u = await i.json().catch(() => ({}));
    throw new Error(u.detail || `Request failed (${i.status})`);
  }
  const o = i.body.getReader(),
    s = new TextDecoder();
  let a = "";
  for (;;) {
    const { value: u, done: c } = await o.read();
    if (c) break;
    a += s.decode(u, { stream: !0 });
    let d;
    for (
      ;
      (d = a.indexOf(`

`)) >= 0;
    ) {
      const f = a.slice(0, d).trim();
      if (((a = a.slice(d + 2)), f.startsWith("data:")))
        try {
          n(JSON.parse(f.slice(5)));
        } catch {}
    }
  }
}
const lg = {
  search_transactions: "Searched your transactions",
  get_spending_by_category: "Added up spending by category",
  check_affordability: "Checked affordability",
  get_income_details: "Looked at your paychecks",
  search_budget_knowledge: "Searched the budgeting guides",
  build_weekly_plan: "Calculated the weekly plan",
  log_spending: "Saved spending",
  log_income: "Saved income",
  set_bill: "Saved a bill",
  set_pay_schedule: "Saved your pay schedule",
  set_balance: "Updated your balance",
  set_savings_goal: "Saved your goal",
  update_savings_goal: "Updated your goal",
  set_typical_weekly_spending: "Saved your usual weekly spending",
  fix_last_entry: "Fixed the last entry",
  undo_last: "Undid the last entry",
};
function z1(e, t) {
  if (t.type === "step") {
    const n = {
        key: `step-${t.agent}-${e.length}`,
        kind: "step",
        who: t.agent,
        label: t.detail,
        status: t.status,
      },
      r = e.findIndex(
        (i) => i.kind === "step" && i.who === t.agent && i.status === "running",
      );
    if (r >= 0) {
      const i = e.map((o, s) =>
        s === r
          ? {
              ...o,
              status:
                t.status === "running"
                  ? "done"
                  : t.status === "error"
                    ? "error"
                    : "done",
            }
          : o,
      );
      return t.status === "running"
        ? [...i, n]
        : t.detail === "Answer written"
          ? i.map((o, s) =>
              s === r
                ? { ...o, label: "Read your numbers and wrote the answer" }
                : o,
            )
          : [...i, n];
    }
    return [...e, n];
  }
  if (t.type === "tool") {
    if (t.status === "running") {
      const r = t.args
        ? Object.entries(t.args)
            .filter(([, i]) => i !== "" && i !== null)
            .map(([i, o]) => `${i}: ${o}`)
            .join(", ")
        : "";
      return [
        ...e,
        {
          key: `tool-${e.length}`,
          kind: "tool",
          who: t.agent,
          label: `${lg[t.name] ?? t.name}${r ? ` (${r})` : ""}`,
          status: "running",
        },
      ];
    }
    const n = [...e]
      .reverse()
      .findIndex((r) => r.kind === "tool" && r.status === "running");
    if (n >= 0) {
      const r = e.length - 1 - n;
      return e.map((i, o) =>
        o === r
          ? {
              ...i,
              status: "done",
              label: `${i.label.split(" (")[0]}: ${t.summary}`,
            }
          : i,
      );
    }
    return [
      ...e,
      {
        key: `tool-${e.length}`,
        kind: "tool",
        who: t.agent,
        label: `${lg[t.name] ?? t.name}: ${t.summary ?? ""}`,
        status: "done",
      },
    ];
  }
  return t.type === "check"
    ? [
        ...e,
        {
          key: `check-${e.length}`,
          kind: "check",
          who: t.name,
          label: t.detail,
          status: t.status,
        },
      ]
    : e;
}
const F1 = w.createContext(null);
function A_({ children: e }) {
  const [t, n] = w.useState([]),
    [r, i] = w.useState(!1),
    o = w.useRef(null),
    s = lt(),
    { data: a } = Ge({ queryKey: ["accounts"], queryFn: de.accounts }),
    { data: u } = Ge({
      queryKey: ["conversation", a == null ? void 0 : a.active],
      queryFn: de.conversation,
      enabled: !!(a != null && a.active),
    }),
    c = w.useRef(null),
    d = w.useRef(!1);
  w.useEffect(() => {
    var p;
    if (a != null && a.active && u && c.current !== a.active) {
      ((c.current = a.active), (o.current = null), n([]));
      const v =
        (p = [...u.history].reverse().find((g) => g.plan)) == null
          ? void 0
          : p.plan;
      v && s.setQueryData(["draftPlan"], v);
    }
  }, [a == null ? void 0 : a.active, u, s]);
  const f = w.useCallback(
      async (p) => {
        var y;
        const v = p.trim();
        if (!v || d.current) return;
        ((d.current = !0), i(!0));
        const g =
            ((y = crypto.randomUUID) == null ? void 0 : y.call(crypto)) ??
            String(Date.now()),
          b = { id: `${g}-u`, role: "user", text: v, timeline: [] },
          m = {
            id: `${g}-a`,
            role: "assistant",
            text: "",
            timeline: [],
            pending: !0,
          };
        n((k) => [...k, b, m]);
        const x = (k) => n((N) => N.map((C) => (C.id === m.id ? k(C) : C)));
        try {
          await Fp("/api/chat", { message: v, session_id: o.current }, (k) => {
            k.type === "session"
              ? (o.current = k.session_id)
              : k.type === "token"
                ? x((N) => ({ ...N, text: N.text + k.text }))
                : k.type === "replace"
                  ? x((N) => ({ ...N, text: k.text }))
                  : k.type === "card" && k.kind === "afford"
                    ? x((N) => ({ ...N, afford: k.data }))
                    : k.type === "card" && k.kind === "saved"
                      ? x((N) => ({ ...N, saved: k.data }))
                      : k.type === "card" && k.kind === "plan"
                        ? (x((N) => ({ ...N, plan: k.data })),
                          s.setQueryData(["draftPlan"], k.data))
                        : k.type === "done"
                          ? x((N) => ({
                              ...N,
                              text: k.answer ?? N.text,
                              pending: !1,
                              elapsed: k.elapsed,
                              intent: k.intent,
                            }))
                          : k.type === "error"
                            ? x((N) => ({
                                ...N,
                                pending: !1,
                                error: k.message,
                              }))
                            : x((N) => ({ ...N, timeline: z1(N.timeline, k) }));
          });
        } catch (k) {
          x((N) => ({ ...N, pending: !1, error: k.message }));
        } finally {
          (x((k) => ({ ...k, pending: !1 })),
            i(!1),
            (d.current = !1),
            s.invalidateQueries());
        }
      },
      [r, s],
    ),
    h = w.useCallback(
      (p = !0) => {
        (p &&
          de
            .resetChat(o.current || "current")
            .then(() => s.invalidateQueries({ queryKey: ["conversation"] }))
            .catch(() => {}),
          p || (c.current = null),
          (o.current = null),
          n([]));
      },
      [s],
    );
  return l.jsx(F1.Provider, {
    value: { messages: t, busy: r, send: f, reset: h },
    children: e,
  });
}
const Pi = () => {
  const e = w.useContext(F1);
  if (!e) throw new Error("useChat outside ChatProvider");
  return e;
};
function B1(e) {
  var t,
    n,
    r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var i = e.length;
      for (t = 0; t < i; t++)
        e[t] && (n = B1(e[t])) && (r && (r += " "), (r += n));
    } else for (n in e) e[n] && (r && (r += " "), (r += n));
  return r;
}
function I_() {
  for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++)
    (e = arguments[n]) && (t = B1(e)) && (r && (r += " "), (r += t));
  return r;
}
const Bp = "-",
  O_ = (e) => {
    const t = L_(e),
      { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
    return {
      getClassGroupId: (s) => {
        const a = s.split(Bp);
        return (a[0] === "" && a.length !== 1 && a.shift(), $1(a, t) || D_(s));
      },
      getConflictingClassGroupIds: (s, a) => {
        const u = n[s] || [];
        return a && r[s] ? [...u, ...r[s]] : u;
      },
    };
  },
  $1 = (e, t) => {
    var s;
    if (e.length === 0) return t.classGroupId;
    const n = e[0],
      r = t.nextPart.get(n),
      i = r ? $1(e.slice(1), r) : void 0;
    if (i) return i;
    if (t.validators.length === 0) return;
    const o = e.join(Bp);
    return (s = t.validators.find(({ validator: a }) => a(o))) == null
      ? void 0
      : s.classGroupId;
  },
  ug = /^\[(.+)\]$/,
  D_ = (e) => {
    if (ug.test(e)) {
      const t = ug.exec(e)[1],
        n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
      if (n) return "arbitrary.." + n;
    }
  },
  L_ = (e) => {
    const { theme: t, prefix: n } = e,
      r = { nextPart: new Map(), validators: [] };
    return (
      F_(Object.entries(e.classGroups), n).forEach(([o, s]) => {
        Xd(s, r, o, t);
      }),
      r
    );
  },
  Xd = (e, t, n, r) => {
    e.forEach((i) => {
      if (typeof i == "string") {
        const o = i === "" ? t : cg(t, i);
        o.classGroupId = n;
        return;
      }
      if (typeof i == "function") {
        if (z_(i)) {
          Xd(i(r), t, n, r);
          return;
        }
        t.validators.push({ validator: i, classGroupId: n });
        return;
      }
      Object.entries(i).forEach(([o, s]) => {
        Xd(s, cg(t, o), n, r);
      });
    });
  },
  cg = (e, t) => {
    let n = e;
    return (
      t.split(Bp).forEach((r) => {
        (n.nextPart.has(r) ||
          n.nextPart.set(r, { nextPart: new Map(), validators: [] }),
          (n = n.nextPart.get(r)));
      }),
      n
    );
  },
  z_ = (e) => e.isThemeGetter,
  F_ = (e, t) =>
    t
      ? e.map(([n, r]) => {
          const i = r.map((o) =>
            typeof o == "string"
              ? t + o
              : typeof o == "object"
                ? Object.fromEntries(
                    Object.entries(o).map(([s, a]) => [t + s, a]),
                  )
                : o,
          );
          return [n, i];
        })
      : e,
  B_ = (e) => {
    if (e < 1) return { get: () => {}, set: () => {} };
    let t = 0,
      n = new Map(),
      r = new Map();
    const i = (o, s) => {
      (n.set(o, s), t++, t > e && ((t = 0), (r = n), (n = new Map())));
    };
    return {
      get(o) {
        let s = n.get(o);
        if (s !== void 0) return s;
        if ((s = r.get(o)) !== void 0) return (i(o, s), s);
      },
      set(o, s) {
        n.has(o) ? n.set(o, s) : i(o, s);
      },
    };
  },
  U1 = "!",
  $_ = (e) => {
    const { separator: t, experimentalParseClassName: n } = e,
      r = t.length === 1,
      i = t[0],
      o = t.length,
      s = (a) => {
        const u = [];
        let c = 0,
          d = 0,
          f;
        for (let b = 0; b < a.length; b++) {
          let m = a[b];
          if (c === 0) {
            if (m === i && (r || a.slice(b, b + o) === t)) {
              (u.push(a.slice(d, b)), (d = b + o));
              continue;
            }
            if (m === "/") {
              f = b;
              continue;
            }
          }
          m === "[" ? c++ : m === "]" && c--;
        }
        const h = u.length === 0 ? a : a.substring(d),
          p = h.startsWith(U1),
          v = p ? h.substring(1) : h,
          g = f && f > d ? f - d : void 0;
        return {
          modifiers: u,
          hasImportantModifier: p,
          baseClassName: v,
          maybePostfixModifierPosition: g,
        };
      };
    return n ? (a) => n({ className: a, parseClassName: s }) : s;
  },
  U_ = (e) => {
    if (e.length <= 1) return e;
    const t = [];
    let n = [];
    return (
      e.forEach((r) => {
        r[0] === "[" ? (t.push(...n.sort(), r), (n = [])) : n.push(r);
      }),
      t.push(...n.sort()),
      t
    );
  },
  W_ = (e) => ({ cache: B_(e.cacheSize), parseClassName: $_(e), ...O_(e) }),
  V_ = /\s+/,
  H_ = (e, t) => {
    const {
        parseClassName: n,
        getClassGroupId: r,
        getConflictingClassGroupIds: i,
      } = t,
      o = [],
      s = e.trim().split(V_);
    let a = "";
    for (let u = s.length - 1; u >= 0; u -= 1) {
      const c = s[u],
        {
          modifiers: d,
          hasImportantModifier: f,
          baseClassName: h,
          maybePostfixModifierPosition: p,
        } = n(c);
      let v = !!p,
        g = r(v ? h.substring(0, p) : h);
      if (!g) {
        if (!v) {
          a = c + (a.length > 0 ? " " + a : a);
          continue;
        }
        if (((g = r(h)), !g)) {
          a = c + (a.length > 0 ? " " + a : a);
          continue;
        }
        v = !1;
      }
      const b = U_(d).join(":"),
        m = f ? b + U1 : b,
        x = m + g;
      if (o.includes(x)) continue;
      o.push(x);
      const y = i(g, v);
      for (let k = 0; k < y.length; ++k) {
        const N = y[k];
        o.push(m + N);
      }
      a = c + (a.length > 0 ? " " + a : a);
    }
    return a;
  };
function q_() {
  let e = 0,
    t,
    n,
    r = "";
  for (; e < arguments.length;)
    (t = arguments[e++]) && (n = W1(t)) && (r && (r += " "), (r += n));
  return r;
}
const W1 = (e) => {
  if (typeof e == "string") return e;
  let t,
    n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = W1(e[r])) && (n && (n += " "), (n += t));
  return n;
};
function Q_(e, ...t) {
  let n,
    r,
    i,
    o = s;
  function s(u) {
    const c = t.reduce((d, f) => f(d), e());
    return ((n = W_(c)), (r = n.cache.get), (i = n.cache.set), (o = a), a(u));
  }
  function a(u) {
    const c = r(u);
    if (c) return c;
    const d = H_(u, n);
    return (i(u, d), d);
  }
  return function () {
    return o(q_.apply(null, arguments));
  };
}
const Ce = (e) => {
    const t = (n) => n[e] || [];
    return ((t.isThemeGetter = !0), t);
  },
  V1 = /^\[(?:([a-z-]+):)?(.+)\]$/i,
  K_ = /^\d+\/\d+$/,
  G_ = new Set(["px", "full", "screen"]),
  Y_ = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  X_ =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  Z_ = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
  J_ = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  eR =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  In = (e) => so(e) || G_.has(e) || K_.test(e),
  or = (e) => Uo(e, "length", lR),
  so = (e) => !!e && !Number.isNaN(Number(e)),
  vc = (e) => Uo(e, "number", so),
  Jo = (e) => !!e && Number.isInteger(Number(e)),
  tR = (e) => e.endsWith("%") && so(e.slice(0, -1)),
  se = (e) => V1.test(e),
  sr = (e) => Y_.test(e),
  nR = new Set(["length", "size", "percentage"]),
  rR = (e) => Uo(e, nR, H1),
  iR = (e) => Uo(e, "position", H1),
  oR = new Set(["image", "url"]),
  sR = (e) => Uo(e, oR, cR),
  aR = (e) => Uo(e, "", uR),
  es = () => !0,
  Uo = (e, t, n) => {
    const r = V1.exec(e);
    return r
      ? r[1]
        ? typeof t == "string"
          ? r[1] === t
          : t.has(r[1])
        : n(r[2])
      : !1;
  },
  lR = (e) => X_.test(e) && !Z_.test(e),
  H1 = () => !1,
  uR = (e) => J_.test(e),
  cR = (e) => eR.test(e),
  dR = () => {
    const e = Ce("colors"),
      t = Ce("spacing"),
      n = Ce("blur"),
      r = Ce("brightness"),
      i = Ce("borderColor"),
      o = Ce("borderRadius"),
      s = Ce("borderSpacing"),
      a = Ce("borderWidth"),
      u = Ce("contrast"),
      c = Ce("grayscale"),
      d = Ce("hueRotate"),
      f = Ce("invert"),
      h = Ce("gap"),
      p = Ce("gradientColorStops"),
      v = Ce("gradientColorStopPositions"),
      g = Ce("inset"),
      b = Ce("margin"),
      m = Ce("opacity"),
      x = Ce("padding"),
      y = Ce("saturate"),
      k = Ce("scale"),
      N = Ce("sepia"),
      C = Ce("skew"),
      j = Ce("space"),
      P = Ce("translate"),
      T = () => ["auto", "contain", "none"],
      I = () => ["auto", "hidden", "clip", "visible", "scroll"],
      D = () => ["auto", se, t],
      O = () => [se, t],
      $ = () => ["", In, or],
      G = () => ["auto", so, se],
      Q = () => [
        "bottom",
        "center",
        "left",
        "left-bottom",
        "left-top",
        "right",
        "right-bottom",
        "right-top",
        "top",
      ],
      V = () => ["solid", "dashed", "dotted", "double", "none"],
      Y = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      A = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
      ],
      _ = () => ["", "0", se],
      S = () => [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column",
      ],
      U = () => [so, se];
    return {
      cacheSize: 500,
      separator: ":",
      theme: {
        colors: [es],
        spacing: [In, or],
        blur: ["none", "", sr, se],
        brightness: U(),
        borderColor: [e],
        borderRadius: ["none", "", "full", sr, se],
        borderSpacing: O(),
        borderWidth: $(),
        contrast: U(),
        grayscale: _(),
        hueRotate: U(),
        invert: _(),
        gap: O(),
        gradientColorStops: [e],
        gradientColorStopPositions: [tR, or],
        inset: D(),
        margin: D(),
        opacity: U(),
        padding: O(),
        saturate: U(),
        scale: U(),
        sepia: _(),
        skew: U(),
        space: O(),
        translate: O(),
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", "video", se] }],
        container: ["container"],
        columns: [{ columns: [sr] }],
        "break-after": [{ "break-after": S() }],
        "break-before": [{ "break-before": S() }],
        "break-inside": [
          { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
        ],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [
          { object: ["contain", "cover", "fill", "none", "scale-down"] },
        ],
        "object-position": [{ object: [...Q(), se] }],
        overflow: [{ overflow: I() }],
        "overflow-x": [{ "overflow-x": I() }],
        "overflow-y": [{ "overflow-y": I() }],
        overscroll: [{ overscroll: T() }],
        "overscroll-x": [{ "overscroll-x": T() }],
        "overscroll-y": [{ "overscroll-y": T() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: [g] }],
        "inset-x": [{ "inset-x": [g] }],
        "inset-y": [{ "inset-y": [g] }],
        start: [{ start: [g] }],
        end: [{ end: [g] }],
        top: [{ top: [g] }],
        right: [{ right: [g] }],
        bottom: [{ bottom: [g] }],
        left: [{ left: [g] }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: ["auto", Jo, se] }],
        basis: [{ basis: D() }],
        "flex-direction": [
          { flex: ["row", "row-reverse", "col", "col-reverse"] },
        ],
        "flex-wrap": [{ flex: ["wrap", "wrap-reverse", "nowrap"] }],
        flex: [{ flex: ["1", "auto", "initial", "none", se] }],
        grow: [{ grow: _() }],
        shrink: [{ shrink: _() }],
        order: [{ order: ["first", "last", "none", Jo, se] }],
        "grid-cols": [{ "grid-cols": [es] }],
        "col-start-end": [{ col: ["auto", { span: ["full", Jo, se] }, se] }],
        "col-start": [{ "col-start": G() }],
        "col-end": [{ "col-end": G() }],
        "grid-rows": [{ "grid-rows": [es] }],
        "row-start-end": [{ row: ["auto", { span: [Jo, se] }, se] }],
        "row-start": [{ "row-start": G() }],
        "row-end": [{ "row-end": G() }],
        "grid-flow": [
          { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
        ],
        "auto-cols": [{ "auto-cols": ["auto", "min", "max", "fr", se] }],
        "auto-rows": [{ "auto-rows": ["auto", "min", "max", "fr", se] }],
        gap: [{ gap: [h] }],
        "gap-x": [{ "gap-x": [h] }],
        "gap-y": [{ "gap-y": [h] }],
        "justify-content": [{ justify: ["normal", ...A()] }],
        "justify-items": [
          { "justify-items": ["start", "end", "center", "stretch"] },
        ],
        "justify-self": [
          { "justify-self": ["auto", "start", "end", "center", "stretch"] },
        ],
        "align-content": [{ content: ["normal", ...A(), "baseline"] }],
        "align-items": [
          { items: ["start", "end", "center", "baseline", "stretch"] },
        ],
        "align-self": [
          { self: ["auto", "start", "end", "center", "stretch", "baseline"] },
        ],
        "place-content": [{ "place-content": [...A(), "baseline"] }],
        "place-items": [
          { "place-items": ["start", "end", "center", "baseline", "stretch"] },
        ],
        "place-self": [
          { "place-self": ["auto", "start", "end", "center", "stretch"] },
        ],
        p: [{ p: [x] }],
        px: [{ px: [x] }],
        py: [{ py: [x] }],
        ps: [{ ps: [x] }],
        pe: [{ pe: [x] }],
        pt: [{ pt: [x] }],
        pr: [{ pr: [x] }],
        pb: [{ pb: [x] }],
        pl: [{ pl: [x] }],
        m: [{ m: [b] }],
        mx: [{ mx: [b] }],
        my: [{ my: [b] }],
        ms: [{ ms: [b] }],
        me: [{ me: [b] }],
        mt: [{ mt: [b] }],
        mr: [{ mr: [b] }],
        mb: [{ mb: [b] }],
        ml: [{ ml: [b] }],
        "space-x": [{ "space-x": [j] }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": [j] }],
        "space-y-reverse": ["space-y-reverse"],
        w: [{ w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", se, t] }],
        "min-w": [{ "min-w": [se, t, "min", "max", "fit"] }],
        "max-w": [
          {
            "max-w": [
              se,
              t,
              "none",
              "full",
              "min",
              "max",
              "fit",
              "prose",
              { screen: [sr] },
              sr,
            ],
          },
        ],
        h: [{ h: [se, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"] }],
        "min-h": [
          { "min-h": [se, t, "min", "max", "fit", "svh", "lvh", "dvh"] },
        ],
        "max-h": [
          { "max-h": [se, t, "min", "max", "fit", "svh", "lvh", "dvh"] },
        ],
        size: [{ size: [se, t, "auto", "min", "max", "fit"] }],
        "font-size": [{ text: ["base", sr, or] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [
          {
            font: [
              "thin",
              "extralight",
              "light",
              "normal",
              "medium",
              "semibold",
              "bold",
              "extrabold",
              "black",
              vc,
            ],
          },
        ],
        "font-family": [{ font: [es] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
        tracking: [
          {
            tracking: [
              "tighter",
              "tight",
              "normal",
              "wide",
              "wider",
              "widest",
              se,
            ],
          },
        ],
        "line-clamp": [{ "line-clamp": ["none", so, vc] }],
        leading: [
          {
            leading: [
              "none",
              "tight",
              "snug",
              "normal",
              "relaxed",
              "loose",
              In,
              se,
            ],
          },
        ],
        "list-image": [{ "list-image": ["none", se] }],
        "list-style-type": [{ list: ["none", "disc", "decimal", se] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "placeholder-color": [{ placeholder: [e] }],
        "placeholder-opacity": [{ "placeholder-opacity": [m] }],
        "text-alignment": [
          { text: ["left", "center", "right", "justify", "start", "end"] },
        ],
        "text-color": [{ text: [e] }],
        "text-opacity": [{ "text-opacity": [m] }],
        "text-decoration": [
          "underline",
          "overline",
          "line-through",
          "no-underline",
        ],
        "text-decoration-style": [{ decoration: [...V(), "wavy"] }],
        "text-decoration-thickness": [
          { decoration: ["auto", "from-font", In, or] },
        ],
        "underline-offset": [{ "underline-offset": ["auto", In, se] }],
        "text-decoration-color": [{ decoration: [e] }],
        "text-transform": [
          "uppercase",
          "lowercase",
          "capitalize",
          "normal-case",
        ],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: O() }],
        "vertical-align": [
          {
            align: [
              "baseline",
              "top",
              "middle",
              "bottom",
              "text-top",
              "text-bottom",
              "sub",
              "super",
              se,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              "normal",
              "nowrap",
              "pre",
              "pre-line",
              "pre-wrap",
              "break-spaces",
            ],
          },
        ],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", se] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-opacity": [{ "bg-opacity": [m] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: [...Q(), iR] }],
        "bg-repeat": [
          { bg: ["no-repeat", { repeat: ["", "x", "y", "round", "space"] }] },
        ],
        "bg-size": [{ bg: ["auto", "cover", "contain", rR] }],
        "bg-image": [
          {
            bg: [
              "none",
              { "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
              sR,
            ],
          },
        ],
        "bg-color": [{ bg: [e] }],
        "gradient-from-pos": [{ from: [v] }],
        "gradient-via-pos": [{ via: [v] }],
        "gradient-to-pos": [{ to: [v] }],
        "gradient-from": [{ from: [p] }],
        "gradient-via": [{ via: [p] }],
        "gradient-to": [{ to: [p] }],
        rounded: [{ rounded: [o] }],
        "rounded-s": [{ "rounded-s": [o] }],
        "rounded-e": [{ "rounded-e": [o] }],
        "rounded-t": [{ "rounded-t": [o] }],
        "rounded-r": [{ "rounded-r": [o] }],
        "rounded-b": [{ "rounded-b": [o] }],
        "rounded-l": [{ "rounded-l": [o] }],
        "rounded-ss": [{ "rounded-ss": [o] }],
        "rounded-se": [{ "rounded-se": [o] }],
        "rounded-ee": [{ "rounded-ee": [o] }],
        "rounded-es": [{ "rounded-es": [o] }],
        "rounded-tl": [{ "rounded-tl": [o] }],
        "rounded-tr": [{ "rounded-tr": [o] }],
        "rounded-br": [{ "rounded-br": [o] }],
        "rounded-bl": [{ "rounded-bl": [o] }],
        "border-w": [{ border: [a] }],
        "border-w-x": [{ "border-x": [a] }],
        "border-w-y": [{ "border-y": [a] }],
        "border-w-s": [{ "border-s": [a] }],
        "border-w-e": [{ "border-e": [a] }],
        "border-w-t": [{ "border-t": [a] }],
        "border-w-r": [{ "border-r": [a] }],
        "border-w-b": [{ "border-b": [a] }],
        "border-w-l": [{ "border-l": [a] }],
        "border-opacity": [{ "border-opacity": [m] }],
        "border-style": [{ border: [...V(), "hidden"] }],
        "divide-x": [{ "divide-x": [a] }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": [a] }],
        "divide-y-reverse": ["divide-y-reverse"],
        "divide-opacity": [{ "divide-opacity": [m] }],
        "divide-style": [{ divide: V() }],
        "border-color": [{ border: [i] }],
        "border-color-x": [{ "border-x": [i] }],
        "border-color-y": [{ "border-y": [i] }],
        "border-color-s": [{ "border-s": [i] }],
        "border-color-e": [{ "border-e": [i] }],
        "border-color-t": [{ "border-t": [i] }],
        "border-color-r": [{ "border-r": [i] }],
        "border-color-b": [{ "border-b": [i] }],
        "border-color-l": [{ "border-l": [i] }],
        "divide-color": [{ divide: [i] }],
        "outline-style": [{ outline: ["", ...V()] }],
        "outline-offset": [{ "outline-offset": [In, se] }],
        "outline-w": [{ outline: [In, or] }],
        "outline-color": [{ outline: [e] }],
        "ring-w": [{ ring: $() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: [e] }],
        "ring-opacity": [{ "ring-opacity": [m] }],
        "ring-offset-w": [{ "ring-offset": [In, or] }],
        "ring-offset-color": [{ "ring-offset": [e] }],
        shadow: [{ shadow: ["", "inner", "none", sr, aR] }],
        "shadow-color": [{ shadow: [es] }],
        opacity: [{ opacity: [m] }],
        "mix-blend": [{ "mix-blend": [...Y(), "plus-lighter", "plus-darker"] }],
        "bg-blend": [{ "bg-blend": Y() }],
        filter: [{ filter: ["", "none"] }],
        blur: [{ blur: [n] }],
        brightness: [{ brightness: [r] }],
        contrast: [{ contrast: [u] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", sr, se] }],
        grayscale: [{ grayscale: [c] }],
        "hue-rotate": [{ "hue-rotate": [d] }],
        invert: [{ invert: [f] }],
        saturate: [{ saturate: [y] }],
        sepia: [{ sepia: [N] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
        "backdrop-blur": [{ "backdrop-blur": [n] }],
        "backdrop-brightness": [{ "backdrop-brightness": [r] }],
        "backdrop-contrast": [{ "backdrop-contrast": [u] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": [c] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [d] }],
        "backdrop-invert": [{ "backdrop-invert": [f] }],
        "backdrop-opacity": [{ "backdrop-opacity": [m] }],
        "backdrop-saturate": [{ "backdrop-saturate": [y] }],
        "backdrop-sepia": [{ "backdrop-sepia": [N] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": [s] }],
        "border-spacing-x": [{ "border-spacing-x": [s] }],
        "border-spacing-y": [{ "border-spacing-y": [s] }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          {
            transition: [
              "none",
              "all",
              "",
              "colors",
              "opacity",
              "shadow",
              "transform",
              se,
            ],
          },
        ],
        duration: [{ duration: U() }],
        ease: [{ ease: ["linear", "in", "out", "in-out", se] }],
        delay: [{ delay: U() }],
        animate: [{ animate: ["none", "spin", "ping", "pulse", "bounce", se] }],
        transform: [{ transform: ["", "gpu", "none"] }],
        scale: [{ scale: [k] }],
        "scale-x": [{ "scale-x": [k] }],
        "scale-y": [{ "scale-y": [k] }],
        rotate: [{ rotate: [Jo, se] }],
        "translate-x": [{ "translate-x": [P] }],
        "translate-y": [{ "translate-y": [P] }],
        "skew-x": [{ "skew-x": [C] }],
        "skew-y": [{ "skew-y": [C] }],
        "transform-origin": [
          {
            origin: [
              "center",
              "top",
              "top-right",
              "right",
              "bottom-right",
              "bottom",
              "bottom-left",
              "left",
              "top-left",
              se,
            ],
          },
        ],
        accent: [{ accent: ["auto", e] }],
        appearance: [{ appearance: ["none", "auto"] }],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              se,
            ],
          },
        ],
        "caret-color": [{ caret: [e] }],
        "pointer-events": [{ "pointer-events": ["none", "auto"] }],
        resize: [{ resize: ["none", "y", "x", ""] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": O() }],
        "scroll-mx": [{ "scroll-mx": O() }],
        "scroll-my": [{ "scroll-my": O() }],
        "scroll-ms": [{ "scroll-ms": O() }],
        "scroll-me": [{ "scroll-me": O() }],
        "scroll-mt": [{ "scroll-mt": O() }],
        "scroll-mr": [{ "scroll-mr": O() }],
        "scroll-mb": [{ "scroll-mb": O() }],
        "scroll-ml": [{ "scroll-ml": O() }],
        "scroll-p": [{ "scroll-p": O() }],
        "scroll-px": [{ "scroll-px": O() }],
        "scroll-py": [{ "scroll-py": O() }],
        "scroll-ps": [{ "scroll-ps": O() }],
        "scroll-pe": [{ "scroll-pe": O() }],
        "scroll-pt": [{ "scroll-pt": O() }],
        "scroll-pr": [{ "scroll-pr": O() }],
        "scroll-pb": [{ "scroll-pb": O() }],
        "scroll-pl": [{ "scroll-pl": O() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [
          { "will-change": ["auto", "scroll", "contents", "transform", se] },
        ],
        fill: [{ fill: [e, "none"] }],
        "stroke-w": [{ stroke: [In, or, vc] }],
        stroke: [{ stroke: [e, "none"] }],
        sr: ["sr-only", "not-sr-only"],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: [
          "inset-x",
          "inset-y",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left",
        ],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction",
        ],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-s",
          "border-w-e",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-s",
          "border-color-e",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
    };
  },
  fR = Q_(dR),
  ke = (...e) => fR(I_(e)),
  pR = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }),
  hR = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }),
  ie = (e, t = !1) =>
    e == null || Number.isNaN(e)
      ? "—"
      : (t ? hR : pR).format(e).replace("-$", "−$"),
  mR = (e) => {
    const [t, n, r] = e.slice(0, 10).split("-").map(Number);
    return new Date(t, n - 1, r);
  },
  ze = (e) =>
    mR(e).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
  Fa = [
    { to: "/", label: "Home", icon: R1, end: !0 },
    { to: "/spending", label: "Activity", icon: A1 },
    { to: "/plan", label: "Plan", icon: Mo },
  ];
function Zd({ className: e = "" }) {
  return l.jsxs("span", {
    className: ke("flex items-center gap-2.5", e),
    children: [
      l.jsxs("svg", {
        className: "brand-mark",
        width: "27",
        height: "27",
        viewBox: "0 0 64 64",
        "aria-hidden": !0,
        children: [
          l.jsx("path", {
            className: "brand-mark-primary",
            d: "M5 48 24 28 36 38 57 12",
            stroke: "rgb(var(--forest))",
            strokeWidth: "5",
            fill: "none",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }),
          l.jsx("path", {
            d: "M43 12h14v14",
            stroke: "rgb(var(--marigold))",
            strokeWidth: "5",
            fill: "none",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }),
        ],
      }),
      l.jsx("span", {
        className:
          "hidden font-display text-[1.18rem] font-bold tracking-tight min-[360px]:inline",
        children: "BudgetWise",
      }),
    ],
  });
}
function gR() {
  const [e, t] = w.useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  return (
    w.useEffect(() => {
      document.documentElement.classList.toggle("dark", e);
      try {
        localStorage.setItem("bw-theme", e ? "dark" : "light");
      } catch {}
    }, [e]),
    { dark: e, toggle: () => t((n) => !n) }
  );
}
function dg({ compact: e = !1 }) {
  const t = lt(),
    n = Jn(),
    { reset: r, busy: i } = Pi(),
    { data: o } = Ge({ queryKey: ["accounts"], queryFn: de.accounts }),
    s = o == null ? void 0 : o.accounts.find((u) => u.id === o.active),
    a = async (u) => {
      (await de.setActive(u), r(!1), await t.invalidateQueries());
    };
  return l.jsxs(b1, {
    children: [
      l.jsxs(k1, {
        disabled: i,
        className: ke(
          "flex w-full items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2.5 text-left hover:bg-sunken",
          e && "w-auto border-0 bg-transparent px-2 py-1.5",
        ),
        "aria-label": "Switch account",
        children: [
          l.jsx("span", {
            className:
              "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest-soft text-sm font-bold text-forest",
            children: (s == null ? void 0 : s.kind) === "demo" ? s.emoji : "MW",
          }),
          e &&
            l.jsx("span", {
              className: "hidden text-sm font-medium xl:inline",
              children:
                (s == null ? void 0 : s.kind) === "demo"
                  ? s.name
                  : "My workspace",
            }),
          !e &&
            l.jsxs("span", {
              className: "min-w-0 flex-1",
              children: [
                l.jsx("span", {
                  className: "block truncate font-semibold leading-tight",
                  children: (s == null ? void 0 : s.name) ?? "Loading",
                }),
                l.jsx("span", {
                  className: "block truncate text-[0.8rem] text-muted",
                  children:
                    (s == null ? void 0 : s.kind) === "demo"
                      ? `Demo: ${s.tagline}`
                      : "Your account",
                }),
              ],
            }),
          l.jsx(i_, { size: 16, className: "shrink-0 text-faint" }),
        ],
      }),
      l.jsx(S1, {
        children: l.jsxs(C1, {
          sideOffset: 8,
          align: "start",
          className:
            "z-50 w-72 rounded-2xl border border-line bg-surface p-1.5 shadow-lift animate-rise",
          children: [
            l.jsx(N1, {
              className: "px-3 pb-1 pt-2 text-[0.8rem] text-muted",
              children: "Your workspace",
            }),
            o == null
              ? void 0
              : o.accounts
                  .filter((u) => u.kind === "personal")
                  .map((u) =>
                    l.jsxs(
                      Li,
                      {
                        onSelect: () => a(u.id),
                        className:
                          "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 outline-none data-[highlighted]:bg-sunken",
                        children: [
                          l.jsx("span", {
                            className: "text-lg",
                            children: u.emoji,
                          }),
                          l.jsx("span", {
                            className: "flex-1 font-medium",
                            children: u.name,
                          }),
                          u.id === o.active &&
                            l.jsx(Jt, { size: 16, className: "text-forest" }),
                        ],
                      },
                      u.id,
                    ),
                  ),
            l.jsx(VP, { className: "my-1.5 h-px bg-line" }),
            l.jsxs(Li, {
              onSelect: () => n("/examples"),
              className:
                "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 font-medium outline-none data-[highlighted]:bg-sunken",
              children: [
                l.jsx(ua, { size: 18, className: "text-marigold" }),
                " View example profiles",
              ],
            }),
            l.jsxs(Li, {
              onSelect: () => n("/accounts"),
              className:
                "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 font-medium outline-none data-[highlighted]:bg-sunken",
              children: [l.jsx(I1, { size: 18 }), " Settings and accounts"],
            }),
            l.jsxs(Li, {
              onSelect: () => n("/accounts#upload"),
              className:
                "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 font-medium text-forest outline-none data-[highlighted]:bg-sunken",
              children: [l.jsx(To, { size: 18 }), " Add your bank's CSV"],
            }),
            l.jsxs(Li, {
              onSelect: () => n("/setup?new=1"),
              className:
                "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 font-medium text-forest outline-none data-[highlighted]:bg-sunken",
              children: [l.jsx(T1, { size: 18 }), " Start without a file"],
            }),
          ],
        }),
      }),
    ],
  });
}
function yR() {
  const e = lt(),
    { reset: t } = Pi(),
    { data: n } = Ge({ queryKey: ["accounts"], queryFn: de.accounts }),
    r = n == null ? void 0 : n.accounts.find((s) => s.id === n.active),
    i = n == null ? void 0 : n.accounts.find((s) => s.kind === "personal");
  if ((r == null ? void 0 : r.kind) !== "demo" || !i) return null;
  const o = async () => {
    (await de.setActive(i.id), t(!1), await e.invalidateQueries());
  };
  return l.jsxs("div", {
    className:
      "sticky top-3 z-20 mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-marigold/35 bg-marigold-soft px-4 py-3 text-[0.9rem] shadow-sm",
    children: [
      l.jsxs("span", {
        children: [
          l.jsx("strong", { children: "Example mode:" }),
          " You're viewing ",
          r.name,
          "'s sample data. Nothing here is part of your personal workspace.",
        ],
      }),
      l.jsx("button", {
        onClick: () => void o(),
        className:
          "btn bg-surface px-3 py-1.5 text-[0.85rem] text-ink hover:bg-sunken",
        children: "Return to my workspace",
      }),
    ],
  });
}
function xR() {
  const { dark: e, toggle: t } = gR(),
    n = Ur();
  w.useEffect(() => {
    window.scrollTo(0, 0);
  }, [n.pathname]);
  const r = e ? P_ : x_;
  return l.jsxs("div", {
    className: "min-h-screen",
    children: [
      l.jsxs("aside", {
        className: "hidden",
        children: [
          l.jsx(Zd, { className: "px-2" }),
          l.jsx(dg, {}),
          l.jsx("nav", {
            className: "flex flex-col gap-1",
            "aria-label": "Main",
            children: Fa.map(({ to: i, label: o, icon: s, end: a }) =>
              l.jsxs(
                oc,
                {
                  to: i,
                  end: a,
                  className: ({ isActive: u }) =>
                    ke(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-muted hover:bg-sunken hover:text-ink",
                      u &&
                        "bg-forest-soft text-forest hover:bg-forest-soft hover:text-forest",
                    ),
                  children: [l.jsx(s, { size: 19, strokeWidth: 2.1 }), " ", o],
                },
                i,
              ),
            ),
          }),
          l.jsx("div", {
            className: "mt-auto space-y-3",
            children: l.jsxs("button", {
              onClick: t,
              className: "btn-ghost w-full justify-start px-3",
              children: [
                l.jsx(r, { size: 18 }),
                " ",
                e ? "Light mode" : "Dark mode",
              ],
            }),
          }),
        ],
      }),
      l.jsxs("header", {
        className:
          "brand-header sticky top-0 z-30 flex min-h-[64px] items-center justify-between gap-2 border-b border-white/10 px-3 py-2 text-white shadow-sm min-[360px]:gap-4 min-[360px]:px-4 sm:px-8",
        children: [
          l.jsx(Zd, {}),
          l.jsx("nav", {
            className: "hidden items-center gap-3 md:flex",
            "aria-label": "Main",
            children: Fa.map(({ to: i, label: o, end: s }) =>
              l.jsx(
                oc,
                {
                  to: i,
                  end: s,
                  className: ({ isActive: a }) =>
                    ke(
                      "rounded-xl px-4 py-2 text-sm font-semibold transition-colors",
                      a
                        ? "bg-white/16 text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white",
                    ),
                  children: o,
                },
                i,
              ),
            ),
          }),
          l.jsxs("div", {
            className: "flex items-center gap-1",
            children: [
              l.jsx(It, {
                to: "/examples",
                className: "btn-ghost hidden text-sm lg:inline-flex",
                children: "View example",
              }),
              l.jsxs(It, {
                to: "/accounts",
                className: "btn-ghost hidden text-sm sm:inline-flex",
                children: [l.jsx(I1, { size: 17 }), " Settings"],
              }),
              l.jsx(dg, { compact: !0 }),
              l.jsx("button", {
                onClick: t,
                className: "btn-ghost p-2",
                "aria-label": e ? "Light mode" : "Dark mode",
                children: l.jsx(r, { size: 18 }),
              }),
            ],
          }),
        ],
      }),
      l.jsx("main", {
        className: "min-w-0 px-4 pb-24 pt-4 sm:px-8 md:pb-3 lg:pt-5",
        children: l.jsxs("div", {
          className: "mx-auto max-w-[1480px]",
          children: [l.jsx(yR, {}), l.jsx(y2, {})],
        }),
      }),
      l.jsx("nav", {
        className:
          "fixed inset-x-0 bottom-0 z-30 grid border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden",
        style: { gridTemplateColumns: `repeat(${Fa.length}, minmax(0, 1fr))` },
        "aria-label": "Main",
        children: Fa.map(({ to: i, label: o, icon: s, end: a }) =>
          l.jsxs(
            oc,
            {
              to: i,
              end: a,
              className: ({ isActive: u }) =>
                ke(
                  "flex flex-col items-center gap-0.5 py-2.5 text-[0.72rem] font-medium text-muted",
                  u && "text-forest",
                ),
              children: [l.jsx(s, { size: 21, strokeWidth: 2.1 }), " ", o],
            },
            i,
          ),
        ),
      }),
    ],
  });
}
var $p = "Dialog",
  [q1] = yp($p),
  [vR, pn] = q1($p),
  Q1 = (e) => {
    const {
        __scopeDialog: t,
        children: n,
        open: r,
        defaultOpen: i,
        onOpenChange: o,
        modal: s = !0,
      } = e,
      a = w.useRef(null),
      u = w.useRef(null),
      [c = !1, d] = xp({ prop: r, defaultProp: i, onChange: o });
    return l.jsx(vR, {
      scope: t,
      triggerRef: a,
      contentRef: u,
      contentId: ro(),
      titleId: ro(),
      descriptionId: ro(),
      open: c,
      onOpenChange: d,
      onOpenToggle: w.useCallback(() => d((f) => !f), [d]),
      modal: s,
      children: n,
    });
  };
Q1.displayName = $p;
var K1 = "DialogTrigger",
  G1 = w.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      i = pn(K1, n),
      o = tt(t, i.triggerRef);
    return l.jsx($e.button, {
      type: "button",
      "aria-haspopup": "dialog",
      "aria-expanded": i.open,
      "aria-controls": i.contentId,
      "data-state": Vp(i.open),
      ...r,
      ref: o,
      onClick: le(e.onClick, i.onOpenToggle),
    });
  });
G1.displayName = K1;
var Up = "DialogPortal",
  [wR, Y1] = q1(Up, { forceMount: void 0 }),
  X1 = (e) => {
    const { __scopeDialog: t, forceMount: n, children: r, container: i } = e,
      o = pn(Up, t);
    return l.jsx(wR, {
      scope: t,
      forceMount: n,
      children: w.Children.map(r, (s) =>
        l.jsx(Vr, {
          present: n || o.open,
          children: l.jsx(_p, { asChild: !0, container: i, children: s }),
        }),
      ),
    });
  };
X1.displayName = Up;
var Ul = "DialogOverlay",
  Z1 = w.forwardRef((e, t) => {
    const n = Y1(Ul, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...i } = e,
      o = pn(Ul, e.__scopeDialog);
    return o.modal
      ? l.jsx(Vr, {
          present: r || o.open,
          children: l.jsx(bR, { ...i, ref: t }),
        })
      : null;
  });
Z1.displayName = Ul;
var bR = w.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      i = pn(Ul, n);
    return l.jsx(Rp, {
      as: Ro,
      allowPinchZoom: !0,
      shards: [i.contentRef],
      children: l.jsx($e.div, {
        "data-state": Vp(i.open),
        ...r,
        ref: t,
        style: { pointerEvents: "auto", ...r.style },
      }),
    });
  }),
  Si = "DialogContent",
  J1 = w.forwardRef((e, t) => {
    const n = Y1(Si, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...i } = e,
      o = pn(Si, e.__scopeDialog);
    return l.jsx(Vr, {
      present: r || o.open,
      children: o.modal
        ? l.jsx(kR, { ...i, ref: t })
        : l.jsx(SR, { ...i, ref: t }),
    });
  });
J1.displayName = Si;
var kR = w.forwardRef((e, t) => {
    const n = pn(Si, e.__scopeDialog),
      r = w.useRef(null),
      i = tt(t, n.contentRef, r);
    return (
      w.useEffect(() => {
        const o = r.current;
        if (o) return I0(o);
      }, []),
      l.jsx(ew, {
        ...e,
        ref: i,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: le(e.onCloseAutoFocus, (o) => {
          var s;
          (o.preventDefault(), (s = n.triggerRef.current) == null || s.focus());
        }),
        onPointerDownOutside: le(e.onPointerDownOutside, (o) => {
          const s = o.detail.originalEvent,
            a = s.button === 0 && s.ctrlKey === !0;
          (s.button === 2 || a) && o.preventDefault();
        }),
        onFocusOutside: le(e.onFocusOutside, (o) => o.preventDefault()),
      })
    );
  }),
  SR = w.forwardRef((e, t) => {
    const n = pn(Si, e.__scopeDialog),
      r = w.useRef(!1),
      i = w.useRef(!1);
    return l.jsx(ew, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (o) => {
        var s, a;
        ((s = e.onCloseAutoFocus) == null || s.call(e, o),
          o.defaultPrevented ||
            (r.current || (a = n.triggerRef.current) == null || a.focus(),
            o.preventDefault()),
          (r.current = !1),
          (i.current = !1));
      },
      onInteractOutside: (o) => {
        var u, c;
        ((u = e.onInteractOutside) == null || u.call(e, o),
          o.defaultPrevented ||
            ((r.current = !0),
            o.detail.originalEvent.type === "pointerdown" && (i.current = !0)));
        const s = o.target;
        (((c = n.triggerRef.current) == null ? void 0 : c.contains(s)) &&
          o.preventDefault(),
          o.detail.originalEvent.type === "focusin" &&
            i.current &&
            o.preventDefault());
      },
    });
  }),
  ew = w.forwardRef((e, t) => {
    const {
        __scopeDialog: n,
        trapFocus: r,
        onOpenAutoFocus: i,
        onCloseAutoFocus: o,
        ...s
      } = e,
      a = pn(Si, n),
      u = w.useRef(null),
      c = tt(t, u);
    return (
      r0(),
      l.jsxs(l.Fragment, {
        children: [
          l.jsx(wp, {
            asChild: !0,
            loop: !0,
            trapped: r,
            onMountAutoFocus: i,
            onUnmountAutoFocus: o,
            children: l.jsx(vp, {
              role: "dialog",
              id: a.contentId,
              "aria-describedby": a.descriptionId,
              "aria-labelledby": a.titleId,
              "data-state": Vp(a.open),
              ...s,
              ref: c,
              onDismiss: () => a.onOpenChange(!1),
            }),
          }),
          l.jsxs(l.Fragment, {
            children: [
              l.jsx(CR, { titleId: a.titleId }),
              l.jsx(ER, { contentRef: u, descriptionId: a.descriptionId }),
            ],
          }),
        ],
      })
    );
  }),
  Wp = "DialogTitle",
  tw = w.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      i = pn(Wp, n);
    return l.jsx($e.h2, { id: i.titleId, ...r, ref: t });
  });
tw.displayName = Wp;
var nw = "DialogDescription",
  rw = w.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      i = pn(nw, n);
    return l.jsx($e.p, { id: i.descriptionId, ...r, ref: t });
  });
rw.displayName = nw;
var iw = "DialogClose",
  ow = w.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      i = pn(iw, n);
    return l.jsx($e.button, {
      type: "button",
      ...r,
      ref: t,
      onClick: le(e.onClick, () => i.onOpenChange(!1)),
    });
  });
ow.displayName = iw;
function Vp(e) {
  return e ? "open" : "closed";
}
var sw = "DialogTitleWarning",
  [k5, aw] = LC(sw, { contentName: Si, titleName: Wp, docsSlug: "dialog" }),
  CR = ({ titleId: e }) => {
    const t = aw(sw),
      n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
    return (
      w.useEffect(() => {
        e && (document.getElementById(e) || console.error(n));
      }, [n, e]),
      null
    );
  },
  NR = "DialogDescriptionWarning",
  ER = ({ contentRef: e, descriptionId: t }) => {
    const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${aw(NR).contentName}}.`;
    return (
      w.useEffect(() => {
        var o;
        const i =
          (o = e.current) == null ? void 0 : o.getAttribute("aria-describedby");
        t && i && (document.getElementById(t) || console.warn(r));
      }, [r, e, t]),
      null
    );
  },
  lw = Q1,
  jR = G1,
  uw = X1,
  cw = Z1,
  dw = J1,
  Jd = tw,
  ef = rw,
  fg = ow;
function PR(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e)
    .join((n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " "))
    .trim();
}
const _R = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,
  RR = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,
  MR = {};
function pg(e, t) {
  return (MR.jsx ? RR : _R).test(e);
}
const TR = /[ \t\n\f\r]/g;
function AR(e) {
  return typeof e == "object" ? (e.type === "text" ? hg(e.value) : !1) : hg(e);
}
function hg(e) {
  return e.replace(TR, "") === "";
}
class ca {
  constructor(t, n, r) {
    ((this.normal = n), (this.property = t), r && (this.space = r));
  }
}
ca.prototype.normal = {};
ca.prototype.property = {};
ca.prototype.space = void 0;
function fw(e, t) {
  const n = {},
    r = {};
  for (const i of e) (Object.assign(n, i.property), Object.assign(r, i.normal));
  return new ca(n, r, t);
}
function tf(e) {
  return e.toLowerCase();
}
class Pt {
  constructor(t, n) {
    ((this.attribute = n), (this.property = t));
  }
}
Pt.prototype.attribute = "";
Pt.prototype.booleanish = !1;
Pt.prototype.boolean = !1;
Pt.prototype.commaOrSpaceSeparated = !1;
Pt.prototype.commaSeparated = !1;
Pt.prototype.defined = !1;
Pt.prototype.mustUseProperty = !1;
Pt.prototype.number = !1;
Pt.prototype.overloadedBoolean = !1;
Pt.prototype.property = "";
Pt.prototype.spaceSeparated = !1;
Pt.prototype.space = void 0;
let IR = 0;
const re = _i(),
  Fe = _i(),
  nf = _i(),
  z = _i(),
  we = _i(),
  pi = _i(),
  _t = _i();
function _i() {
  return 2 ** ++IR;
}
const rf = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        boolean: re,
        booleanish: Fe,
        commaOrSpaceSeparated: _t,
        commaSeparated: pi,
        number: z,
        overloadedBoolean: nf,
        spaceSeparated: we,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  wc = Object.keys(rf);
class Hp extends Pt {
  constructor(t, n, r, i) {
    let o = -1;
    if ((super(t, n), mg(this, "space", i), typeof r == "number"))
      for (; ++o < wc.length;) {
        const s = wc[o];
        mg(this, wc[o], (r & rf[s]) === rf[s]);
      }
  }
}
Hp.prototype.defined = !0;
function mg(e, t, n) {
  n && (e[t] = n);
}
function Wo(e) {
  const t = {},
    n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const o = new Hp(r, e.transform(e.attributes || {}, r), i, e.space);
    (e.mustUseProperty &&
      e.mustUseProperty.includes(r) &&
      (o.mustUseProperty = !0),
      (t[r] = o),
      (n[tf(r)] = r),
      (n[tf(o.attribute)] = r));
  }
  return new ca(t, n, e.space);
}
const pw = Wo({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: Fe,
    ariaAutoComplete: null,
    ariaBusy: Fe,
    ariaChecked: Fe,
    ariaColCount: z,
    ariaColIndex: z,
    ariaColSpan: z,
    ariaControls: we,
    ariaCurrent: null,
    ariaDescribedBy: we,
    ariaDetails: null,
    ariaDisabled: Fe,
    ariaDropEffect: we,
    ariaErrorMessage: null,
    ariaExpanded: Fe,
    ariaFlowTo: we,
    ariaGrabbed: Fe,
    ariaHasPopup: null,
    ariaHidden: Fe,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: we,
    ariaLevel: z,
    ariaLive: null,
    ariaModal: Fe,
    ariaMultiLine: Fe,
    ariaMultiSelectable: Fe,
    ariaOrientation: null,
    ariaOwns: we,
    ariaPlaceholder: null,
    ariaPosInSet: z,
    ariaPressed: Fe,
    ariaReadOnly: Fe,
    ariaRelevant: null,
    ariaRequired: Fe,
    ariaRoleDescription: we,
    ariaRowCount: z,
    ariaRowIndex: z,
    ariaRowSpan: z,
    ariaSelected: Fe,
    ariaSetSize: z,
    ariaSort: null,
    ariaValueMax: z,
    ariaValueMin: z,
    ariaValueNow: z,
    ariaValueText: null,
    role: null,
  },
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  },
});
function hw(e, t) {
  return t in e ? e[t] : t;
}
function mw(e, t) {
  return hw(e, t.toLowerCase());
}
const OR = Wo({
    attributes: {
      acceptcharset: "accept-charset",
      classname: "class",
      htmlfor: "for",
      httpequiv: "http-equiv",
    },
    mustUseProperty: ["checked", "multiple", "muted", "selected"],
    properties: {
      abbr: null,
      accept: pi,
      acceptCharset: we,
      accessKey: we,
      action: null,
      allow: null,
      allowFullScreen: re,
      allowPaymentRequest: re,
      allowUserMedia: re,
      alpha: re,
      alt: null,
      as: null,
      async: re,
      autoCapitalize: null,
      autoComplete: we,
      autoFocus: re,
      autoPlay: re,
      blocking: we,
      capture: null,
      charSet: null,
      checked: re,
      cite: null,
      className: we,
      closedBy: null,
      colorSpace: null,
      cols: z,
      colSpan: z,
      command: null,
      commandFor: null,
      content: null,
      contentEditable: Fe,
      controls: re,
      controlsList: we,
      coords: z | pi,
      crossOrigin: null,
      data: null,
      dateTime: null,
      decoding: null,
      default: re,
      defer: re,
      dir: null,
      dirName: null,
      disabled: re,
      download: nf,
      draggable: Fe,
      encType: null,
      enterKeyHint: null,
      fetchPriority: null,
      form: null,
      formAction: null,
      formEncType: null,
      formMethod: null,
      formNoValidate: re,
      formTarget: null,
      headers: we,
      height: z,
      hidden: nf,
      high: z,
      href: null,
      hrefLang: null,
      htmlFor: we,
      httpEquiv: we,
      id: null,
      imageSizes: null,
      imageSrcSet: null,
      inert: re,
      inputMode: null,
      integrity: null,
      is: null,
      isMap: re,
      itemId: null,
      itemProp: we,
      itemRef: we,
      itemScope: re,
      itemType: we,
      kind: null,
      label: null,
      lang: null,
      language: null,
      list: null,
      loading: null,
      loop: re,
      low: z,
      manifest: null,
      max: null,
      maxLength: z,
      media: null,
      method: null,
      min: null,
      minLength: z,
      multiple: re,
      muted: re,
      name: null,
      nonce: null,
      noModule: re,
      noValidate: re,
      onAbort: null,
      onAfterPrint: null,
      onAuxClick: null,
      onBeforeMatch: null,
      onBeforePrint: null,
      onBeforeToggle: null,
      onBeforeUnload: null,
      onBlur: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onContextLost: null,
      onContextMenu: null,
      onContextRestored: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFormData: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLanguageChange: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadEnd: null,
      onLoadStart: null,
      onMessage: null,
      onMessageError: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRejectionHandled: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onScrollEnd: null,
      onSecurityPolicyViolation: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onSlotChange: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnhandledRejection: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onWheel: null,
      open: re,
      optimum: z,
      pattern: null,
      ping: we,
      placeholder: null,
      playsInline: re,
      popover: null,
      popoverTarget: null,
      popoverTargetAction: null,
      poster: null,
      preload: null,
      readOnly: re,
      referrerPolicy: null,
      rel: we,
      required: re,
      reversed: re,
      rows: z,
      rowSpan: z,
      sandbox: we,
      scope: null,
      scoped: re,
      seamless: re,
      selected: re,
      shadowRootClonable: re,
      shadowRootCustomElementRegistry: re,
      shadowRootDelegatesFocus: re,
      shadowRootMode: null,
      shadowRootSerializable: re,
      shape: null,
      size: z,
      sizes: null,
      slot: null,
      span: z,
      spellCheck: Fe,
      src: null,
      srcDoc: null,
      srcLang: null,
      srcSet: null,
      start: z,
      step: null,
      style: null,
      tabIndex: z,
      target: null,
      title: null,
      translate: null,
      type: null,
      typeMustMatch: re,
      useMap: null,
      value: Fe,
      width: z,
      wrap: null,
      writingSuggestions: null,
      align: null,
      aLink: null,
      archive: we,
      axis: null,
      background: null,
      bgColor: null,
      border: z,
      borderColor: null,
      bottomMargin: z,
      cellPadding: null,
      cellSpacing: null,
      char: null,
      charOff: null,
      classId: null,
      clear: null,
      code: null,
      codeBase: null,
      codeType: null,
      color: null,
      compact: re,
      declare: re,
      event: null,
      face: null,
      frame: null,
      frameBorder: null,
      hSpace: z,
      leftMargin: z,
      link: null,
      longDesc: null,
      lowSrc: null,
      marginHeight: z,
      marginWidth: z,
      noResize: re,
      noHref: re,
      noShade: re,
      noWrap: re,
      object: null,
      profile: null,
      prompt: null,
      rev: null,
      rightMargin: z,
      rules: null,
      scheme: null,
      scrolling: Fe,
      standby: null,
      summary: null,
      text: null,
      topMargin: z,
      valueType: null,
      version: null,
      vAlign: null,
      vLink: null,
      vSpace: z,
      allowTransparency: null,
      autoCorrect: null,
      autoSave: null,
      credentialless: re,
      disablePictureInPicture: re,
      disableRemotePlayback: re,
      exportParts: pi,
      part: we,
      prefix: null,
      property: null,
      results: z,
      security: null,
      unselectable: null,
    },
    space: "html",
    transform: mw,
  }),
  DR = Wo({
    attributes: {
      accentHeight: "accent-height",
      alignmentBaseline: "alignment-baseline",
      arabicForm: "arabic-form",
      baselineShift: "baseline-shift",
      capHeight: "cap-height",
      className: "class",
      clipPath: "clip-path",
      clipRule: "clip-rule",
      colorInterpolation: "color-interpolation",
      colorInterpolationFilters: "color-interpolation-filters",
      colorProfile: "color-profile",
      colorRendering: "color-rendering",
      crossOrigin: "crossorigin",
      dataType: "datatype",
      dominantBaseline: "dominant-baseline",
      enableBackground: "enable-background",
      fillOpacity: "fill-opacity",
      fillRule: "fill-rule",
      floodColor: "flood-color",
      floodOpacity: "flood-opacity",
      fontFamily: "font-family",
      fontSize: "font-size",
      fontSizeAdjust: "font-size-adjust",
      fontStretch: "font-stretch",
      fontStyle: "font-style",
      fontVariant: "font-variant",
      fontWeight: "font-weight",
      glyphName: "glyph-name",
      glyphOrientationHorizontal: "glyph-orientation-horizontal",
      glyphOrientationVertical: "glyph-orientation-vertical",
      hrefLang: "hreflang",
      horizAdvX: "horiz-adv-x",
      horizOriginX: "horiz-origin-x",
      horizOriginY: "horiz-origin-y",
      imageRendering: "image-rendering",
      letterSpacing: "letter-spacing",
      lightingColor: "lighting-color",
      markerEnd: "marker-end",
      markerMid: "marker-mid",
      markerStart: "marker-start",
      maskType: "mask-type",
      navDown: "nav-down",
      navDownLeft: "nav-down-left",
      navDownRight: "nav-down-right",
      navLeft: "nav-left",
      navNext: "nav-next",
      navPrev: "nav-prev",
      navRight: "nav-right",
      navUp: "nav-up",
      navUpLeft: "nav-up-left",
      navUpRight: "nav-up-right",
      onAbort: "onabort",
      onActivate: "onactivate",
      onAfterPrint: "onafterprint",
      onBeforePrint: "onbeforeprint",
      onBegin: "onbegin",
      onCancel: "oncancel",
      onCanPlay: "oncanplay",
      onCanPlayThrough: "oncanplaythrough",
      onChange: "onchange",
      onClick: "onclick",
      onClose: "onclose",
      onCopy: "oncopy",
      onCueChange: "oncuechange",
      onCut: "oncut",
      onDblClick: "ondblclick",
      onDrag: "ondrag",
      onDragEnd: "ondragend",
      onDragEnter: "ondragenter",
      onDragExit: "ondragexit",
      onDragLeave: "ondragleave",
      onDragOver: "ondragover",
      onDragStart: "ondragstart",
      onDrop: "ondrop",
      onDurationChange: "ondurationchange",
      onEmptied: "onemptied",
      onEnd: "onend",
      onEnded: "onended",
      onError: "onerror",
      onFocus: "onfocus",
      onFocusIn: "onfocusin",
      onFocusOut: "onfocusout",
      onHashChange: "onhashchange",
      onInput: "oninput",
      onInvalid: "oninvalid",
      onKeyDown: "onkeydown",
      onKeyPress: "onkeypress",
      onKeyUp: "onkeyup",
      onLoad: "onload",
      onLoadedData: "onloadeddata",
      onLoadedMetadata: "onloadedmetadata",
      onLoadStart: "onloadstart",
      onMessage: "onmessage",
      onMouseDown: "onmousedown",
      onMouseEnter: "onmouseenter",
      onMouseLeave: "onmouseleave",
      onMouseMove: "onmousemove",
      onMouseOut: "onmouseout",
      onMouseOver: "onmouseover",
      onMouseUp: "onmouseup",
      onMouseWheel: "onmousewheel",
      onOffline: "onoffline",
      onOnline: "ononline",
      onPageHide: "onpagehide",
      onPageShow: "onpageshow",
      onPaste: "onpaste",
      onPause: "onpause",
      onPlay: "onplay",
      onPlaying: "onplaying",
      onPopState: "onpopstate",
      onProgress: "onprogress",
      onRateChange: "onratechange",
      onRepeat: "onrepeat",
      onReset: "onreset",
      onResize: "onresize",
      onScroll: "onscroll",
      onSeeked: "onseeked",
      onSeeking: "onseeking",
      onSelect: "onselect",
      onShow: "onshow",
      onStalled: "onstalled",
      onStorage: "onstorage",
      onSubmit: "onsubmit",
      onSuspend: "onsuspend",
      onTimeUpdate: "ontimeupdate",
      onToggle: "ontoggle",
      onUnload: "onunload",
      onVolumeChange: "onvolumechange",
      onWaiting: "onwaiting",
      onZoom: "onzoom",
      overlinePosition: "overline-position",
      overlineThickness: "overline-thickness",
      paintOrder: "paint-order",
      panose1: "panose-1",
      pointerEvents: "pointer-events",
      referrerPolicy: "referrerpolicy",
      renderingIntent: "rendering-intent",
      shapeRendering: "shape-rendering",
      stopColor: "stop-color",
      stopOpacity: "stop-opacity",
      strikethroughPosition: "strikethrough-position",
      strikethroughThickness: "strikethrough-thickness",
      strokeDashArray: "stroke-dasharray",
      strokeDashOffset: "stroke-dashoffset",
      strokeLineCap: "stroke-linecap",
      strokeLineJoin: "stroke-linejoin",
      strokeMiterLimit: "stroke-miterlimit",
      strokeOpacity: "stroke-opacity",
      strokeWidth: "stroke-width",
      tabIndex: "tabindex",
      textAnchor: "text-anchor",
      textDecoration: "text-decoration",
      textRendering: "text-rendering",
      transformOrigin: "transform-origin",
      typeOf: "typeof",
      underlinePosition: "underline-position",
      underlineThickness: "underline-thickness",
      unicodeBidi: "unicode-bidi",
      unicodeRange: "unicode-range",
      unitsPerEm: "units-per-em",
      vAlphabetic: "v-alphabetic",
      vHanging: "v-hanging",
      vIdeographic: "v-ideographic",
      vMathematical: "v-mathematical",
      vectorEffect: "vector-effect",
      vertAdvY: "vert-adv-y",
      vertOriginX: "vert-origin-x",
      vertOriginY: "vert-origin-y",
      wordSpacing: "word-spacing",
      writingMode: "writing-mode",
      xHeight: "x-height",
      playbackOrder: "playbackorder",
      timelineBegin: "timelinebegin",
    },
    properties: {
      about: _t,
      accentHeight: z,
      accumulate: null,
      additive: null,
      alignmentBaseline: null,
      alphabetic: z,
      amplitude: z,
      arabicForm: null,
      ascent: z,
      attributeName: null,
      attributeType: null,
      azimuth: z,
      bandwidth: null,
      baselineShift: null,
      baseFrequency: null,
      baseProfile: null,
      bbox: null,
      begin: null,
      bias: z,
      by: null,
      calcMode: null,
      capHeight: z,
      className: we,
      clip: null,
      clipPath: null,
      clipPathUnits: null,
      clipRule: null,
      color: null,
      colorInterpolation: null,
      colorInterpolationFilters: null,
      colorProfile: null,
      colorRendering: null,
      content: null,
      contentScriptType: null,
      contentStyleType: null,
      crossOrigin: null,
      cursor: null,
      cx: null,
      cy: null,
      d: null,
      dataType: null,
      defaultAction: null,
      descent: z,
      diffuseConstant: z,
      direction: null,
      display: null,
      dur: null,
      divisor: z,
      dominantBaseline: null,
      download: re,
      dx: null,
      dy: null,
      edgeMode: null,
      editable: null,
      elevation: z,
      enableBackground: null,
      end: null,
      event: null,
      exponent: z,
      externalResourcesRequired: null,
      fill: null,
      fillOpacity: z,
      fillRule: null,
      filter: null,
      filterRes: null,
      filterUnits: null,
      floodColor: null,
      floodOpacity: null,
      focusable: null,
      focusHighlight: null,
      fontFamily: null,
      fontSize: null,
      fontSizeAdjust: null,
      fontStretch: null,
      fontStyle: null,
      fontVariant: null,
      fontWeight: null,
      format: null,
      fr: null,
      from: null,
      fx: null,
      fy: null,
      g1: pi,
      g2: pi,
      glyphName: pi,
      glyphOrientationHorizontal: null,
      glyphOrientationVertical: null,
      glyphRef: null,
      gradientTransform: null,
      gradientUnits: null,
      handler: null,
      hanging: z,
      hatchContentUnits: null,
      hatchUnits: null,
      height: null,
      href: null,
      hrefLang: null,
      horizAdvX: z,
      horizOriginX: z,
      horizOriginY: z,
      id: null,
      ideographic: z,
      imageRendering: null,
      initialVisibility: null,
      in: null,
      in2: null,
      intercept: z,
      k: z,
      k1: z,
      k2: z,
      k3: z,
      k4: z,
      kernelMatrix: _t,
      kernelUnitLength: null,
      keyPoints: null,
      keySplines: null,
      keyTimes: null,
      kerning: null,
      lang: null,
      lengthAdjust: null,
      letterSpacing: null,
      lightingColor: null,
      limitingConeAngle: z,
      local: null,
      markerEnd: null,
      markerMid: null,
      markerStart: null,
      markerHeight: null,
      markerUnits: null,
      markerWidth: null,
      mask: null,
      maskContentUnits: null,
      maskType: null,
      maskUnits: null,
      mathematical: null,
      max: null,
      media: null,
      mediaCharacterEncoding: null,
      mediaContentEncodings: null,
      mediaSize: z,
      mediaTime: null,
      method: null,
      min: null,
      mode: null,
      name: null,
      navDown: null,
      navDownLeft: null,
      navDownRight: null,
      navLeft: null,
      navNext: null,
      navPrev: null,
      navRight: null,
      navUp: null,
      navUpLeft: null,
      navUpRight: null,
      numOctaves: null,
      observer: null,
      offset: null,
      onAbort: null,
      onActivate: null,
      onAfterPrint: null,
      onBeforePrint: null,
      onBegin: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnd: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFocusIn: null,
      onFocusOut: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadStart: null,
      onMessage: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onMouseWheel: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRepeat: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onShow: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onZoom: null,
      opacity: null,
      operator: null,
      order: null,
      orient: null,
      orientation: null,
      origin: null,
      overflow: null,
      overlay: null,
      overlinePosition: z,
      overlineThickness: z,
      paintOrder: null,
      panose1: null,
      path: null,
      pathLength: z,
      patternContentUnits: null,
      patternTransform: null,
      patternUnits: null,
      phase: null,
      ping: we,
      pitch: null,
      playbackOrder: null,
      pointerEvents: null,
      points: null,
      pointsAtX: z,
      pointsAtY: z,
      pointsAtZ: z,
      preserveAlpha: null,
      preserveAspectRatio: null,
      primitiveUnits: null,
      propagate: null,
      property: _t,
      r: null,
      radius: null,
      referrerPolicy: null,
      refX: null,
      refY: null,
      rel: _t,
      rev: _t,
      renderingIntent: null,
      repeatCount: null,
      repeatDur: null,
      requiredExtensions: _t,
      requiredFeatures: _t,
      requiredFonts: _t,
      requiredFormats: _t,
      resource: null,
      restart: null,
      result: null,
      rotate: null,
      rx: null,
      ry: null,
      scale: null,
      seed: null,
      shapeRendering: null,
      side: null,
      slope: null,
      snapshotTime: null,
      specularConstant: z,
      specularExponent: z,
      spreadMethod: null,
      spacing: null,
      startOffset: null,
      stdDeviation: null,
      stemh: null,
      stemv: null,
      stitchTiles: null,
      stopColor: null,
      stopOpacity: null,
      strikethroughPosition: z,
      strikethroughThickness: z,
      string: null,
      stroke: null,
      strokeDashArray: _t,
      strokeDashOffset: null,
      strokeLineCap: null,
      strokeLineJoin: null,
      strokeMiterLimit: z,
      strokeOpacity: z,
      strokeWidth: null,
      style: null,
      surfaceScale: z,
      syncBehavior: null,
      syncBehaviorDefault: null,
      syncMaster: null,
      syncTolerance: null,
      syncToleranceDefault: null,
      systemLanguage: _t,
      tabIndex: z,
      tableValues: null,
      target: null,
      targetX: z,
      targetY: z,
      textAnchor: null,
      textDecoration: null,
      textRendering: null,
      textLength: null,
      timelineBegin: null,
      title: null,
      transformBehavior: null,
      type: null,
      typeOf: _t,
      to: null,
      transform: null,
      transformOrigin: null,
      u1: null,
      u2: null,
      underlinePosition: z,
      underlineThickness: z,
      unicode: null,
      unicodeBidi: null,
      unicodeRange: null,
      unitsPerEm: z,
      values: null,
      vAlphabetic: z,
      vMathematical: z,
      vectorEffect: null,
      vHanging: z,
      vIdeographic: z,
      version: null,
      vertAdvY: z,
      vertOriginX: z,
      vertOriginY: z,
      viewBox: null,
      viewTarget: null,
      visibility: null,
      width: null,
      widths: null,
      wordSpacing: null,
      writingMode: null,
      x: null,
      x1: null,
      x2: null,
      xChannelSelector: null,
      xHeight: z,
      y: null,
      y1: null,
      y2: null,
      yChannelSelector: null,
      z: null,
      zoomAndPan: null,
    },
    space: "svg",
    transform: hw,
  }),
  gw = Wo({
    properties: {
      xLinkActuate: null,
      xLinkArcRole: null,
      xLinkHref: null,
      xLinkRole: null,
      xLinkShow: null,
      xLinkTitle: null,
      xLinkType: null,
    },
    space: "xlink",
    transform(e, t) {
      return "xlink:" + t.slice(5).toLowerCase();
    },
  }),
  yw = Wo({
    attributes: { xmlnsxlink: "xmlns:xlink" },
    properties: { xmlnsXLink: null, xmlns: null },
    space: "xmlns",
    transform: mw,
  }),
  xw = Wo({
    properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
    space: "xml",
    transform(e, t) {
      return "xml:" + t.slice(3).toLowerCase();
    },
  }),
  LR = {
    classId: "classID",
    dataType: "datatype",
    itemId: "itemID",
    strokeDashArray: "strokeDasharray",
    strokeDashOffset: "strokeDashoffset",
    strokeLineCap: "strokeLinecap",
    strokeLineJoin: "strokeLinejoin",
    strokeMiterLimit: "strokeMiterlimit",
    typeOf: "typeof",
    xLinkActuate: "xlinkActuate",
    xLinkArcRole: "xlinkArcrole",
    xLinkHref: "xlinkHref",
    xLinkRole: "xlinkRole",
    xLinkShow: "xlinkShow",
    xLinkTitle: "xlinkTitle",
    xLinkType: "xlinkType",
    xmlnsXLink: "xmlnsXlink",
  },
  zR = /[A-Z]/g,
  gg = /-[a-z]/g,
  FR = /^data[-\w.:]+$/i;
function BR(e, t) {
  const n = tf(t);
  let r = t,
    i = Pt;
  if (n in e.normal) return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && FR.test(t)) {
    if (t.charAt(4) === "-") {
      const o = t.slice(5).replace(gg, UR);
      r = "data" + o.charAt(0).toUpperCase() + o.slice(1);
    } else {
      const o = t.slice(4);
      if (!gg.test(o)) {
        let s = o.replace(zR, $R);
        (s.charAt(0) !== "-" && (s = "-" + s), (t = "data" + s));
      }
    }
    i = Hp;
  }
  return new i(r, t);
}
function $R(e) {
  return "-" + e.toLowerCase();
}
function UR(e) {
  return e.charAt(1).toUpperCase();
}
const WR = fw([pw, OR, gw, yw, xw], "html"),
  qp = fw([pw, DR, gw, yw, xw], "svg");
function VR(e) {
  return e.join(" ").trim();
}
var yg = /\/\*(?:[^*]|\*(?!\/))*\*\//g,
  HR = /\n/g,
  qR = /^\s*/,
  QR = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,
  KR = /^:\s*/,
  GR =
    /^((?:'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|url\((?:'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|[^)]*)\)|[^};])+)/,
  YR = /^[;\s]*/,
  XR = `
`,
  xg = "/",
  vg = "*",
  ts = "",
  ZR = "comment",
  JR = "declaration";
function eM(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1,
    r = 1;
  function i(v) {
    var g = v.match(HR);
    g && (n += g.length);
    var b = v.lastIndexOf(XR);
    r = ~b ? v.length - b : r + v.length;
  }
  function o() {
    var v = { line: n, column: r };
    return function (g) {
      return ((g.position = new s(v)), c(), g);
    };
  }
  function s(v) {
    ((this.start = v),
      (this.end = { line: n, column: r }),
      (this.source = t.source));
  }
  s.prototype.content = e;
  function a(v) {
    var g = new Error(t.source + ":" + n + ":" + r + ": " + v);
    if (
      ((g.reason = v),
      (g.filename = t.source),
      (g.line = n),
      (g.column = r),
      (g.source = e),
      !t.silent)
    )
      throw g;
  }
  function u(v) {
    var g = v.exec(e);
    if (g) {
      var b = g[0];
      return (i(b), (e = e.slice(b.length)), g);
    }
  }
  function c() {
    u(qR);
  }
  function d(v) {
    for (var g; (g = f());) v.push(g);
    return v;
  }
  function f() {
    var v = o();
    if (!(xg != e.charAt(0) || vg != e.charAt(1))) {
      for (
        var g = 2;
        ts != e.charAt(g) && (vg != e.charAt(g) || xg != e.charAt(g + 1));
      )
        ++g;
      if (((g += 2), ts === e.charAt(g - 1)))
        return a("End of comment missing");
      var b = e.slice(2, g - 2);
      return (
        (r += 2),
        i(b),
        (e = e.slice(g)),
        (r += 2),
        v({ type: ZR, comment: b })
      );
    }
  }
  function h() {
    var v = o(),
      g = u(QR);
    if (g) {
      if ((f(), !u(KR))) return a("property missing ':'");
      var b = u(GR),
        m = v({
          type: JR,
          property: g[0].replace(yg, ts).trim(),
          value: b ? b[0].replace(yg, ts).trim() : ts,
        });
      return (u(YR), m);
    }
  }
  function p() {
    var v = [];
    d(v);
    for (var g; (g = h());) (v.push(g), d(v));
    return v;
  }
  return (c(), p());
}
function tM(e, t) {
  let n = null;
  if (!e || typeof e != "string") return n;
  const r = eM(e),
    i = typeof t == "function";
  return (
    r.forEach((o) => {
      if (o.type !== "declaration") return;
      const { property: s, value: a } = o;
      i ? t(s, a, o) : a && ((n = n ?? {}), (n[s] = a));
    }),
    n
  );
}
const vw = ww("end"),
  Qp = ww("start");
function ww(e) {
  return t;
  function t(n) {
    const r = (n && n.position && n.position[e]) || {};
    if (
      typeof r.line == "number" &&
      r.line > 0 &&
      typeof r.column == "number" &&
      r.column > 0
    )
      return {
        line: r.line,
        column: r.column,
        offset:
          typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0,
      };
  }
}
function nM(e) {
  const t = Qp(e),
    n = vw(e);
  if (t && n) return { start: t, end: n };
}
function vs(e) {
  return !e || typeof e != "object"
    ? ""
    : "position" in e || "type" in e
      ? wg(e.position)
      : "start" in e || "end" in e
        ? wg(e)
        : "line" in e || "column" in e
          ? of(e)
          : "";
}
function of(e) {
  return bg(e && e.line) + ":" + bg(e && e.column);
}
function wg(e) {
  return of(e && e.start) + "-" + of(e && e.end);
}
function bg(e) {
  return e && typeof e == "number" ? e : 1;
}
class Su extends Error {
  constructor(t, n, r) {
    (super(), typeof n == "string" && ((r = n), (n = void 0)));
    let i = "",
      o = {},
      s = !1;
    if (
      (n &&
        ("line" in n && "column" in n
          ? (o = { place: n })
          : "start" in n && "end" in n
            ? (o = { place: n })
            : "type" in n
              ? (o = { ancestors: [n], place: n.position })
              : (o = { ...n })),
      typeof t == "string"
        ? (i = t)
        : !o.cause && t && ((s = !0), (i = t.message), (o.cause = t)),
      !o.ruleId && !o.source && typeof r == "string")
    ) {
      const u = r.indexOf(":");
      u === -1
        ? (o.ruleId = r)
        : ((o.source = r.slice(0, u)), (o.ruleId = r.slice(u + 1)));
    }
    if (!o.place && o.ancestors) {
      const u = o.ancestors[o.ancestors.length - 1];
      u && (o.place = u.position);
    }
    const a = o.place && "start" in o.place ? o.place.start : o.place;
    ((this.ancestors = o.ancestors || void 0),
      (this.cause = o.cause || void 0),
      (this.column = a ? a.column : void 0),
      (this.fatal = void 0),
      (this.file = ""),
      (this.message = i),
      (this.line = a ? a.line : void 0),
      (this.name = vs(o.place) || "1:1"),
      (this.place = o.place || void 0),
      (this.reason = this.message),
      (this.ruleId = o.ruleId || void 0),
      (this.source = o.source || void 0),
      (this.stack =
        s && o.cause && typeof o.cause.stack == "string" ? o.cause.stack : ""),
      (this.actual = void 0),
      (this.expected = void 0),
      (this.note = void 0),
      (this.url = void 0));
  }
}
Object.defineProperties(Su.prototype, {
  file: { configurable: !0, enumerable: !0, value: "", writable: !0 },
  name: { configurable: !0, enumerable: !0, value: "", writable: !0 },
  reason: { configurable: !0, enumerable: !0, value: "", writable: !0 },
  message: { configurable: !0, enumerable: !0, value: "", writable: !0 },
  stack: { configurable: !0, enumerable: !0, value: "", writable: !0 },
  column: { configurable: !0, enumerable: !0, writable: !0 },
  line: { configurable: !0, enumerable: !0, writable: !0 },
  ancestors: { configurable: !0, enumerable: !0, writable: !0 },
  cause: { configurable: !0, enumerable: !0, writable: !0 },
  fatal: { configurable: !0, enumerable: !0, writable: !0 },
  place: { configurable: !0, enumerable: !0, writable: !0 },
  ruleId: { configurable: !0, enumerable: !0, writable: !0 },
  source: { configurable: !0, enumerable: !0, writable: !0 },
});
const Kp = {}.hasOwnProperty,
  rM = new Map(),
  iM = /[A-Z]/g,
  oM = /-([a-z])/g,
  sM = new Set(["table", "tbody", "thead", "tfoot", "tr"]),
  aM = new Set(["td", "th"]),
  bw = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function lM(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`",
      );
    r = gM(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = mM(n, t.jsx, t.jsxs);
  }
  const i = {
      Fragment: t.Fragment,
      ancestors: [],
      components: t.components || {},
      create: r,
      elementAttributeNameCase: t.elementAttributeNameCase || "react",
      evaluater: t.createEvaluater ? t.createEvaluater() : void 0,
      filePath: n,
      ignoreInvalidStyle: t.ignoreInvalidStyle || !1,
      passKeys: t.passKeys !== !1,
      passNode: t.passNode || !1,
      schema: t.space === "svg" ? qp : WR,
      stylePropertyNameCase: t.stylePropertyNameCase || "dom",
      tableCellAlignToStyle: t.tableCellAlignToStyle !== !1,
    },
    o = kw(i, e, void 0);
  return o && typeof o != "string"
    ? o
    : i.create(e, i.Fragment, { children: o || void 0 }, void 0);
}
function kw(e, t, n) {
  if (t.type === "element") return uM(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return cM(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return fM(e, t, n);
  if (t.type === "mdxjsEsm") return dM(e, t);
  if (t.type === "root") return pM(e, t, n);
  if (t.type === "text") return hM(e, t);
}
function uM(e, t, n) {
  const r = e.schema;
  let i = r;
  (t.tagName.toLowerCase() === "svg" &&
    r.space === "html" &&
    ((i = qp), (e.schema = i)),
    e.ancestors.push(t));
  const o = Cw(e, t.tagName, !1),
    s = yM(e, t);
  let a = Yp(e, t);
  return (
    sM.has(t.tagName) &&
      (a = a.filter(function (u) {
        return typeof u == "string" ? !AR(u) : !0;
      })),
    Sw(e, s, o, t),
    Gp(s, a),
    e.ancestors.pop(),
    (e.schema = r),
    e.create(t, o, s, n)
  );
}
function cM(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return (r.type, e.evaluater.evaluateExpression(r.expression));
  }
  Gs(e, t.position);
}
function dM(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return e.evaluater.evaluateProgram(t.data.estree);
  Gs(e, t.position);
}
function fM(e, t, n) {
  const r = e.schema;
  let i = r;
  (t.name === "svg" && r.space === "html" && ((i = qp), (e.schema = i)),
    e.ancestors.push(t));
  const o = t.name === null ? e.Fragment : Cw(e, t.name, !0),
    s = xM(e, t),
    a = Yp(e, t);
  return (
    Sw(e, s, o, t),
    Gp(s, a),
    e.ancestors.pop(),
    (e.schema = r),
    e.create(t, o, s, n)
  );
}
function pM(e, t, n) {
  const r = {};
  return (Gp(r, Yp(e, t)), e.create(t, e.Fragment, r, n));
}
function hM(e, t) {
  return t.value;
}
function Sw(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function Gp(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function mM(e, t, n) {
  return r;
  function r(i, o, s, a) {
    const c = Array.isArray(s.children) ? n : t;
    return a ? c(o, s, a) : c(o, s);
  }
}
function gM(e, t) {
  return n;
  function n(r, i, o, s) {
    const a = Array.isArray(o.children),
      u = Qp(r);
    return t(
      i,
      o,
      s,
      a,
      {
        columnNumber: u ? u.column - 1 : void 0,
        fileName: e,
        lineNumber: u ? u.line : void 0,
      },
      void 0,
    );
  }
}
function yM(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && Kp.call(t.properties, i)) {
      const o = vM(e, i, t.properties[i]);
      if (o) {
        const [s, a] = o;
        e.tableCellAlignToStyle &&
        s === "align" &&
        typeof a == "string" &&
        aM.has(t.tagName)
          ? (r = a)
          : (n[s] = a);
      }
    }
  if (r) {
    const o = n.style || (n.style = {});
    o[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return n;
}
function xM(e, t) {
  const n = {};
  for (const r of t.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const o = r.data.estree.body[0];
        o.type;
        const s = o.expression;
        s.type;
        const a = s.properties[0];
        (a.type, Object.assign(n, e.evaluater.evaluateExpression(a.argument)));
      } else Gs(e, t.position);
    else {
      const { name: i } = r;
      let o;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const a = r.value.data.estree.body[0];
          (a.type, (o = e.evaluater.evaluateExpression(a.expression)));
        } else Gs(e, t.position);
      else o = r.value === null ? !0 : r.value;
      n[i] = o;
    }
  return n;
}
function Yp(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? new Map() : rM;
  for (; ++r < t.children.length;) {
    const o = t.children[r];
    let s;
    if (e.passKeys) {
      const u =
        o.type === "element"
          ? o.tagName
          : o.type === "mdxJsxFlowElement" || o.type === "mdxJsxTextElement"
            ? o.name
            : void 0;
      if (u) {
        const c = i.get(u) || 0;
        ((s = u + "-" + c), i.set(u, c + 1));
      }
    }
    const a = kw(e, o, s);
    a !== void 0 && n.push(a);
  }
  return n;
}
function vM(e, t, n) {
  if (n == null || (typeof n == "number" && Number.isNaN(n))) return;
  const r = BR(e.schema, t);
  return (
    Array.isArray(n) && (n = r.commaSeparated ? PR(n) : VR(n)),
    r.property === "style"
      ? [
          "style",
          typeof n == "object"
            ? e.stylePropertyNameCase === "dom"
              ? n
              : bM(n)
            : wM(e, String(n)),
        ]
      : [
          e.elementAttributeNameCase === "react" && r.space
            ? LR[r.property] || r.property
            : r.attribute,
          n,
        ]
  );
}
function wM(e, t) {
  const n = {};
  try {
    tM(t, function (r, i) {
      if (r && i) {
        let o = r;
        (o.slice(0, 2) !== "--" &&
          ((o = o.toLowerCase()),
          e.stylePropertyNameCase === "dom" &&
            (o.slice(0, 4) === "-ms-" && (o = o.slice(1)),
            (o = o.replace(oM, CM)))),
          (n[o] = i));
      }
    });
  } catch (r) {
    if (e.ignoreInvalidStyle) return {};
    const i = r,
      o = new Su("Cannot parse `style` attribute", {
        ancestors: e.ancestors,
        cause: i,
        ruleId: "style",
        source: "hast-util-to-jsx-runtime",
      });
    throw (
      (o.file = e.filePath || void 0),
      (o.url = bw + "#cannot-parse-style-attribute"),
      o
    );
  }
  return n;
}
function Cw(e, t, n) {
  let r;
  if (!n) r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let o = -1,
      s;
    for (; ++o < i.length;) {
      const a = pg(i[o])
        ? { type: "Identifier", name: i[o] }
        : { type: "Literal", value: i[o] };
      s = s
        ? {
            type: "MemberExpression",
            object: s,
            property: a,
            computed: !!(o && a.type === "Literal"),
            optional: !1,
          }
        : a;
    }
    r = s;
  } else
    r =
      pg(t) && !/^[a-z]/.test(t)
        ? { type: "Identifier", name: t }
        : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = r.value;
    return Kp.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater) return e.evaluater.evaluateExpression(r);
  Gs(e);
}
function Gs(e, t) {
  const n = new Su("Cannot handle MDX estrees without `createEvaluater`", {
    ancestors: e.ancestors,
    place: t,
    ruleId: "mdx-estree",
    source: "hast-util-to-jsx-runtime",
  });
  throw (
    (n.file = e.filePath || void 0),
    (n.url = bw + "#cannot-handle-mdx-estrees-without-createevaluater"),
    n
  );
}
function bM(e) {
  const t = {};
  let n;
  for (n in e) Kp.call(e, n) && (t[kM(n)] = e[n]);
  return t;
}
function kM(e) {
  if (e.slice(0, 2) === "--") return e;
  let t = e.replace(iM, SM);
  return (t.slice(0, 3) === "ms-" && (t = "-" + t), t);
}
function SM(e) {
  return "-" + e.toLowerCase();
}
function CM(e, t) {
  return t.toUpperCase();
}
const bc = {
    action: ["form"],
    cite: ["blockquote", "del", "ins", "q"],
    data: ["object"],
    formAction: ["button", "input"],
    href: ["a", "area", "base", "link"],
    icon: ["menuitem"],
    itemId: null,
    manifest: ["html"],
    ping: ["a", "area"],
    poster: ["video"],
    src: [
      "audio",
      "embed",
      "iframe",
      "img",
      "input",
      "script",
      "source",
      "track",
      "video",
    ],
  },
  NM = {};
function EM(e, t) {
  const n = NM,
    r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0,
    i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Nw(e, r, i);
}
function Nw(e, t, n) {
  if (jM(e)) {
    if ("value" in e) return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt) return e.alt;
    if ("children" in e) return kg(e.children, t, n);
  }
  return Array.isArray(e) ? kg(e, t, n) : "";
}
function kg(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length;) r[i] = Nw(e[i], t, n);
  return r.join("");
}
function jM(e) {
  return !!(e && typeof e == "object");
}
const Sg = document.createElement("i");
function Xp(e) {
  const t = "&" + e + ";";
  Sg.innerHTML = t;
  const n = Sg.textContent;
  return (n.charCodeAt(n.length - 1) === 59 && e !== "semi") || n === t
    ? !1
    : n;
}
function Hr(e, t, n, r) {
  const i = e.length;
  let o = 0,
    s;
  if (
    (t < 0 ? (t = -t > i ? 0 : i + t) : (t = t > i ? i : t),
    (n = n > 0 ? n : 0),
    r.length < 1e4)
  )
    ((s = Array.from(r)), s.unshift(t, n), e.splice(...s));
  else
    for (n && e.splice(t, n); o < r.length;)
      ((s = r.slice(o, o + 1e4)),
        s.unshift(t, 0),
        e.splice(...s),
        (o += 1e4),
        (t += 1e4));
}
function Qt(e, t) {
  return e.length > 0 ? (Hr(e, e.length, 0, t), e) : t;
}
const Cg = {}.hasOwnProperty;
function PM(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length;) _M(t, e[n]);
  return t;
}
function _M(e, t) {
  let n;
  for (n in t) {
    const i = (Cg.call(e, n) ? e[n] : void 0) || (e[n] = {}),
      o = t[n];
    let s;
    if (o)
      for (s in o) {
        Cg.call(i, s) || (i[s] = []);
        const a = o[s];
        RM(i[s], Array.isArray(a) ? a : a ? [a] : []);
      }
  }
}
function RM(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length;) (t[n].add === "after" ? e : r).push(t[n]);
  Hr(e, 0, 0, r);
}
function Ew(e, t) {
  const n = Number.parseInt(e, t);
  return n < 9 ||
    n === 11 ||
    (n > 13 && n < 32) ||
    (n > 126 && n < 160) ||
    (n > 55295 && n < 57344) ||
    (n > 64975 && n < 65008) ||
    (n & 65535) === 65535 ||
    (n & 65535) === 65534 ||
    n > 1114111
    ? "�"
    : String.fromCodePoint(n);
}
function ao(e) {
  return e
    .replace(/[\t\n\r ]+/g, " ")
    .replace(/^ | $/g, "")
    .toLowerCase()
    .toUpperCase();
}
const En = qr(/[A-Za-z]/),
  Ot = qr(/[\dA-Za-z]/),
  MM = qr(/[#-'*+\--9=?A-Z^-~]/);
function sf(e) {
  return e !== null && (e < 32 || e === 127);
}
const af = qr(/\d/),
  TM = qr(/[\dA-Fa-f]/),
  AM = qr(/[!-/:-@[-`{-~]/);
function ne(e) {
  return e !== null && e < -2;
}
function jt(e) {
  return e !== null && (e < 0 || e === 32);
}
function he(e) {
  return e === -2 || e === -1 || e === 32;
}
const IM = qr(new RegExp("\\p{P}|\\p{S}", "u")),
  OM = qr(/\s/);
function qr(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function Vo(e) {
  const t = [];
  let n = -1,
    r = 0,
    i = 0;
  for (; ++n < e.length;) {
    const o = e.charCodeAt(n);
    let s = "";
    if (o === 37 && Ot(e.charCodeAt(n + 1)) && Ot(e.charCodeAt(n + 2))) i = 2;
    else if (o < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o)) ||
        (s = String.fromCharCode(o));
    else if (o > 55295 && o < 57344) {
      const a = e.charCodeAt(n + 1);
      o < 56320 && a > 56319 && a < 57344
        ? ((s = String.fromCharCode(o, a)), (i = 1))
        : (s = "�");
    } else s = String.fromCharCode(o);
    (s &&
      (t.push(e.slice(r, n), encodeURIComponent(s)), (r = n + i + 1), (s = "")),
      i && ((n += i), (i = 0)));
  }
  return t.join("") + e.slice(r);
}
function _e(e, t, n, r) {
  const i = r ? r - 1 : 1 / 0;
  let o = 0;
  return s;
  function s(u) {
    return he(u) ? (e.enter(n), a(u)) : t(u);
  }
  function a(u) {
    return he(u) && o++ < i ? (e.consume(u), a) : (e.exit(n), t(u));
  }
}
function jw(e, t, n, r, i, o) {
  let s = 0;
  return a;
  function a(d) {
    return he(d) ? (e.enter(r), u(d)) : c(d);
  }
  function u(d) {
    return he(d) && s < o ? (e.consume(d), s++, u) : (e.exit(r), c(d));
  }
  function c(d) {
    return s >= i ? t(d) : n(d);
  }
}
const DM = { tokenize: LM };
function LM(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return t;
  function r(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return (
      e.enter("lineEnding"),
      e.consume(a),
      e.exit("lineEnding"),
      _e(e, t, "linePrefix")
    );
  }
  function i(a) {
    return (e.enter("paragraph"), o(a));
  }
  function o(a) {
    const u = e.enter("chunkText", { contentType: "text", previous: n });
    return (n && (n.next = u), (n = u), s(a));
  }
  function s(a) {
    if (a === null) {
      (e.exit("chunkText"), e.exit("paragraph"), e.consume(a));
      return;
    }
    return ne(a) ? (e.consume(a), e.exit("chunkText"), o) : (e.consume(a), s);
  }
}
class Wl {
  constructor() {
    ((this.index = new Map()), (this.map = []));
  }
  add(t, n, r) {
    Ng(this, t, n, r, !1);
  }
  addBefore(t, n, r) {
    Ng(this, t, n, r, !0);
  }
  consume(t) {
    if (
      (this.map.sort(function (o, s) {
        return o[0] - s[0];
      }),
      this.map.length === 0)
    )
      return;
    let n = this.map.length;
    const r = [];
    for (; n > 0;)
      ((n -= 1),
        r.push(t.slice(this.map[n][0] + this.map[n][1]), this.map[n][2]),
        (t.length = this.map[n][0]));
    (r.push(t.slice()), (t.length = 0));
    let i = r.pop();
    for (; i;) {
      for (const o of i) t.push(o);
      i = r.pop();
    }
    ((this.map.length = 0), this.index.clear());
  }
}
function Ng(e, t, n, r, i) {
  if (n === 0 && r.length === 0) return;
  const o = e.index.get(t);
  if (o) {
    ((o[1] += n), i ? (r.push(...o[2]), (o[2] = r)) : o[2].push(...r));
    return;
  }
  const s = [t, n, r];
  (e.map.push(s), e.index.set(t, s));
}
const zM = { tokenize: FM },
  Eg = { tokenize: BM };
function FM(e) {
  const t = this,
    n = [];
  let r = 0,
    i,
    o,
    s;
  return a;
  function a(y) {
    if (r < n.length) {
      const k = n[r];
      return ((t.containerState = k[1]), e.attempt(k[0].continuation, u, c)(y));
    }
    return c(y);
  }
  function u(y) {
    if ((r++, t.containerState._closeFlow)) {
      ((t.containerState._closeFlow = void 0), i && x());
      const k = t.events.length;
      let N = k,
        C;
      for (; N--;)
        if (t.events[N][0] === "exit" && t.events[N][1].type === "chunkFlow") {
          C = t.events[N][1].end;
          break;
        }
      m(r);
      let j = k;
      for (; j < t.events.length;) ((t.events[j][1].end = { ...C }), j++);
      const P = new Wl();
      return (
        P.add(N + 1, 0, t.events.slice(k)),
        P.add(k, j - k, []),
        P.consume(t.events),
        c(y)
      );
    }
    return a(y);
  }
  function c(y) {
    if (r === n.length) {
      if (!i) return h(y);
      if (i.currentConstruct && i.currentConstruct.concrete) return v(y);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return ((t.containerState = {}), e.check(Eg, d, f)(y));
  }
  function d(y) {
    return (i && x(), m(r), h(y));
  }
  function f(y) {
    return (
      (t.parser.lazy[t.now().line] = r !== n.length),
      (s = t.now().offset),
      v(y)
    );
  }
  function h(y) {
    return ((t.containerState = {}), e.attempt(Eg, p, v)(y));
  }
  function p(y) {
    return (r++, n.push([t.currentConstruct, t.containerState]), h(y));
  }
  function v(y) {
    if (y === null) {
      (i && x(), m(0), e.consume(y));
      return;
    }
    return (
      (i = i || t.parser.flow(t.now())),
      e.enter("chunkFlow", { _tokenizer: i, contentType: "flow", previous: o }),
      g(y)
    );
  }
  function g(y) {
    if (y === null) {
      (b(e.exit("chunkFlow"), !0), m(0), e.consume(y));
      return;
    }
    return ne(y)
      ? (e.consume(y),
        b(e.exit("chunkFlow")),
        (r = 0),
        (t.interrupt = void 0),
        a)
      : (e.consume(y), g);
  }
  function b(y, k) {
    const N = t.sliceStream(y);
    if (
      (k && N.push(null),
      (y.previous = o),
      o && (o.next = y),
      (o = y),
      i.defineSkip(y.start),
      i.write(N),
      t.parser.lazy[y.start.line])
    ) {
      let C = i.events.length;
      for (; C--;)
        if (
          i.events[C][1].start.offset < s &&
          (!i.events[C][1].end || i.events[C][1].end.offset > s)
        )
          return;
      const j = t.events.length;
      let P = j,
        T,
        I;
      for (; P--;)
        if (t.events[P][0] === "exit" && t.events[P][1].type === "chunkFlow") {
          if (T) {
            I = t.events[P][1].end;
            break;
          }
          T = !0;
        }
      for (m(r), C = j; C < t.events.length;)
        ((t.events[C][1].end = { ...I }), C++);
      const D = new Wl();
      (D.add(P + 1, 0, t.events.slice(j)),
        D.add(j, C - j, []),
        D.consume(t.events));
    }
  }
  function m(y) {
    let k = n.length;
    for (; k-- > y;) {
      const N = n[k];
      ((t.containerState = N[1]), N[0].exit.call(t, e));
    }
    n.length = y;
  }
  function x() {
    (i.write([null]),
      (o = void 0),
      (i = void 0),
      (t.containerState._closeFlow = void 0));
  }
}
function BM(e, t, n) {
  return _e(
    e,
    e.attempt(this.parser.constructs.document, t, n),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4,
  );
}
function jg(e) {
  if (e === null || jt(e) || OM(e)) return 1;
  if (IM(e)) return 2;
}
function Zp(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length;) {
    const o = e[i].resolveAll;
    o && !r.includes(o) && ((t = o(t, n)), r.push(o));
  }
  return t;
}
const lf = { name: "attention", resolveAll: $M, tokenize: UM };
function $M(e, t) {
  let n = -1,
    r;
  for (; ++n < e.length;)
    if (
      e[n][0] === "enter" &&
      e[n][1].type === "attentionSequence" &&
      e[n][1]._close
    ) {
      let i = n;
      for (; i--;)
        if (
          e[i][0] === "exit" &&
          e[i][1].type === "attentionSequence" &&
          e[i][1]._open &&
          t.sliceSerialize(e[i][1]).charCodeAt(0) ===
            t.sliceSerialize(e[n][1]).charCodeAt(0)
        ) {
          if (
            (e[i][1]._close || e[n][1]._open) &&
            (e[n][1].end.offset - e[n][1].start.offset) % 3 &&
            !(
              (e[i][1].end.offset -
                e[i][1].start.offset +
                e[n][1].end.offset -
                e[n][1].start.offset) %
              3
            )
          )
            continue;
          const o =
              e[i][1].end.offset - e[i][1].start.offset > 1 &&
              e[n][1].end.offset - e[n][1].start.offset > 1
                ? 2
                : 1,
            s = { ...e[i][1].end },
            a = { ...e[n][1].start };
          (Pg(s, -o), Pg(a, o));
          const u = {
              type: o > 1 ? "strongSequence" : "emphasisSequence",
              start: s,
              end: { ...e[i][1].end },
            },
            c = {
              type: o > 1 ? "strongSequence" : "emphasisSequence",
              start: { ...e[n][1].start },
              end: a,
            },
            d = {
              type: o > 1 ? "strongText" : "emphasisText",
              start: { ...e[i][1].end },
              end: { ...e[n][1].start },
            },
            f = {
              type: o > 1 ? "strong" : "emphasis",
              start: { ...u.start },
              end: { ...c.end },
            };
          ((e[i][1].end = { ...u.start }),
            (e[n][1].start = { ...c.end }),
            (r = []),
            e[i][1].end.offset - e[i][1].start.offset &&
              (r = Qt(r, [
                ["enter", e[i][1], t],
                ["exit", e[i][1], t],
              ])),
            (r = Qt(r, [
              ["enter", f, t],
              ["enter", u, t],
              ["exit", u, t],
              ["enter", d, t],
            ])),
            (r = Qt(
              r,
              Zp(t.parser.constructs.insideSpan.null, e.slice(i + 1, n), t),
            )),
            (r = Qt(r, [
              ["exit", d, t],
              ["enter", c, t],
              ["exit", c, t],
              ["exit", f, t],
            ])));
          let h = 0;
          (e[n][1].end.offset - e[n][1].start.offset &&
            ((h = 2),
            (r = Qt(r, [
              ["enter", e[n][1], t],
              ["exit", e[n][1], t],
            ]))),
            Hr(e, i - 1, n - i + 3, r),
            (n = i + r.length - h - 2));
          break;
        }
    }
  for (n = -1; ++n < e.length;)
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function UM(e, t) {
  const n = this.parser.constructs.attentionMarkers.null,
    r = this.previous,
    i = jg(r);
  let o;
  return s;
  function s(u) {
    return ((o = u), e.enter("attentionSequence"), a(u));
  }
  function a(u) {
    if (u === o) return (e.consume(u), a);
    const c = e.exit("attentionSequence"),
      d = jg(u),
      f = !d || (d === 2 && i) || (n.includes(u) && u !== 42 && u !== 95),
      h = !i || (i === 2 && d) || (n.includes(r) && r !== 42 && r !== 95);
    return (
      (c._open = !!(o === 42 ? f : f && (i || !h))),
      (c._close = !!(o === 42 ? h : h && (d || !f))),
      t(u)
    );
  }
}
function Pg(e, t) {
  ((e.column += t), (e.offset += t), (e._bufferIndex += t));
}
const WM = { name: "autolink", tokenize: VM };
function VM(e, t, n) {
  let r = 0;
  return i;
  function i(p) {
    return (
      e.enter("autolink"),
      e.enter("autolinkMarker"),
      e.consume(p),
      e.exit("autolinkMarker"),
      e.enter("autolinkProtocol"),
      o
    );
  }
  function o(p) {
    return En(p) ? (e.consume(p), s) : p === 64 ? n(p) : c(p);
  }
  function s(p) {
    return p === 43 || p === 45 || p === 46 || Ot(p) ? ((r = 1), a(p)) : c(p);
  }
  function a(p) {
    return p === 58
      ? (e.consume(p), (r = 0), u)
      : (p === 43 || p === 45 || p === 46 || Ot(p)) && r++ < 32
        ? (e.consume(p), a)
        : ((r = 0), c(p));
  }
  function u(p) {
    return p === 62
      ? (e.exit("autolinkProtocol"),
        e.enter("autolinkMarker"),
        e.consume(p),
        e.exit("autolinkMarker"),
        e.exit("autolink"),
        t)
      : p === null || p === 32 || p === 60 || sf(p)
        ? n(p)
        : (e.consume(p), u);
  }
  function c(p) {
    return p === 64 ? (e.consume(p), d) : MM(p) ? (e.consume(p), c) : n(p);
  }
  function d(p) {
    return Ot(p) ? f(p) : n(p);
  }
  function f(p) {
    return p === 46
      ? (e.consume(p), (r = 0), d)
      : p === 62
        ? ((e.exit("autolinkProtocol").type = "autolinkEmail"),
          e.enter("autolinkMarker"),
          e.consume(p),
          e.exit("autolinkMarker"),
          e.exit("autolink"),
          t)
        : h(p);
  }
  function h(p) {
    if ((p === 45 || Ot(p)) && r++ < 63) {
      const v = p === 45 ? h : f;
      return (e.consume(p), v);
    }
    return n(p);
  }
}
const Cu = { partial: !0, tokenize: HM };
function HM(e, t, n) {
  return r;
  function r(o) {
    return he(o) ? _e(e, i, "linePrefix")(o) : i(o);
  }
  function i(o) {
    return o === null || ne(o) ? t(o) : n(o);
  }
}
const Pw = {
  continuation: { tokenize: QM },
  exit: KM,
  name: "blockQuote",
  tokenize: qM,
};
function qM(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    if (s === 62) {
      const a = r.containerState;
      return (
        a.open || (e.enter("blockQuote", { _container: !0 }), (a.open = !0)),
        e.enter("blockQuotePrefix"),
        e.enter("blockQuoteMarker"),
        e.consume(s),
        e.exit("blockQuoteMarker"),
        o
      );
    }
    return n(s);
  }
  function o(s) {
    return he(s)
      ? (e.enter("blockQuotePrefixWhitespace"),
        e.consume(s),
        e.exit("blockQuotePrefixWhitespace"),
        e.exit("blockQuotePrefix"),
        t)
      : (e.exit("blockQuotePrefix"), t(s));
  }
}
function QM(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return he(s)
      ? _e(
          e,
          o,
          "linePrefix",
          r.parser.constructs.disable.null.includes("codeIndented")
            ? void 0
            : 4,
        )(s)
      : o(s);
  }
  function o(s) {
    return e.attempt(Pw, t, n)(s);
  }
}
function KM(e) {
  e.exit("blockQuote");
}
const _w = { name: "characterEscape", tokenize: GM };
function GM(e, t, n) {
  return r;
  function r(o) {
    return (
      e.enter("characterEscape"),
      e.enter("escapeMarker"),
      e.consume(o),
      e.exit("escapeMarker"),
      i
    );
  }
  function i(o) {
    return AM(o)
      ? (e.enter("characterEscapeValue"),
        e.consume(o),
        e.exit("characterEscapeValue"),
        e.exit("characterEscape"),
        t)
      : n(o);
  }
}
const Rw = { name: "characterReference", tokenize: YM };
function YM(e, t, n) {
  const r = this;
  let i = 0,
    o,
    s;
  return a;
  function a(f) {
    return (
      e.enter("characterReference"),
      e.enter("characterReferenceMarker"),
      e.consume(f),
      e.exit("characterReferenceMarker"),
      u
    );
  }
  function u(f) {
    return f === 35
      ? (e.enter("characterReferenceMarkerNumeric"),
        e.consume(f),
        e.exit("characterReferenceMarkerNumeric"),
        c)
      : (e.enter("characterReferenceValue"), (o = 31), (s = Ot), d(f));
  }
  function c(f) {
    return f === 88 || f === 120
      ? (e.enter("characterReferenceMarkerHexadecimal"),
        e.consume(f),
        e.exit("characterReferenceMarkerHexadecimal"),
        e.enter("characterReferenceValue"),
        (o = 6),
        (s = TM),
        d)
      : (e.enter("characterReferenceValue"), (o = 7), (s = af), d(f));
  }
  function d(f) {
    if (f === 59 && i) {
      const h = e.exit("characterReferenceValue");
      return s === Ot && !Xp(r.sliceSerialize(h))
        ? n(f)
        : (e.enter("characterReferenceMarker"),
          e.consume(f),
          e.exit("characterReferenceMarker"),
          e.exit("characterReference"),
          t);
    }
    return s(f) && i++ < o ? (e.consume(f), d) : n(f);
  }
}
const uf = { partial: !0, tokenize: XM };
function XM(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return s === null
      ? n(s)
      : (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), o);
  }
  function o(s) {
    return r.parser.lazy[r.now().line] ? n(s) : t(s);
  }
}
const _g = { concrete: !0, name: "codeFenced", tokenize: ZM };
function ZM(e, t, n) {
  const r = this,
    i = { partial: !0, tokenize: N };
  let o = 0,
    s = 0,
    a;
  return u;
  function u(C) {
    return c(C);
  }
  function c(C) {
    const j = r.events[r.events.length - 1];
    return (
      (o =
        j && j[1].type === "linePrefix"
          ? j[2].sliceSerialize(j[1], !0).length
          : 0),
      (a = C),
      e.enter("codeFenced"),
      e.enter("codeFencedFence"),
      e.enter("codeFencedFenceSequence"),
      d(C)
    );
  }
  function d(C) {
    return C === a
      ? (s++, e.consume(C), d)
      : s < 3
        ? n(C)
        : (e.exit("codeFencedFenceSequence"),
          he(C) ? _e(e, f, "whitespace")(C) : f(C));
  }
  function f(C) {
    return C === null || ne(C)
      ? (e.exit("codeFencedFence"), r.interrupt ? t(C) : e.check(uf, g, k)(C))
      : (e.enter("codeFencedFenceInfo"),
        e.enter("chunkString", { contentType: "string" }),
        h(C));
  }
  function h(C) {
    return C === null || ne(C)
      ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), f(C))
      : he(C)
        ? (e.exit("chunkString"),
          e.exit("codeFencedFenceInfo"),
          _e(e, p, "whitespace")(C))
        : C === 96 && C === a
          ? n(C)
          : (e.consume(C), h);
  }
  function p(C) {
    return C === null || ne(C)
      ? f(C)
      : (e.enter("codeFencedFenceMeta"),
        e.enter("chunkString", { contentType: "string" }),
        v(C));
  }
  function v(C) {
    return C === null || ne(C)
      ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), f(C))
      : C === 96 && C === a
        ? n(C)
        : (e.consume(C), v);
  }
  function g(C) {
    return e.attempt(i, k, b)(C);
  }
  function b(C) {
    return (e.enter("lineEnding"), e.consume(C), e.exit("lineEnding"), m);
  }
  function m(C) {
    return o > 0 && he(C) ? _e(e, x, "linePrefix", o + 1)(C) : x(C);
  }
  function x(C) {
    return C === null || ne(C)
      ? e.check(uf, g, k)(C)
      : (e.enter("codeFlowValue"), y(C));
  }
  function y(C) {
    return C === null || ne(C)
      ? (e.exit("codeFlowValue"), x(C))
      : (e.consume(C), y);
  }
  function k(C) {
    return (e.exit("codeFenced"), t(C));
  }
  function N(C, j, P) {
    let T = 0;
    return I;
    function I(Q) {
      return (C.enter("lineEnding"), C.consume(Q), C.exit("lineEnding"), D);
    }
    function D(Q) {
      return (
        C.enter("codeFencedFence"),
        he(Q)
          ? _e(
              C,
              O,
              "linePrefix",
              r.parser.constructs.disable.null.includes("codeIndented")
                ? void 0
                : 4,
            )(Q)
          : O(Q)
      );
    }
    function O(Q) {
      return Q === a ? (C.enter("codeFencedFenceSequence"), $(Q)) : P(Q);
    }
    function $(Q) {
      return Q === a
        ? (T++, C.consume(Q), $)
        : T >= s
          ? (C.exit("codeFencedFenceSequence"),
            he(Q) ? _e(C, G, "whitespace")(Q) : G(Q))
          : P(Q);
    }
    function G(Q) {
      return Q === null || ne(Q) ? (C.exit("codeFencedFence"), j(Q)) : P(Q);
    }
  }
}
const kc = { name: "codeIndented", tokenize: eT },
  JM = { partial: !0, tokenize: tT };
function eT(e, t, n) {
  return r;
  function r(a) {
    return (e.enter("codeIndented"), jw(e, i, n, "linePrefix", 4, 4)(a));
  }
  function i(a) {
    return a === null
      ? s(a)
      : ne(a)
        ? e.attempt(JM, i, s)(a)
        : (e.enter("codeFlowValue"), o(a));
  }
  function o(a) {
    return a === null || ne(a)
      ? (e.exit("codeFlowValue"), i(a))
      : (e.consume(a), o);
  }
  function s(a) {
    return (e.exit("codeIndented"), t(a));
  }
}
function tT(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return r.parser.lazy[r.now().line]
      ? n(s)
      : ne(s)
        ? (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), i)
        : jw(e, t, o, "linePrefix", 4, 4)(s);
  }
  function o(s) {
    return ne(s) ? i(s) : n(s);
  }
}
const nT = { name: "codeText", previous: iT, resolve: rT, tokenize: oT };
function rT(e) {
  let t = e.length - 4,
    n = 3,
    r,
    i;
  if (
    (e[n][1].type === "lineEnding" || e[n][1].type === "space") &&
    (e[t][1].type === "lineEnding" || e[t][1].type === "space")
  ) {
    for (r = n; ++r < t;)
      if (e[r][1].type === "codeTextData") {
        ((e[n][1].type = "codeTextPadding"),
          (e[t][1].type = "codeTextPadding"),
          (n += 2),
          (t -= 2));
        break;
      }
  }
  for (r = n - 1, t++; ++r <= t;)
    i === void 0
      ? r !== t && e[r][1].type !== "lineEnding" && (i = r)
      : (r === t || e[r][1].type === "lineEnding") &&
        ((e[i][1].type = "codeTextData"),
        r !== i + 2 &&
          ((e[i][1].end = e[r - 1][1].end),
          e.splice(i + 2, r - i - 2),
          (t -= r - i - 2),
          (r = i + 2)),
        (i = void 0));
  return e;
}
function iT(e) {
  return (
    e !== 96 ||
    this.events[this.events.length - 1][1].type === "characterEscape"
  );
}
function oT(e, t, n) {
  let r = 0,
    i,
    o;
  return s;
  function s(f) {
    return (e.enter("codeText"), e.enter("codeTextSequence"), a(f));
  }
  function a(f) {
    return f === 96
      ? (e.consume(f), r++, a)
      : (e.exit("codeTextSequence"), u(f));
  }
  function u(f) {
    return f === null
      ? n(f)
      : f === 32
        ? (e.enter("space"), e.consume(f), e.exit("space"), u)
        : f === 96
          ? ((o = e.enter("codeTextSequence")), (i = 0), d(f))
          : ne(f)
            ? (e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), u)
            : (e.enter("codeTextData"), c(f));
  }
  function c(f) {
    return f === null || f === 32 || f === 96 || ne(f)
      ? (e.exit("codeTextData"), u(f))
      : (e.consume(f), c);
  }
  function d(f) {
    return f === 96
      ? (e.consume(f), i++, d)
      : i === r
        ? (e.exit("codeTextSequence"), e.exit("codeText"), t(f))
        : ((o.type = "codeTextData"), c(f));
  }
}
class sT {
  constructor(t) {
    ((this.left = t ? [...t] : []), (this.right = []));
  }
  get(t) {
    if (t < 0 || t >= this.left.length + this.right.length)
      throw new RangeError(
        "Cannot access index `" +
          t +
          "` in a splice buffer of size `" +
          (this.left.length + this.right.length) +
          "`",
      );
    return t < this.left.length
      ? this.left[t]
      : this.right[this.right.length - t + this.left.length - 1];
  }
  get length() {
    return this.left.length + this.right.length;
  }
  shift() {
    return (this.setCursor(0), this.right.pop());
  }
  slice(t, n) {
    const r = n ?? Number.POSITIVE_INFINITY;
    return r < this.left.length
      ? this.left.slice(t, r)
      : t > this.left.length
        ? this.right
            .slice(
              this.right.length - r + this.left.length,
              this.right.length - t + this.left.length,
            )
            .reverse()
        : this.left
            .slice(t)
            .concat(
              this.right
                .slice(this.right.length - r + this.left.length)
                .reverse(),
            );
  }
  splice(t, n, r) {
    const i = n || 0;
    this.setCursor(Math.trunc(t));
    const o = this.right.splice(
      this.right.length - i,
      Number.POSITIVE_INFINITY,
    );
    return (r && ns(this.left, r), o.reverse());
  }
  pop() {
    return (this.setCursor(Number.POSITIVE_INFINITY), this.left.pop());
  }
  push(t) {
    (this.setCursor(Number.POSITIVE_INFINITY), this.left.push(t));
  }
  pushMany(t) {
    (this.setCursor(Number.POSITIVE_INFINITY), ns(this.left, t));
  }
  unshift(t) {
    (this.setCursor(0), this.right.push(t));
  }
  unshiftMany(t) {
    (this.setCursor(0), ns(this.right, t.reverse()));
  }
  setCursor(t) {
    if (!(
      t === this.left.length ||
      (t > this.left.length && this.right.length === 0) ||
      (t < 0 && this.left.length === 0)
    ))
      if (t < this.left.length) {
        const n = this.left.splice(t, Number.POSITIVE_INFINITY);
        ns(this.right, n.reverse());
      } else {
        const n = this.right.splice(
          this.left.length + this.right.length - t,
          Number.POSITIVE_INFINITY,
        );
        ns(this.left, n.reverse());
      }
  }
}
function ns(e, t) {
  let n = 0;
  if (t.length < 1e4) e.push(...t);
  else for (; n < t.length;) (e.push(...t.slice(n, n + 1e4)), (n += 1e4));
}
function Mw(e) {
  const t = {};
  let n = -1,
    r,
    i,
    o,
    s,
    a,
    u,
    c;
  const d = new sT(e);
  for (; ++n < d.length;) {
    for (; n in t;) n = t[n];
    if (
      ((r = d.get(n)),
      n &&
        r[1].type === "chunkFlow" &&
        d.get(n - 1)[1].type === "listItemPrefix" &&
        ((u = r[1]._tokenizer.events),
        (o = 0),
        o < u.length && u[o][1].type === "lineEndingBlank" && (o += 2),
        o < u.length && u[o][1].type === "content"))
    )
      for (; ++o < u.length && u[o][1].type !== "content";)
        u[o][1].type === "chunkText" &&
          ((u[o][1]._isInFirstContentOfListItem = !0), o++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, aT(d, n)), (n = t[n]), (c = !0));
    else if (r[1]._container) {
      for (o = n, i = void 0; o--;)
        if (
          ((s = d.get(o)),
          s[1].type === "lineEnding" || s[1].type === "lineEndingBlank")
        )
          s[0] === "enter" &&
            (i && (d.get(i)[1].type = "lineEndingBlank"),
            (s[1].type = "lineEnding"),
            (i = o));
        else if (!(
          s[1].type === "linePrefix" || s[1].type === "listItemIndent"
        ))
          break;
      i &&
        ((r[1].end = { ...d.get(i)[1].start }),
        (a = d.slice(i, n)),
        a.unshift(r),
        d.splice(i, n - i + 1, a));
    }
  }
  return (Hr(e, 0, Number.POSITIVE_INFINITY, d.slice(0)), !c);
}
function aT(e, t) {
  const n = e.get(t)[1],
    r = e.get(t)[2];
  let i = t - 1;
  const o = [];
  let s = n._tokenizer;
  s ||
    ((s = r.parser[n.contentType](n.start)),
    n._contentTypeTextTrailing && (s._contentTypeTextTrailing = !0));
  const a = s.events,
    u = [],
    c = {};
  let d,
    f,
    h = -1,
    p = n,
    v = 0,
    g = 0;
  const b = [g];
  for (; p;) {
    for (; e.get(++i)[1] !== p;);
    (o.push(i),
      p._tokenizer ||
        ((d = r.sliceStream(p)),
        p.next || d.push(null),
        f && s.defineSkip(p.start),
        p._isInFirstContentOfListItem &&
          (s._gfmTasklistFirstContentOfListItem = !0),
        s.write(d),
        p._isInFirstContentOfListItem &&
          (s._gfmTasklistFirstContentOfListItem = void 0)),
      (f = p),
      (p = p.next));
  }
  for (p = n; ++h < a.length;)
    a[h][0] === "exit" &&
      a[h - 1][0] === "enter" &&
      a[h][1].type === a[h - 1][1].type &&
      a[h][1].start.line !== a[h][1].end.line &&
      ((g = h + 1),
      b.push(g),
      (p._tokenizer = void 0),
      (p.previous = void 0),
      (p = p.next));
  for (
    s.events = [],
      p ? ((p._tokenizer = void 0), (p.previous = void 0)) : b.pop(),
      h = b.length;
    h--;
  ) {
    const m = a.slice(b[h], b[h + 1]),
      x = o.pop();
    (u.push([x, x + m.length - 1]), e.splice(x, 2, m));
  }
  for (u.reverse(), h = -1; ++h < u.length;)
    ((c[v + u[h][0]] = v + u[h][1]), (v += u[h][1] - u[h][0] - 1));
  return c;
}
const lT = { resolve: cT, tokenize: dT },
  uT = { partial: !0, tokenize: fT };
function cT(e) {
  return (Mw(e), e);
}
function dT(e, t) {
  let n;
  return r;
  function r(a) {
    return (
      e.enter("content"),
      (n = e.enter("chunkContent", { contentType: "content" })),
      i(a)
    );
  }
  function i(a) {
    return a === null ? o(a) : ne(a) ? e.check(uT, s, o)(a) : (e.consume(a), i);
  }
  function o(a) {
    return (e.exit("chunkContent"), e.exit("content"), t(a));
  }
  function s(a) {
    return (
      e.consume(a),
      e.exit("chunkContent"),
      (n.next = e.enter("chunkContent", {
        contentType: "content",
        previous: n,
      })),
      (n = n.next),
      i
    );
  }
}
function fT(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return (
      e.exit("chunkContent"),
      e.enter("lineEnding"),
      e.consume(s),
      e.exit("lineEnding"),
      _e(e, o, "linePrefix")
    );
  }
  function o(s) {
    if (s === null || ne(s)) return n(s);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") &&
      a &&
      a[1].type === "linePrefix" &&
      a[2].sliceSerialize(a[1], !0).length >= 4
      ? t(s)
      : e.interrupt(r.parser.constructs.flow, n, t)(s);
  }
}
function Tw(e, t, n, r, i, o, s, a, u) {
  const c = u || Number.POSITIVE_INFINITY;
  let d = 0;
  return f;
  function f(m) {
    return m === 60
      ? (e.enter(r), e.enter(i), e.enter(o), e.consume(m), e.exit(o), h)
      : m === null || m === 32 || m === 41 || sf(m)
        ? n(m)
        : (e.enter(r),
          e.enter(s),
          e.enter(a),
          e.enter("chunkString", { contentType: "string" }),
          g(m));
  }
  function h(m) {
    return m === 62
      ? (e.enter(o), e.consume(m), e.exit(o), e.exit(i), e.exit(r), t)
      : (e.enter(a), e.enter("chunkString", { contentType: "string" }), p(m));
  }
  function p(m) {
    return m === 62
      ? (e.exit("chunkString"), e.exit(a), h(m))
      : m === null || m === 60 || ne(m)
        ? n(m)
        : (e.consume(m), m === 92 ? v : p);
  }
  function v(m) {
    return m === 60 || m === 62 || m === 92 ? (e.consume(m), p) : p(m);
  }
  function g(m) {
    return !d && (m === null || m === 41 || jt(m))
      ? (e.exit("chunkString"), e.exit(a), e.exit(s), e.exit(r), t(m))
      : d < c && m === 40
        ? (e.consume(m), d++, g)
        : m === 41
          ? (e.consume(m), d--, g)
          : m === null || m === 32 || m === 40 || sf(m)
            ? n(m)
            : (e.consume(m), m === 92 ? b : g);
  }
  function b(m) {
    return m === 40 || m === 41 || m === 92 ? (e.consume(m), g) : g(m);
  }
}
function Aw(e, t, n, r, i, o) {
  const s = this;
  let a = 0,
    u;
  return c;
  function c(p) {
    return (e.enter(r), e.enter(i), e.consume(p), e.exit(i), e.enter(o), d);
  }
  function d(p) {
    return a > 999 ||
      p === null ||
      p === 91 ||
      (p === 93 && !u) ||
      (p === 94 && !a && "_hiddenFootnoteSupport" in s.parser.constructs)
      ? n(p)
      : p === 93
        ? (e.exit(o), e.enter(i), e.consume(p), e.exit(i), e.exit(r), t)
        : ne(p)
          ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), d)
          : (e.enter("chunkString", { contentType: "string" }), f(p));
  }
  function f(p) {
    return p === null || p === 91 || p === 93 || ne(p) || a++ > 999
      ? (e.exit("chunkString"), d(p))
      : (e.consume(p), u || (u = !he(p)), p === 92 ? h : f);
  }
  function h(p) {
    return p === 91 || p === 92 || p === 93 ? (e.consume(p), a++, f) : f(p);
  }
}
function Iw(e, t, n, r, i, o) {
  let s;
  return a;
  function a(h) {
    return h === 34 || h === 39 || h === 40
      ? (e.enter(r),
        e.enter(i),
        e.consume(h),
        e.exit(i),
        (s = h === 40 ? 41 : h),
        u)
      : n(h);
  }
  function u(h) {
    return h === s
      ? (e.enter(i), e.consume(h), e.exit(i), e.exit(r), t)
      : (e.enter(o), c(h));
  }
  function c(h) {
    return h === s
      ? (e.exit(o), u(s))
      : h === null
        ? n(h)
        : ne(h)
          ? (e.enter("lineEnding"),
            e.consume(h),
            e.exit("lineEnding"),
            _e(e, c, "linePrefix"))
          : (e.enter("chunkString", { contentType: "string" }), d(h));
  }
  function d(h) {
    return h === s || h === null || ne(h)
      ? (e.exit("chunkString"), c(h))
      : (e.consume(h), h === 92 ? f : d);
  }
  function f(h) {
    return h === s || h === 92 ? (e.consume(h), d) : d(h);
  }
}
function ws(e, t) {
  let n;
  return r;
  function r(i) {
    return ne(i)
      ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), (n = !0), r)
      : he(i)
        ? _e(e, r, n ? "linePrefix" : "lineSuffix")(i)
        : t(i);
  }
}
const pT = { name: "definition", tokenize: mT },
  hT = { partial: !0, tokenize: gT };
function mT(e, t, n) {
  const r = this;
  let i;
  return o;
  function o(p) {
    return (e.enter("definition"), s(p));
  }
  function s(p) {
    return Aw.call(
      r,
      e,
      a,
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString",
    )(p);
  }
  function a(p) {
    return (
      (i = ao(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))),
      p === 58
        ? (e.enter("definitionMarker"),
          e.consume(p),
          e.exit("definitionMarker"),
          u)
        : n(p)
    );
  }
  function u(p) {
    return jt(p) ? ws(e, c)(p) : c(p);
  }
  function c(p) {
    return Tw(
      e,
      d,
      n,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString",
    )(p);
  }
  function d(p) {
    return e.attempt(hT, f, f)(p);
  }
  function f(p) {
    return he(p) ? _e(e, h, "whitespace")(p) : h(p);
  }
  function h(p) {
    return p === null || ne(p)
      ? (e.exit("definition"), r.parser.defined.push(i), t(p))
      : n(p);
  }
}
function gT(e, t, n) {
  return r;
  function r(a) {
    return jt(a) ? ws(e, i)(a) : n(a);
  }
  function i(a) {
    return Iw(
      e,
      o,
      n,
      "definitionTitle",
      "definitionTitleMarker",
      "definitionTitleString",
    )(a);
  }
  function o(a) {
    return he(a) ? _e(e, s, "whitespace")(a) : s(a);
  }
  function s(a) {
    return a === null || ne(a) ? t(a) : n(a);
  }
}
const yT = { name: "hardBreakEscape", tokenize: xT };
function xT(e, t, n) {
  return r;
  function r(o) {
    return (e.enter("hardBreakEscape"), e.consume(o), i);
  }
  function i(o) {
    return ne(o) ? (e.exit("hardBreakEscape"), t(o)) : n(o);
  }
}
const vT = { name: "headingAtx", resolve: wT, tokenize: bT };
function wT(e, t) {
  let n = e.length - 2,
    r = 3;
  if (
    (e[r][1].type === "whitespace" && (r += 2),
    n - 2 > r && e[n][1].type === "whitespace" && (n -= 2),
    e[n][1].type === "atxHeadingSequence" &&
      (r === n - 1 || (n - 4 > r && e[n - 2][1].type === "whitespace")) &&
      (n -= r + 1 === n ? 2 : 4),
    n > r)
  ) {
    const i = {
        type: "atxHeadingText",
        start: e[r][1].start,
        end: e[n][1].end,
      },
      o = {
        type: "chunkText",
        start: e[r][1].start,
        end: e[n][1].end,
        contentType: "text",
      };
    Hr(e, r, n - r + 1, [
      ["enter", i, t],
      ["enter", o, t],
      ["exit", o, t],
      ["exit", i, t],
    ]);
  }
  return e;
}
function bT(e, t, n) {
  let r = 0;
  return i;
  function i(d) {
    return (e.enter("atxHeading"), o(d));
  }
  function o(d) {
    return (e.enter("atxHeadingSequence"), s(d));
  }
  function s(d) {
    return d === 35 && r++ < 6
      ? (e.consume(d), s)
      : d === null || jt(d)
        ? (e.exit("atxHeadingSequence"), a(d))
        : n(d);
  }
  function a(d) {
    return d === 35
      ? (e.enter("atxHeadingSequence"), u(d))
      : d === null || ne(d)
        ? (e.exit("atxHeading"), t(d))
        : he(d)
          ? _e(e, a, "whitespace")(d)
          : (e.enter("atxHeadingText"), c(d));
  }
  function u(d) {
    return d === 35 ? (e.consume(d), u) : (e.exit("atxHeadingSequence"), a(d));
  }
  function c(d) {
    return d === null || d === 35 || jt(d)
      ? (e.exit("atxHeadingText"), a(d))
      : (e.consume(d), c);
  }
}
const kT = [
    "address",
    "article",
    "aside",
    "base",
    "basefont",
    "blockquote",
    "body",
    "caption",
    "center",
    "col",
    "colgroup",
    "dd",
    "details",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "iframe",
    "legend",
    "li",
    "link",
    "main",
    "menu",
    "menuitem",
    "nav",
    "noframes",
    "ol",
    "optgroup",
    "option",
    "p",
    "param",
    "search",
    "section",
    "summary",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "title",
    "tr",
    "track",
    "ul",
  ],
  Rg = ["pre", "script", "style", "textarea"],
  ST = { concrete: !0, name: "htmlFlow", resolveTo: NT, tokenize: ET },
  CT = { partial: !0, tokenize: jT };
function NT(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"););
  return (
    t > 1 &&
      e[t - 2][1].type === "linePrefix" &&
      ((e[t][1].start = e[t - 2][1].start),
      (e[t + 1][1].start = e[t - 2][1].start),
      e.splice(t - 2, 2)),
    e
  );
}
function ET(e, t, n) {
  const r = this;
  let i, o, s, a, u;
  return c;
  function c(E) {
    return d(E);
  }
  function d(E) {
    return (e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(E), f);
  }
  function f(E) {
    return E === 33
      ? (e.consume(E), h)
      : E === 47
        ? (e.consume(E), (o = !0), g)
        : E === 63
          ? (e.consume(E), (i = 3), r.interrupt ? t : S)
          : En(E)
            ? (e.consume(E), (s = String.fromCharCode(E)), b)
            : n(E);
  }
  function h(E) {
    return E === 45
      ? (e.consume(E), (i = 2), p)
      : E === 91
        ? (e.consume(E), (i = 5), (a = 0), v)
        : En(E)
          ? (e.consume(E), (i = 4), r.interrupt ? t : S)
          : n(E);
  }
  function p(E) {
    return E === 45 ? (e.consume(E), r.interrupt ? t : S) : n(E);
  }
  function v(E) {
    const X = "CDATA[";
    return E === X.charCodeAt(a++)
      ? (e.consume(E), a === X.length ? (r.interrupt ? t : O) : v)
      : n(E);
  }
  function g(E) {
    return En(E) ? (e.consume(E), (s = String.fromCharCode(E)), b) : n(E);
  }
  function b(E) {
    if (E === null || E === 47 || E === 62 || jt(E)) {
      const X = E === 47,
        ge = s.toLowerCase();
      return !X && !o && Rg.includes(ge)
        ? ((i = 1), r.interrupt ? t(E) : O(E))
        : kT.includes(s.toLowerCase())
          ? ((i = 6), X ? (e.consume(E), m) : r.interrupt ? t(E) : O(E))
          : ((i = 7),
            r.interrupt && !r.parser.lazy[r.now().line]
              ? n(E)
              : o
                ? x(E)
                : y(E));
    }
    return E === 45 || Ot(E)
      ? (e.consume(E), (s += String.fromCharCode(E)), b)
      : n(E);
  }
  function m(E) {
    return E === 62 ? (e.consume(E), r.interrupt ? t : O) : n(E);
  }
  function x(E) {
    return he(E) ? (e.consume(E), x) : I(E);
  }
  function y(E) {
    return E === 47
      ? (e.consume(E), I)
      : E === 58 || E === 95 || En(E)
        ? (e.consume(E), k)
        : he(E)
          ? (e.consume(E), y)
          : I(E);
  }
  function k(E) {
    return E === 45 || E === 46 || E === 58 || E === 95 || Ot(E)
      ? (e.consume(E), k)
      : N(E);
  }
  function N(E) {
    return E === 61 ? (e.consume(E), C) : he(E) ? (e.consume(E), N) : y(E);
  }
  function C(E) {
    return E === null || E === 60 || E === 61 || E === 62 || E === 96
      ? n(E)
      : E === 34 || E === 39
        ? (e.consume(E), (u = E), j)
        : he(E)
          ? (e.consume(E), C)
          : P(E);
  }
  function j(E) {
    return E === u
      ? (e.consume(E), (u = null), T)
      : E === null || ne(E)
        ? n(E)
        : (e.consume(E), j);
  }
  function P(E) {
    return E === null ||
      E === 34 ||
      E === 39 ||
      E === 47 ||
      E === 60 ||
      E === 61 ||
      E === 62 ||
      E === 96 ||
      jt(E)
      ? N(E)
      : (e.consume(E), P);
  }
  function T(E) {
    return E === 47 || E === 62 || he(E) ? y(E) : n(E);
  }
  function I(E) {
    return E === 62 ? (e.consume(E), D) : n(E);
  }
  function D(E) {
    return E === null || ne(E) ? O(E) : he(E) ? (e.consume(E), D) : n(E);
  }
  function O(E) {
    return E === 45 && i === 2
      ? (e.consume(E), V)
      : E === 60 && i === 1
        ? (e.consume(E), Y)
        : E === 62 && i === 4
          ? (e.consume(E), U)
          : E === 63 && i === 3
            ? (e.consume(E), S)
            : E === 93 && i === 5
              ? (e.consume(E), _)
              : ne(E) && (i === 6 || i === 7)
                ? (e.exit("htmlFlowData"), e.check(CT, W, $)(E))
                : E === null || ne(E)
                  ? (e.exit("htmlFlowData"), $(E))
                  : (e.consume(E), O);
  }
  function $(E) {
    return e.check(uf, G, W)(E);
  }
  function G(E) {
    return (e.enter("lineEnding"), e.consume(E), e.exit("lineEnding"), Q);
  }
  function Q(E) {
    return E === null || ne(E) ? $(E) : (e.enter("htmlFlowData"), O(E));
  }
  function V(E) {
    return E === 45 ? (e.consume(E), S) : O(E);
  }
  function Y(E) {
    return E === 47 ? (e.consume(E), (s = ""), A) : O(E);
  }
  function A(E) {
    if (E === 62) {
      const X = s.toLowerCase();
      return Rg.includes(X) ? (e.consume(E), U) : O(E);
    }
    return En(E) && s.length < 8
      ? (e.consume(E), (s += String.fromCharCode(E)), A)
      : O(E);
  }
  function _(E) {
    return E === 93 ? (e.consume(E), S) : O(E);
  }
  function S(E) {
    return E === 62
      ? (e.consume(E), U)
      : E === 45 && i === 2
        ? (e.consume(E), S)
        : O(E);
  }
  function U(E) {
    return E === null || ne(E)
      ? (e.exit("htmlFlowData"), W(E))
      : (e.consume(E), U);
  }
  function W(E) {
    return (e.exit("htmlFlow"), t(E));
  }
}
function jT(e, t, n) {
  return r;
  function r(i) {
    return (
      e.enter("lineEnding"),
      e.consume(i),
      e.exit("lineEnding"),
      e.attempt(Cu, t, n)
    );
  }
}
const PT = { name: "htmlText", tokenize: _T };
function _T(e, t, n) {
  const r = this;
  let i, o, s;
  return a;
  function a(S) {
    return (e.enter("htmlText"), e.enter("htmlTextData"), e.consume(S), u);
  }
  function u(S) {
    return S === 33
      ? (e.consume(S), c)
      : S === 47
        ? (e.consume(S), N)
        : S === 63
          ? (e.consume(S), y)
          : En(S)
            ? (e.consume(S), P)
            : n(S);
  }
  function c(S) {
    return S === 45
      ? (e.consume(S), d)
      : S === 91
        ? (e.consume(S), (o = 0), v)
        : En(S)
          ? (e.consume(S), x)
          : n(S);
  }
  function d(S) {
    return S === 45 ? (e.consume(S), p) : n(S);
  }
  function f(S) {
    return S === null
      ? n(S)
      : S === 45
        ? (e.consume(S), h)
        : ne(S)
          ? ((s = f), Y(S))
          : (e.consume(S), f);
  }
  function h(S) {
    return S === 45 ? (e.consume(S), p) : f(S);
  }
  function p(S) {
    return S === 62 ? V(S) : S === 45 ? h(S) : f(S);
  }
  function v(S) {
    const U = "CDATA[";
    return S === U.charCodeAt(o++)
      ? (e.consume(S), o === U.length ? g : v)
      : n(S);
  }
  function g(S) {
    return S === null
      ? n(S)
      : S === 93
        ? (e.consume(S), b)
        : ne(S)
          ? ((s = g), Y(S))
          : (e.consume(S), g);
  }
  function b(S) {
    return S === 93 ? (e.consume(S), m) : g(S);
  }
  function m(S) {
    return S === 62 ? V(S) : S === 93 ? (e.consume(S), m) : g(S);
  }
  function x(S) {
    return S === null || S === 62
      ? V(S)
      : ne(S)
        ? ((s = x), Y(S))
        : (e.consume(S), x);
  }
  function y(S) {
    return S === null
      ? n(S)
      : S === 63
        ? (e.consume(S), k)
        : ne(S)
          ? ((s = y), Y(S))
          : (e.consume(S), y);
  }
  function k(S) {
    return S === 62 ? V(S) : y(S);
  }
  function N(S) {
    return En(S) ? (e.consume(S), C) : n(S);
  }
  function C(S) {
    return S === 45 || Ot(S) ? (e.consume(S), C) : j(S);
  }
  function j(S) {
    return ne(S) ? ((s = j), Y(S)) : he(S) ? (e.consume(S), j) : V(S);
  }
  function P(S) {
    return S === 45 || Ot(S)
      ? (e.consume(S), P)
      : S === 47 || S === 62 || jt(S)
        ? T(S)
        : n(S);
  }
  function T(S) {
    return S === 47
      ? (e.consume(S), V)
      : S === 58 || S === 95 || En(S)
        ? (e.consume(S), I)
        : ne(S)
          ? ((s = T), Y(S))
          : he(S)
            ? (e.consume(S), T)
            : V(S);
  }
  function I(S) {
    return S === 45 || S === 46 || S === 58 || S === 95 || Ot(S)
      ? (e.consume(S), I)
      : D(S);
  }
  function D(S) {
    return S === 61
      ? (e.consume(S), O)
      : ne(S)
        ? ((s = D), Y(S))
        : he(S)
          ? (e.consume(S), D)
          : T(S);
  }
  function O(S) {
    return S === null || S === 60 || S === 61 || S === 62 || S === 96
      ? n(S)
      : S === 34 || S === 39
        ? (e.consume(S), (i = S), $)
        : ne(S)
          ? ((s = O), Y(S))
          : he(S)
            ? (e.consume(S), O)
            : (e.consume(S), G);
  }
  function $(S) {
    return S === i
      ? (e.consume(S), (i = void 0), Q)
      : S === null
        ? n(S)
        : ne(S)
          ? ((s = $), Y(S))
          : (e.consume(S), $);
  }
  function G(S) {
    return S === null ||
      S === 34 ||
      S === 39 ||
      S === 60 ||
      S === 61 ||
      S === 96
      ? n(S)
      : S === 47 || S === 62 || jt(S)
        ? T(S)
        : (e.consume(S), G);
  }
  function Q(S) {
    return S === 47 || S === 62 || jt(S) ? T(S) : n(S);
  }
  function V(S) {
    return S === 62
      ? (e.consume(S), e.exit("htmlTextData"), e.exit("htmlText"), t)
      : n(S);
  }
  function Y(S) {
    return (
      e.exit("htmlTextData"),
      e.enter("lineEnding"),
      e.consume(S),
      e.exit("lineEnding"),
      A
    );
  }
  function A(S) {
    return he(S)
      ? _e(
          e,
          _,
          "linePrefix",
          r.parser.constructs.disable.null.includes("codeIndented")
            ? void 0
            : 4,
        )(S)
      : _(S);
  }
  function _(S) {
    return (e.enter("htmlTextData"), s(S));
  }
}
const Jp = { name: "labelEnd", resolveAll: AT, resolveTo: IT, tokenize: OT },
  RT = { tokenize: DT },
  MT = { tokenize: LT },
  TT = { tokenize: zT };
function AT(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length;) {
    const r = e[t][1];
    if (
      (n.push(e[t]),
      r.type === "labelImage" ||
        r.type === "labelLink" ||
        r.type === "labelEnd")
    ) {
      const i = r.type === "labelImage" ? 4 : 2;
      ((r.type = "data"), (t += i));
    }
  }
  return (e.length !== n.length && Hr(e, 0, e.length, n), e);
}
function IT(e, t) {
  let n = e.length,
    r = 0,
    i,
    o,
    s;
  for (; n--;) {
    const d = e[n][1];
    if (i) {
      if (d.type === "link" || (d.type === "labelLink" && d._inactive)) break;
      e[n][0] === "enter" && d.type === "labelLink" && (d._inactive = !0);
    } else if (o) {
      if (
        e[n][0] === "enter" &&
        (d.type === "labelImage" || d.type === "labelLink") &&
        !d._balanced &&
        ((i = n), d.type !== "labelLink")
      ) {
        r = 2;
        break;
      }
    } else d.type === "labelEnd" && (o = n);
  }
  const a = {
      type: e[i][1].type === "labelLink" ? "link" : "image",
      start: { ...e[i][1].start },
      end: { ...e[e.length - 1][1].end },
    },
    u = { type: "label", start: { ...e[i][1].start }, end: { ...e[o][1].end } },
    c = {
      type: "labelText",
      start: { ...e[i + r + 2][1].end },
      end: { ...e[o - 2][1].start },
    };
  return (
    (s = [
      ["enter", a, t],
      ["enter", u, t],
    ]),
    (s = Qt(s, e.slice(i + 1, i + r + 3))),
    (s = Qt(s, [["enter", c, t]])),
    (s = Qt(
      s,
      Zp(t.parser.constructs.insideSpan.null, e.slice(i + r + 4, o - 3), t),
    )),
    (s = Qt(s, [["exit", c, t], e[o - 2], e[o - 1], ["exit", u, t]])),
    (s = Qt(s, e.slice(o + 1))),
    (s = Qt(s, [["exit", a, t]])),
    Hr(e, i, e.length, s),
    e
  );
}
function OT(e, t, n) {
  const r = this,
    i = r._labelStarts;
  let o, s;
  if (i) {
    for (; i.length > 0 && i[i.length - 1]._balanced;) i.pop();
    o = i[i.length - 1];
  }
  return a;
  function a(h) {
    return o
      ? o._inactive
        ? f(h)
        : ((s = r.parser.defined.includes(
            ao(r.sliceSerialize({ start: o.end, end: r.now() })),
          )),
          e.enter("labelEnd"),
          e.enter("labelMarker"),
          e.consume(h),
          e.exit("labelMarker"),
          e.exit("labelEnd"),
          u)
      : n(h);
  }
  function u(h) {
    return h === 40
      ? e.attempt(RT, d, s ? d : f)(h)
      : h === 91
        ? e.attempt(MT, d, s ? c : f)(h)
        : s
          ? d(h)
          : f(h);
  }
  function c(h) {
    return e.attempt(TT, d, f)(h);
  }
  function d(h) {
    return (i.pop(), t(h));
  }
  function f(h) {
    return ((o._balanced = !0), n(h));
  }
}
function DT(e, t, n) {
  return r;
  function r(f) {
    return (
      e.enter("resource"),
      e.enter("resourceMarker"),
      e.consume(f),
      e.exit("resourceMarker"),
      i
    );
  }
  function i(f) {
    return jt(f) ? ws(e, o)(f) : o(f);
  }
  function o(f) {
    return f === 41
      ? d(f)
      : Tw(
          e,
          s,
          a,
          "resourceDestination",
          "resourceDestinationLiteral",
          "resourceDestinationLiteralMarker",
          "resourceDestinationRaw",
          "resourceDestinationString",
          32,
        )(f);
  }
  function s(f) {
    return jt(f) ? ws(e, u)(f) : d(f);
  }
  function a(f) {
    return n(f);
  }
  function u(f) {
    return f === 34 || f === 39 || f === 40
      ? Iw(
          e,
          c,
          n,
          "resourceTitle",
          "resourceTitleMarker",
          "resourceTitleString",
        )(f)
      : d(f);
  }
  function c(f) {
    return jt(f) ? ws(e, d)(f) : d(f);
  }
  function d(f) {
    return f === 41
      ? (e.enter("resourceMarker"),
        e.consume(f),
        e.exit("resourceMarker"),
        e.exit("resource"),
        t)
      : n(f);
  }
}
function LT(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return Aw.call(
      r,
      e,
      o,
      s,
      "reference",
      "referenceMarker",
      "referenceString",
    )(a);
  }
  function o(a) {
    return r.parser.defined.includes(
      ao(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)),
    )
      ? t(a)
      : n(a);
  }
  function s(a) {
    return n(a);
  }
}
function zT(e, t, n) {
  return r;
  function r(o) {
    return (
      e.enter("reference"),
      e.enter("referenceMarker"),
      e.consume(o),
      e.exit("referenceMarker"),
      i
    );
  }
  function i(o) {
    return o === 93
      ? (e.enter("referenceMarker"),
        e.consume(o),
        e.exit("referenceMarker"),
        e.exit("reference"),
        t)
      : n(o);
  }
}
const FT = { name: "labelStartImage", resolveAll: Jp.resolveAll, tokenize: BT };
function BT(e, t, n) {
  const r = this;
  let i;
  return o;
  function o(u) {
    return (
      e.enter("labelImage"),
      e.enter("labelImageMarker"),
      e.consume(u),
      e.exit("labelImageMarker"),
      s
    );
  }
  function s(u) {
    return u === 91
      ? (e.enter("labelMarker"),
        e.consume(u),
        e.exit("labelMarker"),
        (i = e.exit("labelImage")),
        a)
      : n(u);
  }
  function a(u) {
    return u === 94 && "_hiddenFootnoteSupport" in r.parser.constructs
      ? n(u)
      : ((r._labelStarts = r._labelStarts || []), r._labelStarts.push(i), t(u));
  }
}
const $T = { name: "labelStartLink", resolveAll: Jp.resolveAll, tokenize: UT };
function UT(e, t, n) {
  const r = this;
  let i;
  return o;
  function o(a) {
    return (
      e.enter("labelLink"),
      e.enter("labelMarker"),
      e.consume(a),
      e.exit("labelMarker"),
      (i = e.exit("labelLink")),
      s
    );
  }
  function s(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs
      ? n(a)
      : ((r._labelStarts = r._labelStarts || []), r._labelStarts.push(i), t(a));
  }
}
const Sc = { name: "lineEnding", tokenize: WT };
function WT(e, t) {
  return n;
  function n(r) {
    return (
      e.enter("lineEnding"),
      e.consume(r),
      e.exit("lineEnding"),
      _e(e, t, "linePrefix")
    );
  }
}
const ol = { name: "thematicBreak", tokenize: VT };
function VT(e, t, n) {
  let r = 0,
    i;
  return o;
  function o(c) {
    return (e.enter("thematicBreak"), s(c));
  }
  function s(c) {
    return ((i = c), a(c));
  }
  function a(c) {
    return c === i
      ? (e.enter("thematicBreakSequence"), u(c))
      : r >= 3 && (c === null || ne(c))
        ? (e.exit("thematicBreak"), t(c))
        : n(c);
  }
  function u(c) {
    return c === i
      ? (e.consume(c), r++, u)
      : (e.exit("thematicBreakSequence"),
        he(c) ? _e(e, a, "whitespace")(c) : a(c));
  }
}
const xt = {
    continuation: { tokenize: KT },
    exit: YT,
    name: "list",
    tokenize: QT,
  },
  HT = { partial: !0, tokenize: XT },
  qT = { partial: !0, tokenize: GT };
function QT(e, t, n) {
  const r = this,
    i = r.events[r.events.length - 1];
  let o =
      i && i[1].type === "linePrefix"
        ? i[2].sliceSerialize(i[1], !0).length
        : 0,
    s = 0;
  return a;
  function a(p) {
    const v =
      r.containerState.type ||
      (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (
      v === "listUnordered"
        ? !r.containerState.marker || p === r.containerState.marker
        : af(p)
    ) {
      if (
        (r.containerState.type ||
          ((r.containerState.type = v), e.enter(v, { _container: !0 })),
        v === "listUnordered")
      )
        return (
          e.enter("listItemPrefix"),
          p === 42 || p === 45 ? e.check(ol, n, c)(p) : c(p)
        );
      if (!r.interrupt || p === 49)
        return (e.enter("listItemPrefix"), e.enter("listItemValue"), u(p));
    }
    return n(p);
  }
  function u(p) {
    return af(p) && ++s < 10
      ? (e.consume(p), u)
      : (!r.interrupt || s < 2) &&
          (r.containerState.marker
            ? p === r.containerState.marker
            : p === 41 || p === 46)
        ? (e.exit("listItemValue"), c(p))
        : n(p);
  }
  function c(p) {
    return (
      e.enter("listItemMarker"),
      e.consume(p),
      e.exit("listItemMarker"),
      (r.containerState.marker = r.containerState.marker || p),
      e.check(Cu, r.interrupt ? n : d, e.attempt(HT, h, f))
    );
  }
  function d(p) {
    return ((r.containerState.initialBlankLine = !0), o++, h(p));
  }
  function f(p) {
    return he(p)
      ? (e.enter("listItemPrefixWhitespace"),
        e.consume(p),
        e.exit("listItemPrefixWhitespace"),
        h)
      : n(p);
  }
  function h(p) {
    return (
      (r.containerState.size =
        o + r.sliceSerialize(e.exit("listItemPrefix"), !0).length),
      t(p)
    );
  }
}
function KT(e, t, n) {
  const r = this;
  return ((r.containerState._closeFlow = void 0), e.check(Cu, i, o));
  function i(a) {
    return (
      (r.containerState.furtherBlankLines =
        r.containerState.furtherBlankLines ||
        r.containerState.initialBlankLine),
      _e(e, t, "listItemIndent", r.containerState.size + 1)(a)
    );
  }
  function o(a) {
    return r.containerState.furtherBlankLines || !he(a)
      ? ((r.containerState.furtherBlankLines = void 0),
        (r.containerState.initialBlankLine = void 0),
        s(a))
      : ((r.containerState.furtherBlankLines = void 0),
        (r.containerState.initialBlankLine = void 0),
        e.attempt(qT, t, s)(a));
  }
  function s(a) {
    return (
      (r.containerState._closeFlow = !0),
      (r.interrupt = void 0),
      _e(
        e,
        e.attempt(xt, t, n),
        "linePrefix",
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4,
      )(a)
    );
  }
}
function GT(e, t, n) {
  const r = this;
  return _e(e, i, "listItemIndent", r.containerState.size + 1);
  function i(o) {
    const s = r.events[r.events.length - 1];
    return s &&
      s[1].type === "listItemIndent" &&
      s[2].sliceSerialize(s[1], !0).length === r.containerState.size
      ? t(o)
      : n(o);
  }
}
function YT(e) {
  e.exit(this.containerState.type);
}
function XT(e, t, n) {
  const r = this;
  return _e(
    e,
    i,
    "listItemPrefixWhitespace",
    r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5,
  );
  function i(o) {
    const s = r.events[r.events.length - 1];
    return !he(o) && s && s[1].type === "listItemPrefixWhitespace"
      ? t(o)
      : n(o);
  }
}
const Mg = { name: "setextUnderline", resolveTo: ZT, tokenize: JT };
function ZT(e, t) {
  const n = new Wl();
  let r = e.length,
    i,
    o,
    s;
  for (; r--;)
    if (e[r][0] === "enter") {
      if (e[r][1].type === "content") {
        i = r;
        break;
      }
      e[r][1].type === "paragraph" && (o = r);
    } else
      (e[r][1].type === "content" && n.add(r, 1, []),
        !s && e[r][1].type === "definition" && (s = r));
  const a = {
    type: "setextHeading",
    start: { ...e[i][1].start },
    end: { ...e[e.length - 1][1].end },
  };
  return (
    (e[o][1].type = "setextHeadingText"),
    s
      ? (n.add(o, 0, [["enter", a, t]]),
        n.add(s + 1, 0, [["exit", e[i][1], t]]),
        (e[i][1].end = { ...e[s][1].end }))
      : (e[i][1] = a),
    n.add(e.length, 0, [["exit", a, t]]),
    n.consume(e),
    e
  );
}
function JT(e, t, n) {
  const r = this;
  let i;
  return o;
  function o(c) {
    let d = r.events.length,
      f;
    for (; d--;)
      if (
        r.events[d][1].type !== "lineEnding" &&
        r.events[d][1].type !== "linePrefix" &&
        r.events[d][1].type !== "content"
      ) {
        f = r.events[d][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || f)
      ? (e.enter("setextHeadingLine"), (i = c), s(c))
      : n(c);
  }
  function s(c) {
    return (e.enter("setextHeadingLineSequence"), a(c));
  }
  function a(c) {
    return c === i
      ? (e.consume(c), a)
      : (e.exit("setextHeadingLineSequence"),
        he(c) ? _e(e, u, "lineSuffix")(c) : u(c));
  }
  function u(c) {
    return c === null || ne(c) ? (e.exit("setextHeadingLine"), t(c)) : n(c);
  }
}
const e4 = { tokenize: t4 };
function t4(e) {
  const t = this,
    n = e.attempt(
      Cu,
      r,
      e.attempt(
        this.parser.constructs.flowInitial,
        i,
        _e(
          e,
          e.attempt(this.parser.constructs.flow, i, e.attempt(lT, i)),
          "linePrefix",
        ),
      ),
    );
  return n;
  function r(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return (
      e.enter("lineEndingBlank"),
      e.consume(o),
      e.exit("lineEndingBlank"),
      (t.currentConstruct = void 0),
      n
    );
  }
  function i(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return (
      e.enter("lineEnding"),
      e.consume(o),
      e.exit("lineEnding"),
      (t.currentConstruct = void 0),
      n
    );
  }
}
const n4 = { resolveAll: Dw() },
  r4 = Ow("string"),
  i4 = Ow("text");
function Ow(e) {
  return { resolveAll: Dw(e === "text" ? o4 : void 0), tokenize: t };
  function t(n) {
    const r = this,
      i = this.parser.constructs[e],
      o = n.attempt(i, s, a);
    return s;
    function s(d) {
      return c(d) ? o(d) : a(d);
    }
    function a(d) {
      if (d === null) {
        n.consume(d);
        return;
      }
      return (n.enter("data"), n.consume(d), u);
    }
    function u(d) {
      return c(d) ? (n.exit("data"), o(d)) : (n.consume(d), u);
    }
    function c(d) {
      if (d === null) return !0;
      const f = i[d];
      let h = -1;
      if (f)
        for (; ++h < f.length;) {
          const p = f[h];
          if (!p.previous || p.previous.call(r, r.previous)) return !0;
        }
      return !1;
    }
  }
}
function Dw(e) {
  return t;
  function t(n, r) {
    let i = -1,
      o;
    for (; ++i <= n.length;)
      o === void 0
        ? n[i] && n[i][1].type === "data" && ((o = i), i++)
        : (!n[i] || n[i][1].type !== "data") &&
          (i !== o + 2 &&
            ((n[o][1].end = n[i - 1][1].end),
            n.splice(o + 2, i - o - 2),
            (i = o + 2)),
          (o = void 0));
    return e ? e(n, r) : n;
  }
}
function o4(e, t) {
  const n = new Wl();
  let r = 0;
  for (; ++r <= e.length;)
    if (
      (r === e.length || e[r][1].type === "lineEnding") &&
      e[r - 1][1].type === "data"
    ) {
      const i = e[r - 1][1],
        o = t.sliceStream(i);
      let s = o.length,
        a = -1,
        u = 0,
        c;
      for (; s--;) {
        const d = o[s];
        if (typeof d == "string") {
          for (a = d.length; d.charCodeAt(a - 1) === 32;) (u++, a--);
          if (a) break;
          a = -1;
        } else if (d === -2) ((c = !0), u++);
        else if (d !== -1) {
          s++;
          break;
        }
      }
      if ((t._contentTypeTextTrailing && r === e.length && (u = 0), u)) {
        const d = {
          type:
            r === e.length || c || u < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: s ? a : i.start._bufferIndex + a,
            _index: i.start._index + s,
            line: i.end.line,
            column: i.end.column - u,
            offset: i.end.offset - u,
          },
          end: { ...i.end },
        };
        ((i.end = { ...d.start }),
          i.start.offset === i.end.offset
            ? Object.assign(i, d)
            : n.add(r, 0, [
                ["enter", d, t],
                ["exit", d, t],
              ]));
      }
      r++;
    }
  return (n.consume(e), e);
}
const s4 = {
    42: xt,
    43: xt,
    45: xt,
    48: xt,
    49: xt,
    50: xt,
    51: xt,
    52: xt,
    53: xt,
    54: xt,
    55: xt,
    56: xt,
    57: xt,
    62: Pw,
  },
  a4 = { 91: pT },
  l4 = { [-2]: kc, [-1]: kc, 32: kc },
  u4 = {
    35: vT,
    42: ol,
    45: [Mg, ol],
    60: ST,
    61: Mg,
    95: ol,
    96: _g,
    126: _g,
  },
  c4 = { 38: Rw, 92: _w },
  d4 = {
    [-5]: Sc,
    [-4]: Sc,
    [-3]: Sc,
    33: FT,
    38: Rw,
    42: lf,
    60: [WM, PT],
    91: $T,
    92: [yT, _w],
    93: Jp,
    95: lf,
    96: nT,
  },
  f4 = { null: [lf, n4] },
  p4 = { null: [42, 95] },
  h4 = { null: [] },
  m4 = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        attentionMarkers: p4,
        contentInitial: a4,
        disable: h4,
        document: s4,
        flow: u4,
        flowInitial: l4,
        insideSpan: f4,
        string: c4,
        text: d4,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  );
function g4(e, t, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: (n && n.line) || 1,
    column: (n && n.column) || 1,
    offset: (n && n.offset) || 0,
  };
  const i = {},
    o = [];
  let s = [],
    a = [];
  const u = {
      attempt: j(N),
      check: j(C),
      consume: x,
      enter: y,
      exit: k,
      interrupt: j(C, { interrupt: !0 }),
    },
    c = {
      code: null,
      containerState: {},
      defineSkip: g,
      events: [],
      now: v,
      parser: e,
      previous: null,
      sliceSerialize: h,
      sliceStream: p,
      write: f,
    };
  let d = t.tokenize.call(c, u);
  return (t.resolveAll && o.push(t), c);
  function f(D) {
    return (
      (s = Qt(s, D)),
      b(),
      s[s.length - 1] !== null
        ? []
        : (P(t, 0), (c.events = Zp(o, c.events, c)), c.events)
    );
  }
  function h(D, O) {
    return x4(p(D), O);
  }
  function p(D) {
    return y4(s, D);
  }
  function v() {
    const { _bufferIndex: D, _index: O, line: $, column: G, offset: Q } = r;
    return { _bufferIndex: D, _index: O, line: $, column: G, offset: Q };
  }
  function g(D) {
    ((i[D.line] = D.column), I());
  }
  function b() {
    for (; r._index < s.length;) {
      const D = s[r._index];
      if (typeof D == "string") {
        const O = r._index;
        for (
          r._bufferIndex < 0 && (r._bufferIndex = 0);
          r._index === O && r._bufferIndex < D.length;
        )
          m(D.charCodeAt(r._bufferIndex));
      } else m(D);
    }
  }
  function m(D) {
    d = d(D);
  }
  function x(D) {
    (ne(D)
      ? (r.line++, (r.column = 1), (r.offset += D === -3 ? 2 : 1), I())
      : D !== -1 && (r.column++, r.offset++),
      r._bufferIndex < 0
        ? r._index++
        : (r._bufferIndex++,
          r._bufferIndex === s[r._index].length &&
            ((r._bufferIndex = -1), r._index++)),
      (c.previous = D));
  }
  function y(D, O) {
    const $ = O || {};
    return (
      ($.type = D),
      ($.start = v()),
      c.events.push(["enter", $, c]),
      a.push($),
      $
    );
  }
  function k(D) {
    const O = a.pop();
    return ((O.end = v()), c.events.push(["exit", O, c]), O);
  }
  function N(D, O) {
    P(D, O.from);
  }
  function C(D, O) {
    O.restore();
  }
  function j(D, O) {
    return $;
    function $(G, Q, V) {
      let Y, A, _, S;
      return Array.isArray(G) ? W(G) : "tokenize" in G ? W([G]) : U(G);
      function U(oe) {
        return ae;
        function ae(He) {
          const Se = He !== null && oe[He],
            qe = He !== null && oe.null,
            Bt = [
              ...(Array.isArray(Se) ? Se : Se ? [Se] : []),
              ...(Array.isArray(qe) ? qe : qe ? [qe] : []),
            ];
          return W(Bt)(He);
        }
      }
      function W(oe) {
        return ((Y = oe), (A = 0), oe.length === 0 ? V : E(oe[A]));
      }
      function E(oe) {
        return ae;
        function ae(He) {
          return (
            (S = T()),
            (_ = oe),
            oe.partial || (c.currentConstruct = oe),
            oe.name && c.parser.constructs.disable.null.includes(oe.name)
              ? ge()
              : oe.tokenize.call(
                  O ? Object.assign(Object.create(c), O) : c,
                  u,
                  X,
                  ge,
                )(He)
          );
        }
      }
      function X(oe) {
        return (D(_, S), Q);
      }
      function ge(oe) {
        return (S.restore(), ++A < Y.length ? E(Y[A]) : V);
      }
    }
  }
  function P(D, O) {
    (D.resolveAll && !o.includes(D) && o.push(D),
      D.resolve &&
        Hr(c.events, O, c.events.length - O, D.resolve(c.events.slice(O), c)),
      D.resolveTo && (c.events = D.resolveTo(c.events, c)));
  }
  function T() {
    const D = v(),
      O = c.previous,
      $ = c.currentConstruct,
      G = c.events.length,
      Q = Array.from(a);
    return { from: G, restore: V };
    function V() {
      ((r = D),
        (c.previous = O),
        (c.currentConstruct = $),
        (c.events.length = G),
        (a = Q),
        I());
    }
  }
  function I() {
    r.line in i &&
      r.column < 2 &&
      ((r.column = i[r.line]), (r.offset += i[r.line] - 1));
  }
}
function y4(e, t) {
  const n = t.start._index,
    r = t.start._bufferIndex,
    i = t.end._index,
    o = t.end._bufferIndex;
  let s;
  if (n === i) s = [e[n].slice(r, o)];
  else {
    if (((s = e.slice(n, i)), r > -1)) {
      const a = s[0];
      typeof a == "string" ? (s[0] = a.slice(r)) : s.shift();
    }
    o > 0 && s.push(e[i].slice(0, o));
  }
  return s;
}
function x4(e, t) {
  let n = -1;
  const r = [];
  let i;
  for (; ++n < e.length;) {
    const o = e[n];
    let s;
    if (typeof o == "string") s = o;
    else
      switch (o) {
        case -5: {
          s = "\r";
          break;
        }
        case -4: {
          s = `
`;
          break;
        }
        case -3: {
          s = `\r
`;
          break;
        }
        case -2: {
          s = t ? " " : "	";
          break;
        }
        case -1: {
          if (!t && i) continue;
          s = " ";
          break;
        }
        default:
          s = String.fromCharCode(o);
      }
    ((i = o === -2), r.push(s));
  }
  return r.join("");
}
function v4(e) {
  const r = {
    constructs: PM([m4, ...((e || {}).extensions || [])]),
    content: i(DM),
    defined: [],
    document: i(zM),
    flow: i(e4),
    lazy: {},
    string: i(r4),
    text: i(i4),
  };
  return r;
  function i(o) {
    return s;
    function s(a) {
      return g4(r, o, a);
    }
  }
}
function w4(e) {
  for (; !Mw(e););
  return e;
}
const Tg = /[\0\t\n\r]/g;
function b4() {
  let e = 1,
    t = "",
    n = !0,
    r;
  return i;
  function i(o, s, a) {
    o =
      t +
      (typeof o == "string"
        ? o.toString()
        : new TextDecoder(s || void 0).decode(o));
    const u = [];
    let c = 0;
    for (
      t = "", n && (o.charCodeAt(0) === 65279 && c++, (n = void 0));
      c < o.length;
    ) {
      Tg.lastIndex = c;
      const d = Tg.exec(o),
        f = d && d.index !== void 0 ? d.index : o.length,
        h = o.charCodeAt(f);
      if (!d) {
        t = o.slice(c);
        break;
      }
      if (h === 10 && c === f && r) (u.push(-3), (r = void 0));
      else
        switch (
          (r && (u.push(-5), (r = void 0)),
          c < f && (u.push(o.slice(c, f)), (e += f - c)),
          h)
        ) {
          case 0: {
            (u.push(65533), e++);
            break;
          }
          case 9: {
            const p = Math.ceil(e / 4) * 4;
            for (u.push(-2); e++ < p;) u.push(-1);
            break;
          }
          case 10: {
            (u.push(-4), (e = 1));
            break;
          }
          default:
            ((r = !0), (e = 1));
        }
      c = f + 1;
    }
    return (a && (r && u.push(-5), t && u.push(t), u.push(null)), u);
  }
}
const k4 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function S4(e) {
  return e.replace(k4, C4);
}
function C4(e, t, n) {
  if (t) return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1),
      o = i === 120 || i === 88;
    return Ew(n.slice(o ? 2 : 1), o ? 16 : 10);
  }
  return Xp(n) || e;
}
const Lw = {}.hasOwnProperty;
function N4(e, t, n) {
  return (
    t && typeof t == "object" && ((n = t), (t = void 0)),
    E4(n)(
      w4(
        v4(n)
          .document()
          .write(b4()(e, t, !0)),
      ),
    )
  );
}
function E4(e) {
  const t = {
    afterExit: [],
    beforeEnter: [],
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: s(mn),
      autolinkProtocol: I,
      autolinkEmail: I,
      atxHeading: s(Mi),
      blockQuote: s(Bt),
      characterEscape: I,
      characterReference: I,
      codeFenced: s(Qr),
      codeFencedFenceInfo: a,
      codeFencedFenceMeta: a,
      codeIndented: s(Qr, a),
      codeText: s(hn, a),
      codeTextData: I,
      data: I,
      codeFlowValue: I,
      definition: s(Ri),
      definitionDestinationString: a,
      definitionLabelString: a,
      definitionTitleString: a,
      emphasis: s(Kr),
      hardBreakEscape: s(Gr),
      hardBreakTrailing: s(Gr),
      htmlFlow: s(Tn, a),
      htmlFlowData: I,
      htmlText: s(Tn, a),
      htmlTextData: I,
      image: s(An),
      label: a,
      link: s(mn),
      listItem: s(ju),
      listItemValue: p,
      listOrdered: s(fa, h),
      listUnordered: s(fa),
      paragraph: s(yt),
      reference: X,
      referenceString: a,
      resourceDestinationString: a,
      resourceTitleString: a,
      setextHeading: s(Mi),
      strong: s(tr),
      thematicBreak: s(_u),
    },
    exit: {
      atxHeading: c(),
      atxHeadingSequence: C,
      autolink: c(),
      autolinkEmail: qe,
      autolinkProtocol: Se,
      blockQuote: c(),
      characterEscapeValue: D,
      characterReferenceMarkerHexadecimal: oe,
      characterReferenceMarkerNumeric: oe,
      characterReferenceValue: ae,
      characterReference: He,
      codeFenced: c(m),
      codeFencedFence: b,
      codeFencedFenceInfo: v,
      codeFencedFenceMeta: g,
      codeFlowValue: D,
      codeIndented: c(x),
      codeText: c(V),
      codeTextData: D,
      data: D,
      definition: c(),
      definitionDestinationString: N,
      definitionLabelString: y,
      definitionTitleString: k,
      emphasis: c(),
      hardBreakEscape: c($),
      hardBreakTrailing: c($),
      htmlFlow: c(G),
      htmlFlowData: D,
      htmlText: c(Q),
      htmlTextData: D,
      image: c(A),
      label: S,
      labelText: _,
      lineEnding: O,
      link: c(Y),
      listItem: c(),
      listOrdered: c(),
      listUnordered: c(),
      paragraph: c(),
      referenceString: ge,
      resourceDestinationString: U,
      resourceTitleString: W,
      resource: E,
      setextHeading: c(T),
      setextHeadingLineSequence: P,
      setextHeadingText: j,
      strong: c(),
      thematicBreak: c(),
    },
  };
  zw(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(M) {
    let F = { type: "root", children: [], position: void 0 };
    const J = {
        stack: [F],
        tokenStack: [],
        config: t,
        enter: u,
        exit: d,
        buffer: a,
        resume: f,
        data: n,
      },
      ee = [],
      Ye = [];
    let ye = -1;
    for (; ++ye < M.length;)
      if (
        (Ye.push(M[ye]),
        M[ye][1].type === "listOrdered" || M[ye][1].type === "listUnordered")
      )
        if (M[ye][0] === "enter") ee.push(Ye.length - 1);
        else {
          const nt = ee.pop();
          o(Ye, nt);
        }
    for (M = Ye, ye = -1; ++ye < M.length;) {
      const nt = t[M[ye][0]];
      (M[ye][0] === "enter" &&
        t.beforeEnter.length > 0 &&
        i(
          t.beforeEnter,
          { ...J, sliceSerialize: M[ye][2].sliceSerialize },
          M[ye][1],
        ),
        Lw.call(nt, M[ye][1].type) &&
          nt[M[ye][1].type].call(
            { ...J, sliceSerialize: M[ye][2].sliceSerialize },
            M[ye][1],
          ),
        M[ye][0] === "exit" &&
          t.afterExit.length > 0 &&
          i(
            t.afterExit,
            { ...J, sliceSerialize: M[ye][2].sliceSerialize },
            M[ye][1],
          ));
    }
    if (J.tokenStack.length > 0) {
      const nt = J.tokenStack[J.tokenStack.length - 1];
      (nt[1] || Ag).call(J, void 0, nt[0]);
    }
    for (
      F.position = {
        start: ar(
          M.length > 0 ? M[0][1].start : { line: 1, column: 1, offset: 0 },
        ),
        end: ar(
          M.length > 0
            ? M[M.length - 2][1].end
            : { line: 1, column: 1, offset: 0 },
        ),
      },
        ye = -1;
      ++ye < t.transforms.length;
    )
      F = t.transforms[ye](F) || F;
    return F;
  }
  function i(M, F, J) {
    let ee = -1;
    for (; ++ee < M.length;) M[ee].call(F, J);
  }
  function o(M, F) {
    const J = M.length - 1;
    let ee = F - 1,
      Ye = -1,
      ye = !1,
      nt,
      $t,
      nr,
      rr;
    const Yr = [];
    for (; ++ee <= J;) {
      const ut = M[ee];
      switch (ut[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          (ut[0] === "enter" ? Ye++ : Ye--, (rr = void 0));
          break;
        }
        case "lineEndingBlank": {
          ut[0] === "enter" &&
            (nt && !rr && !Ye && !nr && (nr = ee), (rr = void 0));
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          rr = void 0;
      }
      if (
        (!Ye && ut[0] === "enter" && ut[1].type === "listItemPrefix") ||
        (Ye === -1 &&
          ut[0] === "exit" &&
          (ut[1].type === "listUnordered" || ut[1].type === "listOrdered"))
      ) {
        if (nt) {
          let Z = ee;
          for ($t = void 0; Z--;) {
            const ue = M[Z];
            if (
              ue[1].type === "lineEnding" ||
              ue[1].type === "lineEndingBlank"
            ) {
              if (ue[0] === "exit") continue;
              ($t && ((M[$t][1].type = "lineEndingBlank"), (ye = !0)),
                (ue[1].type = "lineEnding"),
                ($t = Z));
            } else if (!(
              ue[1].type === "linePrefix" ||
              ue[1].type === "blockQuotePrefix" ||
              ue[1].type === "blockQuotePrefixWhitespace" ||
              ue[1].type === "blockQuoteMarker" ||
              ue[1].type === "listItemIndent"
            ))
              break;
          }
          (nr && (!$t || nr < $t) && (nt._spread = !0),
            (nt.end = Object.assign({}, $t ? M[$t][1].start : ut[1].end)),
            Yr.push({ at: $t || ee, event: ["exit", nt, ut[2]] }));
        }
        if (ut[1].type === "listItemPrefix") {
          const Z = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, ut[1].start),
            end: void 0,
          };
          ((nt = Z),
            Yr.push({ at: ee, event: ["enter", Z, ut[2]] }),
            (nr = void 0),
            (rr = !0));
        }
      }
    }
    const Ti = M.splice(F);
    let Ut = 0;
    for (ee = -1; ++ee < Ti.length;) {
      for (; Ut < Yr.length && Yr[Ut].at === F + ee;) M.push(Yr[Ut++].event);
      M.push(Ti[ee]);
    }
    M[F][1]._spread = ye;
  }
  function s(M, F) {
    return J;
    function J(ee) {
      (u.call(this, M(ee), ee), F && F.call(this, ee));
    }
  }
  function a() {
    this.stack.push({ type: "fragment", children: [] });
  }
  function u(M, F, J) {
    (this.stack[this.stack.length - 1].children.push(M),
      this.stack.push(M),
      this.tokenStack.push([F, J || void 0]),
      (M.position = { start: ar(F.start), end: void 0 }));
  }
  function c(M) {
    return F;
    function F(J) {
      (M && M.call(this, J), d.call(this, J));
    }
  }
  function d(M, F) {
    const J = this.stack.pop(),
      ee = this.tokenStack.pop();
    if (!ee)
      throw new Error(
        "Cannot close `" +
          M.type +
          "` (" +
          vs({ start: M.start, end: M.end }) +
          "): it’s not open",
      );
    (ee[0].type !== M.type &&
      (F ? F.call(this, M, ee[0]) : (ee[1] || Ag).call(this, M, ee[0])),
      (J.position.end = ar(M.end)));
  }
  function f() {
    return EM(this.stack.pop());
  }
  function h() {
    this.data.expectingFirstListItemValue = !0;
  }
  function p(M) {
    if (this.data.expectingFirstListItemValue) {
      const F = this.stack[this.stack.length - 2];
      ((F.start = Number.parseInt(this.sliceSerialize(M), 10)),
        (this.data.expectingFirstListItemValue = void 0));
    }
  }
  function v() {
    const M = this.resume(),
      F = this.stack[this.stack.length - 1];
    F.lang = M;
  }
  function g() {
    const M = this.resume(),
      F = this.stack[this.stack.length - 1];
    F.meta = M;
  }
  function b() {
    this.data.flowCodeInside ||
      (this.buffer(), (this.data.flowCodeInside = !0));
  }
  function m() {
    const M = this.resume(),
      F = this.stack[this.stack.length - 1];
    ((F.value = M.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "")),
      (this.data.flowCodeInside = void 0));
  }
  function x() {
    const M = this.resume(),
      F = this.stack[this.stack.length - 1];
    F.value = M.replace(/(\r?\n|\r)$/g, "");
  }
  function y(M) {
    const F = this.resume(),
      J = this.stack[this.stack.length - 1];
    ((J.label = F), (J.identifier = ao(this.sliceSerialize(M)).toLowerCase()));
  }
  function k() {
    const M = this.resume(),
      F = this.stack[this.stack.length - 1];
    F.title = M;
  }
  function N() {
    const M = this.resume(),
      F = this.stack[this.stack.length - 1];
    F.url = M;
  }
  function C(M) {
    const F = this.stack[this.stack.length - 1];
    if (!F.depth) {
      const J = this.sliceSerialize(M).length;
      F.depth = J;
    }
  }
  function j() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function P(M) {
    const F = this.stack[this.stack.length - 1];
    F.depth = this.sliceSerialize(M).codePointAt(0) === 61 ? 1 : 2;
  }
  function T() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function I(M) {
    const J = this.stack[this.stack.length - 1].children;
    let ee = J[J.length - 1];
    ((!ee || ee.type !== "text") &&
      ((ee = Pu()),
      (ee.position = { start: ar(M.start), end: void 0 }),
      J.push(ee)),
      this.stack.push(ee));
  }
  function D(M) {
    const F = this.stack.pop();
    ((F.value += this.sliceSerialize(M)), (F.position.end = ar(M.end)));
  }
  function O(M) {
    const F = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const J = F.children[F.children.length - 1];
      ((J.position.end = ar(M.end)), (this.data.atHardBreak = void 0));
      return;
    }
    !this.data.setextHeadingSlurpLineEnding &&
      t.canContainEols.includes(F.type) &&
      (I.call(this, M), D.call(this, M));
  }
  function $() {
    this.data.atHardBreak = !0;
  }
  function G() {
    const M = this.resume(),
      F = this.stack[this.stack.length - 1];
    F.value = M;
  }
  function Q() {
    const M = this.resume(),
      F = this.stack[this.stack.length - 1];
    F.value = M;
  }
  function V() {
    const M = this.resume(),
      F = this.stack[this.stack.length - 1];
    F.value = M;
  }
  function Y() {
    const M = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const F = this.data.referenceType || "shortcut";
      ((M.type += "Reference"),
        (M.referenceType = F),
        delete M.url,
        delete M.title);
    } else (delete M.identifier, delete M.label);
    this.data.referenceType = void 0;
  }
  function A() {
    const M = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const F = this.data.referenceType || "shortcut";
      ((M.type += "Reference"),
        (M.referenceType = F),
        delete M.url,
        delete M.title);
    } else (delete M.identifier, delete M.label);
    this.data.referenceType = void 0;
  }
  function _(M) {
    const F = this.sliceSerialize(M),
      J = this.stack[this.stack.length - 2];
    ((J.label = S4(F)), (J.identifier = ao(F).toLowerCase()));
  }
  function S() {
    const M = this.stack[this.stack.length - 1],
      F = this.resume(),
      J = this.stack[this.stack.length - 1];
    if (((this.data.inReference = !0), J.type === "link")) {
      const ee = M.children;
      J.children = ee;
    } else J.alt = F;
  }
  function U() {
    const M = this.resume(),
      F = this.stack[this.stack.length - 1];
    F.url = M;
  }
  function W() {
    const M = this.resume(),
      F = this.stack[this.stack.length - 1];
    F.title = M;
  }
  function E() {
    this.data.inReference = void 0;
  }
  function X() {
    this.data.referenceType = "collapsed";
  }
  function ge(M) {
    const F = this.resume(),
      J = this.stack[this.stack.length - 1];
    ((J.label = F),
      (J.identifier = ao(this.sliceSerialize(M)).toLowerCase()),
      (this.data.referenceType = "full"));
  }
  function oe(M) {
    this.data.characterReferenceType = M.type;
  }
  function ae(M) {
    const F = this.sliceSerialize(M),
      J = this.data.characterReferenceType;
    let ee;
    J
      ? ((ee = Ew(F, J === "characterReferenceMarkerNumeric" ? 10 : 16)),
        (this.data.characterReferenceType = void 0))
      : (ee = Xp(F));
    const Ye = this.stack[this.stack.length - 1];
    Ye.value += ee;
  }
  function He(M) {
    const F = this.stack.pop();
    F.position.end = ar(M.end);
  }
  function Se(M) {
    D.call(this, M);
    const F = this.stack[this.stack.length - 1];
    F.url = this.sliceSerialize(M);
  }
  function qe(M) {
    D.call(this, M);
    const F = this.stack[this.stack.length - 1];
    F.url = "mailto:" + this.sliceSerialize(M);
  }
  function Bt() {
    return { type: "blockquote", children: [], position: void 0 };
  }
  function Qr() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: "",
      position: void 0,
    };
  }
  function hn() {
    return { type: "inlineCode", value: "", position: void 0 };
  }
  function Ri() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: "",
      position: void 0,
    };
  }
  function Kr() {
    return { type: "emphasis", children: [], position: void 0 };
  }
  function Mi() {
    return { type: "heading", depth: 0, children: [], position: void 0 };
  }
  function Gr() {
    return { type: "break", position: void 0 };
  }
  function Tn() {
    return { type: "html", value: "", position: void 0 };
  }
  function An() {
    return { type: "image", title: null, url: "", alt: null, position: void 0 };
  }
  function mn() {
    return {
      type: "link",
      title: null,
      url: "",
      children: [],
      position: void 0,
    };
  }
  function fa(M) {
    return {
      type: "list",
      ordered: M.type === "listOrdered",
      start: null,
      spread: M._spread,
      children: [],
      position: void 0,
    };
  }
  function ju(M) {
    return {
      type: "listItem",
      spread: M._spread,
      checked: null,
      children: [],
      position: void 0,
    };
  }
  function yt() {
    return { type: "paragraph", children: [], position: void 0 };
  }
  function tr() {
    return { type: "strong", children: [], position: void 0 };
  }
  function Pu() {
    return { type: "text", value: "", position: void 0 };
  }
  function _u() {
    return { type: "thematicBreak", position: void 0 };
  }
}
function ar(e) {
  return { line: e.line, column: e.column, offset: e.offset };
}
function zw(e, t) {
  let n = -1;
  for (; ++n < t.length;) {
    const r = t[n];
    Array.isArray(r) ? zw(e, r) : j4(e, r);
  }
}
function j4(e, t) {
  let n;
  for (n in t)
    if (Lw.call(t, n))
      switch (n) {
        case "canContainEols": {
          const r = t[n];
          r && e[n].push(...r);
          break;
        }
        case "transforms": {
          const r = t[n];
          r && e[n].push(...r);
          break;
        }
        case "afterExit":
        case "beforeEnter": {
          const r = t[n];
          r && e[n].push(r);
          break;
        }
        case "enter":
        case "exit": {
          const r = t[n];
          r && Object.assign(e[n], r);
          break;
        }
      }
}
function Ag(e, t) {
  throw e
    ? new Error(
        "Cannot close `" +
          e.type +
          "` (" +
          vs({ start: e.start, end: e.end }) +
          "): a different token (`" +
          t.type +
          "`, " +
          vs({ start: t.start, end: t.end }) +
          ") is open",
      )
    : new Error(
        "Cannot close document, a token (`" +
          t.type +
          "`, " +
          vs({ start: t.start, end: t.end }) +
          ") is still open",
      );
}
function P4(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return N4(r, {
      ...t.data("settings"),
      ...e,
      extensions: t.data("micromarkExtensions") || [],
      mdastExtensions: t.data("fromMarkdownExtensions") || [],
    });
  }
}
function _4(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0),
  };
  return (e.patch(t, n), e.applyData(t, n));
}
function R4(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return (
    e.patch(t, n),
    [
      e.applyData(t, n),
      {
        type: "text",
        value: `
`,
      },
    ]
  );
}
function M4(e, t) {
  const n = t.value
      ? t.value +
        `
`
      : "",
    r = {},
    i = t.lang ? t.lang.split(/\s+/) : [];
  i.length > 0 && (r.className = ["language-" + i[0]]);
  let o = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: n }],
  };
  return (
    t.meta && (o.data = { meta: t.meta }),
    e.patch(t, o),
    (o = e.applyData(t, o)),
    (o = { type: "element", tagName: "pre", properties: {}, children: [o] }),
    e.patch(t, o),
    o
  );
}
function T4(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t),
  };
  return (e.patch(t, n), e.applyData(t, n));
}
function A4(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t),
  };
  return (e.patch(t, n), e.applyData(t, n));
}
function I4(e, t) {
  const n =
      typeof e.options.clobberPrefix == "string"
        ? e.options.clobberPrefix
        : "user-content-",
    r = String(t.identifier).toUpperCase(),
    i = Vo(r.toLowerCase()),
    o = e.footnoteOrder.indexOf(r);
  let s,
    a = e.footnoteCounts.get(r);
  (a === void 0
    ? ((a = 0), e.footnoteOrder.push(r), (s = e.footnoteOrder.length))
    : (s = o + 1),
    (a += 1),
    e.footnoteCounts.set(r, a));
  const u = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + n + "fn-" + i,
      id: n + "fnref-" + i + (a > 1 ? "-" + a : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"],
    },
    children: [{ type: "text", value: String(s) }],
  };
  e.patch(t, u);
  const c = { type: "element", tagName: "sup", properties: {}, children: [u] };
  return (e.patch(t, c), e.applyData(t, c));
}
function O4(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t),
  };
  return (e.patch(t, n), e.applyData(t, n));
}
function D4(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return (e.patch(t, n), e.applyData(t, n));
  }
}
function Fw(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (
    (n === "collapsed"
      ? (r += "[]")
      : n === "full" && (r += "[" + (t.label || t.identifier) + "]"),
    t.type === "imageReference")
  )
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t),
    o = i[0];
  o && o.type === "text"
    ? (o.value = "[" + o.value)
    : i.unshift({ type: "text", value: "[" });
  const s = i[i.length - 1];
  return (
    s && s.type === "text"
      ? (s.value += r)
      : i.push({ type: "text", value: r }),
    i
  );
}
function L4(e, t) {
  const n = String(t.identifier).toUpperCase(),
    r = e.definitionById.get(n);
  if (!r) return Fw(e, t);
  const i = { src: Vo(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const o = { type: "element", tagName: "img", properties: i, children: [] };
  return (e.patch(t, o), e.applyData(t, o));
}
function z4(e, t) {
  const n = { src: Vo(t.url) };
  (t.alt !== null && t.alt !== void 0 && (n.alt = t.alt),
    t.title !== null && t.title !== void 0 && (n.title = t.title));
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return (e.patch(t, r), e.applyData(t, r));
}
function F4(e, t) {
  const n = { type: "text", value: t.value.replace(/\r?\n|\r/g, " ") };
  e.patch(t, n);
  const r = { type: "element", tagName: "code", properties: {}, children: [n] };
  return (e.patch(t, r), e.applyData(t, r));
}
function B4(e, t) {
  const n = String(t.identifier).toUpperCase(),
    r = e.definitionById.get(n);
  if (!r) return Fw(e, t);
  const i = { href: Vo(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const o = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t),
  };
  return (e.patch(t, o), e.applyData(t, o));
}
function $4(e, t) {
  const n = { href: Vo(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t),
  };
  return (e.patch(t, r), e.applyData(t, r));
}
function U4(e, t, n) {
  const r = e.all(t),
    i = n ? W4(n) : Bw(t),
    o = {},
    s = [];
  if (typeof t.checked == "boolean") {
    const d = r[0];
    let f;
    (d && d.type === "element" && d.tagName === "p"
      ? (f = d)
      : ((f = { type: "element", tagName: "p", properties: {}, children: [] }),
        r.unshift(f)),
      f.children.length > 0 && f.children.unshift({ type: "text", value: " " }),
      f.children.unshift({
        type: "element",
        tagName: "input",
        properties: { type: "checkbox", checked: t.checked, disabled: !0 },
        children: [],
      }),
      (o.className = ["task-list-item"]));
  }
  let a = -1;
  for (; ++a < r.length;) {
    const d = r[a];
    ((i || a !== 0 || d.type !== "element" || d.tagName !== "p") &&
      s.push({
        type: "text",
        value: `
`,
      }),
      d.type === "element" && d.tagName === "p" && !i
        ? s.push(...d.children)
        : s.push(d));
  }
  const u = r[r.length - 1];
  u &&
    (i || u.type !== "element" || u.tagName !== "p") &&
    s.push({
      type: "text",
      value: `
`,
    });
  const c = { type: "element", tagName: "li", properties: o, children: s };
  return (e.patch(t, c), e.applyData(t, c));
}
function W4(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length;) t = Bw(n[r]);
  }
  return t;
}
function Bw(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function V4(e, t) {
  const n = {},
    r = e.all(t);
  let i = -1;
  for (
    typeof t.start == "number" && t.start !== 1 && (n.start = t.start);
    ++i < r.length;
  ) {
    const s = r[i];
    if (
      s.type === "element" &&
      s.tagName === "li" &&
      s.properties &&
      Array.isArray(s.properties.className) &&
      s.properties.className.includes("task-list-item")
    ) {
      n.className = ["contains-task-list"];
      break;
    }
  }
  const o = {
    type: "element",
    tagName: t.ordered ? "ol" : "ul",
    properties: n,
    children: e.wrap(r, !0),
  };
  return (e.patch(t, o), e.applyData(t, o));
}
function H4(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t),
  };
  return (e.patch(t, n), e.applyData(t, n));
}
function q4(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return (e.patch(t, n), e.applyData(t, n));
}
function Q4(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t),
  };
  return (e.patch(t, n), e.applyData(t, n));
}
function K4(e, t) {
  const n = e.all(t),
    r = n.shift(),
    i = [];
  if (r) {
    const s = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0),
    };
    (e.patch(t.children[0], s), i.push(s));
  }
  if (n.length > 0) {
    const s = {
        type: "element",
        tagName: "tbody",
        properties: {},
        children: e.wrap(n, !0),
      },
      a = Qp(t.children[1]),
      u = vw(t.children[t.children.length - 1]);
    (a && u && (s.position = { start: a, end: u }), i.push(s));
  }
  const o = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0),
  };
  return (e.patch(t, o), e.applyData(t, o));
}
function G4(e, t, n) {
  const r = n ? n.children : void 0,
    o = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td",
    s = n && n.type === "table" ? n.align : void 0,
    a = s ? s.length : t.children.length;
  let u = -1;
  const c = [];
  for (; ++u < a;) {
    const f = t.children[u],
      h = {},
      p = s ? s[u] : void 0;
    p && (h.align = p);
    let v = { type: "element", tagName: o, properties: h, children: [] };
    (f && ((v.children = e.all(f)), e.patch(f, v), (v = e.applyData(f, v))),
      c.push(v));
  }
  const d = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(c, !0),
  };
  return (e.patch(t, d), e.applyData(t, d));
}
function Y4(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    properties: {},
    children: e.all(t),
  };
  return (e.patch(t, n), e.applyData(t, n));
}
const Ig = 9,
  Og = 32;
function X4(e) {
  const t = String(e),
    n = /\r?\n|\r/g;
  let r = n.exec(t),
    i = 0;
  const o = [];
  for (; r;)
    (o.push(Dg(t.slice(i, r.index), i > 0, !0), r[0]),
      (i = r.index + r[0].length),
      (r = n.exec(t)));
  return (o.push(Dg(t.slice(i), i > 0, !1)), o.join(""));
}
function Dg(e, t, n) {
  let r = 0,
    i = e.length;
  if (t) {
    let o = e.codePointAt(r);
    for (; o === Ig || o === Og;) (r++, (o = e.codePointAt(r)));
  }
  if (n) {
    let o = e.codePointAt(i - 1);
    for (; o === Ig || o === Og;) (i--, (o = e.codePointAt(i - 1)));
  }
  return i > r ? e.slice(r, i) : "";
}
function Z4(e, t) {
  const n = { type: "text", value: X4(String(t.value)) };
  return (e.patch(t, n), e.applyData(t, n));
}
function J4(e, t) {
  const n = { type: "element", tagName: "hr", properties: {}, children: [] };
  return (e.patch(t, n), e.applyData(t, n));
}
const e3 = {
  blockquote: _4,
  break: R4,
  code: M4,
  delete: T4,
  emphasis: A4,
  footnoteReference: I4,
  heading: O4,
  html: D4,
  imageReference: L4,
  image: z4,
  inlineCode: F4,
  linkReference: B4,
  link: $4,
  listItem: U4,
  list: V4,
  paragraph: H4,
  root: q4,
  strong: Q4,
  table: K4,
  tableCell: Y4,
  tableRow: G4,
  text: Z4,
  thematicBreak: J4,
  toml: Ba,
  yaml: Ba,
  definition: Ba,
  footnoteDefinition: Ba,
};
function Ba() {}
const $w = -1,
  Nu = 0,
  bs = 1,
  Vl = 2,
  eh = 3,
  th = 4,
  nh = 5,
  rh = 6,
  Uw = 7,
  Ww = 8,
  { defineProperty: t3 } = Object,
  Vw = typeof self == "object" ? self : globalThis,
  Lg = (e, t) => {
    switch (e) {
      case "Function":
      case "SharedWorker":
      case "Worker":
      case "eval":
      case "setInterval":
      case "setTimeout":
        throw new TypeError("unable to deserialize " + e);
    }
    return new Vw[e](t);
  },
  n3 = (e, t) => {
    const n = (i, o) => (e.set(o, i), i),
      r = (i) => {
        if (e.has(i)) return e.get(i);
        const [o, s] = t[i];
        switch (o) {
          case Nu:
          case $w:
            return n(s, i);
          case bs: {
            const a = n([], i);
            for (const u of s) a.push(r(u));
            return a;
          }
          case Vl: {
            const a = n({}, i);
            for (const [u, c] of s) {
              const d = r(u),
                f = r(c);
              d === "__proto__"
                ? t3(a, d, {
                    value: f,
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                  })
                : (a[d] = f);
            }
            return a;
          }
          case eh:
            return n(new Date(s), i);
          case th: {
            const { source: a, flags: u } = s;
            return n(new RegExp(a, u), i);
          }
          case nh: {
            const a = n(new Map(), i);
            for (const [u, c] of s) a.set(r(u), r(c));
            return a;
          }
          case rh: {
            const a = n(new Set(), i);
            for (const u of s) a.add(r(u));
            return a;
          }
          case Uw: {
            const { name: a, message: u } = s;
            return n(typeof Vw[a] == "function" ? Lg(a, u) : new Error(u), i);
          }
          case Ww:
            return n(BigInt(s), i);
          case "BigInt":
            return n(Object(BigInt(s)), i);
          case "ArrayBuffer":
            return n(new Uint8Array(s).buffer, s);
          case "DataView": {
            const { buffer: a } = new Uint8Array(s);
            return n(new DataView(a), s);
          }
          case "-0":
            return -0;
        }
        return n(Lg(o, s), i);
      };
    return r;
  },
  zg = (e) => n3(new Map(), e)(0),
  ei = "",
  { toString: r3 } = {},
  { keys: i3, is: o3 } = Object,
  rs = (e) => {
    const t = typeof e;
    if (t !== "object" || !e) return [Nu, t];
    const n = r3.call(e).slice(8, -1);
    switch (n) {
      case "Array":
        return [bs, ei];
      case "Object":
        return [Vl, ei];
      case "Date":
        return [eh, ei];
      case "RegExp":
        return [th, ei];
      case "Map":
        return [nh, ei];
      case "Set":
        return [rh, ei];
      case "DataView":
        return [bs, n];
    }
    return n.includes("Array")
      ? [bs, n]
      : e instanceof Error
        ? [Uw, e.name || "Error"]
        : [Vl, n];
  },
  $a = ([e, t]) => e === Nu && (t === "function" || t === "symbol"),
  s3 = (e, t, n, r) => {
    const i = (s, a) => {
        const u = r.push(s) - 1;
        return (n.set(a, u), u);
      },
      o = (s) => {
        if (n.has(s)) return n.get(s);
        let [a, u] = rs(s);
        switch (a) {
          case Nu: {
            let d = s;
            switch (u) {
              case "bigint":
                ((a = Ww), (d = s.toString()));
                break;
              case "number":
                if (!s && o3(s, -0)) return r.push(["-0"]) - 1;
                break;
              case "function":
              case "symbol":
                if (e) throw new TypeError("unable to serialize " + u);
                d = null;
                break;
              case "undefined":
                return i([$w], s);
            }
            return i([a, d], s);
          }
          case bs: {
            if (u) {
              let h = s;
              return (
                u === "DataView"
                  ? (h = new Uint8Array(s.buffer))
                  : u === "ArrayBuffer" && (h = new Uint8Array(s)),
                i([u, [...h]], s)
              );
            }
            const d = [],
              f = i([a, d], s);
            for (const h of s) d.push(o(h));
            return f;
          }
          case Vl: {
            if (u)
              switch (u) {
                case "BigInt":
                  return i([u, s.toString()], s);
                case "Boolean":
                case "Number":
                case "String":
                  return i([u, s.valueOf()], s);
              }
            if (t && "toJSON" in s) return o(s.toJSON());
            const d = [],
              f = i([a, d], s);
            for (const h of i3(s))
              (e || !$a(rs(s[h]))) && d.push([o(h), o(s[h])]);
            return f;
          }
          case eh:
            return i([a, isNaN(s.getTime()) ? ei : s.toISOString()], s);
          case th: {
            const { source: d, flags: f } = s;
            return i([a, { source: d, flags: f }], s);
          }
          case nh: {
            const d = [],
              f = i([a, d], s);
            for (const [h, p] of s)
              (e || !($a(rs(h)) || $a(rs(p)))) && d.push([o(h), o(p)]);
            return f;
          }
          case rh: {
            const d = [],
              f = i([a, d], s);
            for (const h of s) (e || !$a(rs(h))) && d.push(o(h));
            return f;
          }
        }
        const { message: c } = s;
        return i([a, { name: u, message: c }], s);
      };
    return o;
  },
  Fg = (e, { json: t, lossy: n } = {}) => {
    const r = [];
    return (s3(!(t || n), !!t, new Map(), r)(e), r);
  },
  Hl =
    typeof structuredClone == "function"
      ? (e, t) =>
          t && ("json" in t || "lossy" in t) ? zg(Fg(e, t)) : structuredClone(e)
      : (e, t) => zg(Fg(e, t));
function a3(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return (
    t > 1 &&
      n.push({
        type: "element",
        tagName: "sup",
        properties: {},
        children: [{ type: "text", value: String(t) }],
      }),
    n
  );
}
function l3(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function u3(e) {
  const t =
      typeof e.options.clobberPrefix == "string"
        ? e.options.clobberPrefix
        : "user-content-",
    n = e.options.footnoteBackContent || a3,
    r = e.options.footnoteBackLabel || l3,
    i = e.options.footnoteLabel || "Footnotes",
    o = e.options.footnoteLabelTagName || "h2",
    s = e.options.footnoteLabelProperties || { className: ["sr-only"] },
    a = [];
  let u = -1;
  for (; ++u < e.footnoteOrder.length;) {
    const c = e.footnoteById.get(e.footnoteOrder[u]);
    if (!c) continue;
    const d = e.all(c),
      f = String(c.identifier).toUpperCase(),
      h = Vo(f.toLowerCase());
    let p = 0;
    const v = [],
      g = e.footnoteCounts.get(f);
    for (; g !== void 0 && ++p <= g;) {
      v.length > 0 && v.push({ type: "text", value: " " });
      let x = typeof n == "string" ? n : n(u, p);
      (typeof x == "string" && (x = { type: "text", value: x }),
        v.push({
          type: "element",
          tagName: "a",
          properties: {
            href: "#" + t + "fnref-" + h + (p > 1 ? "-" + p : ""),
            dataFootnoteBackref: "",
            ariaLabel: typeof r == "string" ? r : r(u, p),
            className: ["data-footnote-backref"],
          },
          children: Array.isArray(x) ? x : [x],
        }));
    }
    const b = d[d.length - 1];
    if (b && b.type === "element" && b.tagName === "p") {
      const x = b.children[b.children.length - 1];
      (x && x.type === "text"
        ? (x.value += " ")
        : b.children.push({ type: "text", value: " " }),
        b.children.push(...v));
    } else d.push(...v);
    const m = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + h },
      children: e.wrap(d, !0),
    };
    (e.patch(c, m), a.push(m));
  }
  if (a.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: o,
          properties: { ...Hl(s), id: "footnote-label" },
          children: [{ type: "text", value: i }],
        },
        {
          type: "text",
          value: `
`,
        },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: e.wrap(a, !0),
        },
        {
          type: "text",
          value: `
`,
        },
      ],
    };
}
const Hw = function (e) {
  if (e == null) return p3;
  if (typeof e == "function") return Eu(e);
  if (typeof e == "object") return Array.isArray(e) ? c3(e) : d3(e);
  if (typeof e == "string") return f3(e);
  throw new Error("Expected function, string, or object as test");
};
function c3(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length;) t[n] = Hw(e[n]);
  return Eu(r);
  function r(...i) {
    let o = -1;
    for (; ++o < t.length;) if (t[o].apply(this, i)) return !0;
    return !1;
  }
}
function d3(e) {
  const t = e;
  return Eu(n);
  function n(r) {
    const i = r;
    let o;
    for (o in e) if (i[o] !== t[o]) return !1;
    return !0;
  }
}
function f3(e) {
  return Eu(t);
  function t(n) {
    return n && n.type === e;
  }
}
function Eu(e) {
  return t;
  function t(n, r, i) {
    return !!(
      h3(n) && e.call(this, n, typeof r == "number" ? r : void 0, i || void 0)
    );
  }
}
function p3() {
  return !0;
}
function h3(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const qw = [],
  m3 = !0,
  Cc = !1,
  Bg = "skip";
function $g(e, t, n, r) {
  if (!e || typeof e != "object")
    throw new Error("Unexpected value `" + e + "` for `tree`, expected node");
  let i = !0,
    o,
    s,
    a,
    u;
  if (
    (typeof n == "function" || (n && typeof n == "object")
      ? ((o = t), (s = n), r && (i = !1))
      : ((s = t), n && (i = !1)),
    typeof s == "function")
  )
    a = s;
  else if (s && typeof s == "object") {
    if (!(s.enter === null || s.enter === void 0))
      if (typeof s.enter == "function") a = s.enter;
      else
        throw new Error(
          "Unexpected value `" +
            s.enter +
            "` for `visitors.enter`, expected optional visitor",
        );
    if (typeof s.exit == "function") u = s.exit;
    else
      throw new Error(
        "Unexpected value `" +
          s.exit +
          "` for `visitors.exit`, expected visitor (pass a visitor directly if you only want an enter visitor)",
      );
  } else
    throw new Error(
      "Unexpected value `" +
        s +
        "` for `enter` or `visitors`, expected visitor or object with visitors",
    );
  const c = Hw(o),
    d = i ? 1 : -1;
  f(e, void 0, [])();
  function f(h, p, v) {
    const g = h && typeof h == "object" ? h : {};
    if (typeof g.type == "string") {
      const m =
        typeof g.tagName == "string"
          ? g.tagName
          : typeof g.name == "string"
            ? g.name
            : void 0;
      Object.defineProperty(b, "name", {
        value: "node (" + (h.type + (m ? "<" + m + ">" : "")) + ")",
      });
    }
    return b;
    function b() {
      const m = !o || c(h, p, v[v.length - 1] || void 0);
      let x = qw;
      if (a && m && ((x = Ug(a(h, v, p))), x[0] === Cc)) return x;
      if ("children" in h && h.children) {
        const y = h;
        if (y.children && x[0] !== Bg) {
          let k = (i ? -1 : y.children.length) + d;
          const N = [...v, y];
          for (; k > -1 && k < y.children.length;) {
            const C = y.children[k],
              j = f(C, k, N)();
            if (j[0] === Cc) return j;
            k = typeof j[1] == "number" ? j[1] : k + d;
          }
        }
      }
      if (u && m) {
        const y = Ug(u(h, v, p));
        if (y[0] === Bg)
          throw new Error(
            "Unexpected value `" +
              y[0] +
              "` from `exit`, expected `CONTINUE`, `EXIT`, index, or nothing",
          );
        if (y[0] === Cc || typeof y[1] == "number") return y;
      }
      return x;
    }
  }
}
function Ug(e) {
  return Array.isArray(e)
    ? e
    : typeof e == "number"
      ? [m3, e]
      : e == null
        ? qw
        : [e];
}
function Qw(e, t, n, r) {
  let i, o, s;
  ((o = t),
    (s = n),
    typeof o == "function" ? $g(e, i, cf(o), s) : $g(e, i, g3(o), s));
}
function g3(e) {
  return !e || typeof e != "object"
    ? e
    : {
        enter: typeof e.enter == "function" ? cf(e.enter) : e.enter,
        exit: typeof e.exit == "function" ? cf(e.exit) : e.exit,
      };
}
function cf(e) {
  return t;
  function t(n, r, i) {
    return e(n, i, r[r.length - 1]);
  }
}
const df = {}.hasOwnProperty,
  y3 = {};
function x3(e, t) {
  const n = t || y3,
    r = new Map(),
    i = new Map(),
    o = new Map(),
    s = { ...e3, ...n.handlers },
    a = {
      all: c,
      applyData: w3,
      definitionById: r,
      footnoteById: i,
      footnoteCounts: o,
      footnoteOrder: [],
      handlers: s,
      one: u,
      options: n,
      patch: v3,
      wrap: k3,
    };
  return (
    Qw(e, function (d) {
      if (d.type === "definition" || d.type === "footnoteDefinition") {
        const f = d.type === "definition" ? r : i,
          h = String(d.identifier).toUpperCase();
        f.has(h) || f.set(h, d);
      }
    }),
    a
  );
  function u(d, f) {
    const h = d.type,
      p = a.handlers[h];
    if (df.call(a.handlers, h) && p) return p(a, d, f);
    if (a.options.passThrough && a.options.passThrough.includes(h)) {
      if ("children" in d) {
        const { children: g, ...b } = d,
          m = Hl(b);
        return ((m.children = a.all(d)), m);
      }
      return Hl(d);
    }
    return (a.options.unknownHandler || b3)(a, d, f);
  }
  function c(d) {
    const f = [];
    if ("children" in d) {
      const h = d.children;
      let p = -1;
      for (; ++p < h.length;) {
        const v = a.one(h[p], d);
        if (v) {
          if (
            p &&
            h[p - 1].type === "break" &&
            (!Array.isArray(v) && v.type === "text" && (v.value = Wg(v.value)),
            !Array.isArray(v) && v.type === "element")
          ) {
            const g = v.children[0];
            g && g.type === "text" && (g.value = Wg(g.value));
          }
          Array.isArray(v) ? f.push(...v) : f.push(v);
        }
      }
    }
    return f;
  }
}
function v3(e, t) {
  e.position && (t.position = nM(e));
}
function w3(e, t) {
  let n = t;
  if (e && e.data) {
    const r = e.data.hName,
      i = e.data.hChildren,
      o = e.data.hProperties;
    if (typeof r == "string")
      if (n.type === "element") n.tagName = r;
      else {
        const s = "children" in n ? n.children : [n];
        n = { type: "element", tagName: r, properties: {}, children: s };
      }
    (n.type === "element" && o && Object.assign(n.properties, Hl(o)),
      "children" in n &&
        n.children &&
        i !== null &&
        i !== void 0 &&
        (n.children = i));
  }
  return n;
}
function b3(e, t) {
  const n = t.data || {},
    r =
      "value" in t && !(df.call(n, "hProperties") || df.call(n, "hChildren"))
        ? { type: "text", value: t.value }
        : {
            type: "element",
            tagName: "div",
            properties: {},
            children: e.all(t),
          };
  return (e.patch(t, r), e.applyData(t, r));
}
function k3(e, t) {
  const n = [];
  let r = -1;
  for (
    t &&
    n.push({
      type: "text",
      value: `
`,
    });
    ++r < e.length;
  )
    (r &&
      n.push({
        type: "text",
        value: `
`,
      }),
      n.push(e[r]));
  return (
    t &&
      e.length > 0 &&
      n.push({
        type: "text",
        value: `
`,
      }),
    n
  );
}
function Wg(e) {
  let t = 0,
    n = e.charCodeAt(t);
  for (; n === 9 || n === 32;) (t++, (n = e.charCodeAt(t)));
  return e.slice(t);
}
function Vg(e, t) {
  const n = x3(e, t),
    r = n.one(e, void 0),
    i = u3(n),
    o = Array.isArray(r)
      ? { type: "root", children: r }
      : r || { type: "root", children: [] };
  return (
    i &&
      o.children.push(
        {
          type: "text",
          value: `
`,
        },
        i,
      ),
    o
  );
}
function S3(e, t) {
  return e && "run" in e
    ? async function (n, r) {
        const i = Vg(n, { file: r, ...t });
        await e.run(i, r);
      }
    : function (n, r) {
        return Vg(n, { file: r, ...(e || t) });
      };
}
function Hg(e) {
  if (e) throw e;
}
var sl = Object.prototype.hasOwnProperty,
  Kw = Object.prototype.toString,
  qg = Object.defineProperty,
  Qg = Object.getOwnPropertyDescriptor,
  Kg = function (t) {
    return typeof Array.isArray == "function"
      ? Array.isArray(t)
      : Kw.call(t) === "[object Array]";
  },
  Gg = function (t) {
    if (!t || Kw.call(t) !== "[object Object]") return !1;
    var n = sl.call(t, "constructor"),
      r =
        t.constructor &&
        t.constructor.prototype &&
        sl.call(t.constructor.prototype, "isPrototypeOf");
    if (t.constructor && !n && !r) return !1;
    var i;
    for (i in t);
    return typeof i > "u" || sl.call(t, i);
  },
  Yg = function (t, n) {
    qg && n.name === "__proto__"
      ? qg(t, n.name, {
          enumerable: !0,
          configurable: !0,
          value: n.newValue,
          writable: !0,
        })
      : (t[n.name] = n.newValue);
  },
  Xg = function (t, n) {
    if (n === "__proto__")
      if (sl.call(t, n)) {
        if (Qg) return Qg(t, n).value;
      } else return;
    return t[n];
  },
  C3 = function e() {
    var t,
      n,
      r,
      i,
      o,
      s,
      a = arguments[0],
      u = 1,
      c = arguments.length,
      d = !1;
    for (
      typeof a == "boolean" && ((d = a), (a = arguments[1] || {}), (u = 2)),
        (a == null || (typeof a != "object" && typeof a != "function")) &&
          (a = {});
      u < c;
      ++u
    )
      if (((t = arguments[u]), t != null))
        for (n in t)
          ((r = Xg(a, n)),
            (i = Xg(t, n)),
            a !== i &&
              (d && i && (Gg(i) || (o = Kg(i)))
                ? (o
                    ? ((o = !1), (s = r && Kg(r) ? r : []))
                    : (s = r && Gg(r) ? r : {}),
                  Yg(a, { name: n, newValue: e(d, s, i) }))
                : typeof i < "u" && Yg(a, { name: n, newValue: i })));
    return a;
  };
const Nc = gf(C3);
function ff(e) {
  if (typeof e != "object" || e === null) return !1;
  const t = Object.getPrototypeOf(e);
  return (
    (t === null ||
      t === Object.prototype ||
      Object.getPrototypeOf(t) === null) &&
    !(Symbol.toStringTag in e) &&
    !(Symbol.iterator in e)
  );
}
function N3() {
  const e = [],
    t = { run: n, use: r };
  return t;
  function n(...i) {
    let o = -1;
    const s = i.pop();
    if (typeof s != "function")
      throw new TypeError("Expected function as last argument, not " + s);
    a(null, ...i);
    function a(u, ...c) {
      const d = e[++o];
      let f = -1;
      if (u) {
        s(u);
        return;
      }
      for (; ++f < i.length;)
        (c[f] === null || c[f] === void 0) && (c[f] = i[f]);
      ((i = c), d ? E3(d, a)(...c) : s(null, ...c));
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError("Expected `middelware` to be a function, not " + i);
    return (e.push(i), t);
  }
}
function E3(e, t) {
  let n;
  return r;
  function r(...s) {
    const a = e.length > s.length;
    let u;
    a && s.push(i);
    try {
      u = e.apply(this, s);
    } catch (c) {
      const d = c;
      if (a && n) throw d;
      return i(d);
    }
    a ||
      (u && u.then && typeof u.then == "function"
        ? u.then(o, i)
        : u instanceof Error
          ? i(u)
          : o(u));
  }
  function i(s, ...a) {
    n || ((n = !0), t(s, ...a));
  }
  function o(s) {
    i(null, s);
  }
}
const vn = { basename: j3, dirname: P3, extname: _3, join: R3, sep: "/" };
function j3(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  da(e);
  let n = 0,
    r = -1,
    i = e.length,
    o;
  if (t === void 0 || t.length === 0 || t.length > e.length) {
    for (; i--;)
      if (e.codePointAt(i) === 47) {
        if (o) {
          n = i + 1;
          break;
        }
      } else r < 0 && ((o = !0), (r = i + 1));
    return r < 0 ? "" : e.slice(n, r);
  }
  if (t === e) return "";
  let s = -1,
    a = t.length - 1;
  for (; i--;)
    if (e.codePointAt(i) === 47) {
      if (o) {
        n = i + 1;
        break;
      }
    } else
      (s < 0 && ((o = !0), (s = i + 1)),
        a > -1 &&
          (e.codePointAt(i) === t.codePointAt(a--)
            ? a < 0 && (r = i)
            : ((a = -1), (r = s))));
  return (n === r ? (r = s) : r < 0 && (r = e.length), e.slice(n, r));
}
function P3(e) {
  if ((da(e), e.length === 0)) return ".";
  let t = -1,
    n = e.length,
    r;
  for (; --n;)
    if (e.codePointAt(n) === 47) {
      if (r) {
        t = n;
        break;
      }
    } else r || (r = !0);
  return t < 0
    ? e.codePointAt(0) === 47
      ? "/"
      : "."
    : t === 1 && e.codePointAt(0) === 47
      ? "//"
      : e.slice(0, t);
}
function _3(e) {
  da(e);
  let t = e.length,
    n = -1,
    r = 0,
    i = -1,
    o = 0,
    s;
  for (; t--;) {
    const a = e.codePointAt(t);
    if (a === 47) {
      if (s) {
        r = t + 1;
        break;
      }
      continue;
    }
    (n < 0 && ((s = !0), (n = t + 1)),
      a === 46 ? (i < 0 ? (i = t) : o !== 1 && (o = 1)) : i > -1 && (o = -1));
  }
  return i < 0 || n < 0 || o === 0 || (o === 1 && i === n - 1 && i === r + 1)
    ? ""
    : e.slice(i, n);
}
function R3(...e) {
  let t = -1,
    n;
  for (; ++t < e.length;)
    (da(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]));
  return n === void 0 ? "." : M3(n);
}
function M3(e) {
  da(e);
  const t = e.codePointAt(0) === 47;
  let n = T3(e, !t);
  return (
    n.length === 0 && !t && (n = "."),
    n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"),
    t ? "/" + n : n
  );
}
function T3(e, t) {
  let n = "",
    r = 0,
    i = -1,
    o = 0,
    s = -1,
    a,
    u;
  for (; ++s <= e.length;) {
    if (s < e.length) a = e.codePointAt(s);
    else {
      if (a === 47) break;
      a = 47;
    }
    if (a === 47) {
      if (!(i === s - 1 || o === 1))
        if (i !== s - 1 && o === 2) {
          if (
            n.length < 2 ||
            r !== 2 ||
            n.codePointAt(n.length - 1) !== 46 ||
            n.codePointAt(n.length - 2) !== 46
          ) {
            if (n.length > 2) {
              if (((u = n.lastIndexOf("/")), u !== n.length - 1)) {
                (u < 0
                  ? ((n = ""), (r = 0))
                  : ((n = n.slice(0, u)),
                    (r = n.length - 1 - n.lastIndexOf("/"))),
                  (i = s),
                  (o = 0));
                continue;
              }
            } else if (n.length > 0) {
              ((n = ""), (r = 0), (i = s), (o = 0));
              continue;
            }
          }
          t && ((n = n.length > 0 ? n + "/.." : ".."), (r = 2));
        } else
          (n.length > 0
            ? (n += "/" + e.slice(i + 1, s))
            : (n = e.slice(i + 1, s)),
            (r = s - i - 1));
      ((i = s), (o = 0));
    } else a === 46 && o > -1 ? o++ : (o = -1);
  }
  return n;
}
function da(e) {
  if (typeof e != "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(e));
}
const A3 = { cwd: I3 };
function I3() {
  return "/";
}
function pf(e) {
  return !!(
    e !== null &&
    typeof e == "object" &&
    "href" in e &&
    e.href &&
    "protocol" in e &&
    e.protocol &&
    e.auth === void 0
  );
}
function O3(e) {
  if (typeof e == "string") e = new URL(e);
  else if (!pf(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' +
        e +
        "`",
    );
    throw ((t.code = "ERR_INVALID_ARG_TYPE"), t);
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw ((t.code = "ERR_INVALID_URL_SCHEME"), t);
  }
  return D3(e);
}
function D3(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin',
    );
    throw ((r.code = "ERR_INVALID_FILE_URL_HOST"), r);
  }
  const t = e.pathname;
  let n = -1;
  for (; ++n < t.length;)
    if (t.codePointAt(n) === 37 && t.codePointAt(n + 1) === 50) {
      const r = t.codePointAt(n + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters",
        );
        throw ((i.code = "ERR_INVALID_FILE_URL_PATH"), i);
      }
    }
  return decodeURIComponent(t);
}
const Ec = ["history", "path", "basename", "stem", "extname", "dirname"];
class Gw {
  constructor(t) {
    let n;
    (t
      ? pf(t)
        ? (n = { path: t })
        : typeof t == "string" || L3(t)
          ? (n = { value: t })
          : (n = t)
      : (n = {}),
      (this.cwd = "cwd" in n ? "" : A3.cwd()),
      (this.data = {}),
      (this.history = []),
      (this.messages = []),
      this.value,
      this.map,
      this.result,
      this.stored);
    let r = -1;
    for (; ++r < Ec.length;) {
      const o = Ec[r];
      o in n &&
        n[o] !== void 0 &&
        n[o] !== null &&
        (this[o] = o === "history" ? [...n[o]] : n[o]);
    }
    let i;
    for (i in n) Ec.includes(i) || (this[i] = n[i]);
  }
  get basename() {
    return typeof this.path == "string" ? vn.basename(this.path) : void 0;
  }
  set basename(t) {
    (Pc(t, "basename"),
      jc(t, "basename"),
      (this.path = vn.join(this.dirname || "", t)));
  }
  get dirname() {
    return typeof this.path == "string" ? vn.dirname(this.path) : void 0;
  }
  set dirname(t) {
    (Zg(this.basename, "dirname"),
      (this.path = vn.join(t || "", this.basename)));
  }
  get extname() {
    return typeof this.path == "string" ? vn.extname(this.path) : void 0;
  }
  set extname(t) {
    if ((jc(t, "extname"), Zg(this.dirname, "extname"), t)) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = vn.join(this.dirname, this.stem + (t || ""));
  }
  get path() {
    return this.history[this.history.length - 1];
  }
  set path(t) {
    (pf(t) && (t = O3(t)),
      Pc(t, "path"),
      this.path !== t && this.history.push(t));
  }
  get stem() {
    return typeof this.path == "string"
      ? vn.basename(this.path, this.extname)
      : void 0;
  }
  set stem(t) {
    (Pc(t, "stem"),
      jc(t, "stem"),
      (this.path = vn.join(this.dirname || "", t + (this.extname || ""))));
  }
  fail(t, n, r) {
    const i = this.message(t, n, r);
    throw ((i.fatal = !0), i);
  }
  info(t, n, r) {
    const i = this.message(t, n, r);
    return ((i.fatal = void 0), i);
  }
  message(t, n, r) {
    const i = new Su(t, n, r);
    return (
      this.path && ((i.name = this.path + ":" + i.name), (i.file = this.path)),
      (i.fatal = !1),
      this.messages.push(i),
      i
    );
  }
  toString(t) {
    return this.value === void 0
      ? ""
      : typeof this.value == "string"
        ? this.value
        : new TextDecoder(t || void 0).decode(this.value);
  }
}
function jc(e, t) {
  if (e && e.includes(vn.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + vn.sep + "`",
    );
}
function Pc(e, t) {
  if (!e) throw new Error("`" + t + "` cannot be empty");
}
function Zg(e, t) {
  if (!e) throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function L3(e) {
  return !!(
    e &&
    typeof e == "object" &&
    "byteLength" in e &&
    "byteOffset" in e
  );
}
const z3 = function (e) {
    const r = this.constructor.prototype,
      i = r[e],
      o = function () {
        return i.apply(o, arguments);
      };
    return (Object.setPrototypeOf(o, r), o);
  },
  F3 = {}.hasOwnProperty;
class ih extends z3 {
  constructor() {
    (super("copy"),
      (this.Compiler = void 0),
      (this.Parser = void 0),
      (this.attachers = []),
      (this.compiler = void 0),
      (this.freezeIndex = -1),
      (this.frozen = void 0),
      (this.namespace = {}),
      (this.parser = void 0),
      (this.transformers = N3()));
  }
  copy() {
    const t = new ih();
    let n = -1;
    for (; ++n < this.attachers.length;) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return (t.data(Nc(!0, {}, this.namespace)), t);
  }
  data(t, n) {
    return typeof t == "string"
      ? arguments.length === 2
        ? (Mc("data", this.frozen), (this.namespace[t] = n), this)
        : (F3.call(this.namespace, t) && this.namespace[t]) || void 0
      : t
        ? (Mc("data", this.frozen), (this.namespace = t), this)
        : this.namespace;
  }
  freeze() {
    if (this.frozen) return this;
    const t = this;
    for (; ++this.freezeIndex < this.attachers.length;) {
      const [n, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1) continue;
      r[0] === !0 && (r[0] = void 0);
      const i = n.call(t, ...r);
      typeof i == "function" && this.transformers.use(i);
    }
    return (
      (this.frozen = !0),
      (this.freezeIndex = Number.POSITIVE_INFINITY),
      this
    );
  }
  parse(t) {
    this.freeze();
    const n = Ua(t),
      r = this.parser || this.Parser;
    return (_c("parse", r), r(String(n), n));
  }
  process(t, n) {
    const r = this;
    return (
      this.freeze(),
      _c("process", this.parser || this.Parser),
      Rc("process", this.compiler || this.Compiler),
      n ? i(void 0, n) : new Promise(i)
    );
    function i(o, s) {
      const a = Ua(t),
        u = r.parse(a);
      r.run(u, a, function (d, f, h) {
        if (d || !f || !h) return c(d);
        const p = f,
          v = r.stringify(p, h);
        (U3(v) ? (h.value = v) : (h.result = v), c(d, h));
      });
      function c(d, f) {
        d || !f ? s(d) : o ? o(f) : n(void 0, f);
      }
    }
  }
  processSync(t) {
    let n = !1,
      r;
    return (
      this.freeze(),
      _c("processSync", this.parser || this.Parser),
      Rc("processSync", this.compiler || this.Compiler),
      this.process(t, i),
      ey("processSync", "process", n),
      r
    );
    function i(o, s) {
      ((n = !0), Hg(o), (r = s));
    }
  }
  run(t, n, r) {
    (Jg(t), this.freeze());
    const i = this.transformers;
    return (
      !r && typeof n == "function" && ((r = n), (n = void 0)),
      r ? o(void 0, r) : new Promise(o)
    );
    function o(s, a) {
      const u = Ua(n);
      i.run(t, u, c);
      function c(d, f, h) {
        const p = f || t;
        d ? a(d) : s ? s(p) : r(void 0, p, h);
      }
    }
  }
  runSync(t, n) {
    let r = !1,
      i;
    return (this.run(t, n, o), ey("runSync", "run", r), i);
    function o(s, a) {
      (Hg(s), (i = a), (r = !0));
    }
  }
  stringify(t, n) {
    this.freeze();
    const r = Ua(n),
      i = this.compiler || this.Compiler;
    return (Rc("stringify", i), Jg(t), i(t, r));
  }
  use(t, ...n) {
    const r = this.attachers,
      i = this.namespace;
    if ((Mc("use", this.frozen), t != null))
      if (typeof t == "function") u(t, n);
      else if (typeof t == "object") Array.isArray(t) ? a(t) : s(t);
      else throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function o(c) {
      if (typeof c == "function") u(c, []);
      else if (typeof c == "object")
        if (Array.isArray(c)) {
          const [d, ...f] = c;
          u(d, f);
        } else s(c);
      else throw new TypeError("Expected usable value, not `" + c + "`");
    }
    function s(c) {
      if (!("plugins" in c) && !("settings" in c))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither",
        );
      (a(c.plugins),
        c.settings && (i.settings = Nc(!0, i.settings, c.settings)));
    }
    function a(c) {
      let d = -1;
      if (c != null)
        if (Array.isArray(c))
          for (; ++d < c.length;) {
            const f = c[d];
            o(f);
          }
        else throw new TypeError("Expected a list of plugins, not `" + c + "`");
    }
    function u(c, d) {
      let f = -1,
        h = -1;
      for (; ++f < r.length;)
        if (r[f][0] === c) {
          h = f;
          break;
        }
      if (h === -1) r.push([c, ...d]);
      else if (d.length > 0) {
        let [p, ...v] = d;
        const g = r[h][1];
        (ff(g) && ff(p) && (p = Nc(!0, g, p)), (r[h] = [c, p, ...v]));
      }
    }
  }
}
const B3 = new ih().freeze();
function _c(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Rc(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Mc(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" +
        e +
        "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.",
    );
}
function Jg(e) {
  if (!ff(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function ey(e, t, n) {
  if (!n)
    throw new Error("`" + e + "` finished async. Use `" + t + "` instead");
}
function Ua(e) {
  return $3(e) ? e : new Gw(e);
}
function $3(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function U3(e) {
  return typeof e == "string" || W3(e);
}
function W3(e) {
  return !!(
    e &&
    typeof e == "object" &&
    "byteLength" in e &&
    "byteOffset" in e
  );
}
const V3 = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md",
  ty = [],
  ny = { allowDangerousHtml: !0 },
  H3 = /^(https?|ircs?|mailto|xmpp)$/i,
  q3 = [
    { from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" },
    { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" },
    {
      from: "allowNode",
      id: "replace-allownode-allowedtypes-and-disallowedtypes",
      to: "allowElement",
    },
    {
      from: "allowedTypes",
      id: "replace-allownode-allowedtypes-and-disallowedtypes",
      to: "allowedElements",
    },
    {
      from: "disallowedTypes",
      id: "replace-allownode-allowedtypes-and-disallowedtypes",
      to: "disallowedElements",
    },
    { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" },
    { from: "includeElementIndex", id: "#remove-includeelementindex" },
    {
      from: "includeNodeIndex",
      id: "change-includenodeindex-to-includeelementindex",
    },
    { from: "linkTarget", id: "remove-linktarget" },
    {
      from: "plugins",
      id: "change-plugins-to-remarkplugins",
      to: "remarkPlugins",
    },
    { from: "rawSourcePos", id: "#remove-rawsourcepos" },
    {
      from: "renderers",
      id: "change-renderers-to-components",
      to: "components",
    },
    { from: "source", id: "change-source-to-children", to: "children" },
    { from: "sourcePos", id: "#remove-sourcepos" },
    { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" },
    { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" },
  ];
function Yw(e) {
  const t = e.allowedElements,
    n = e.allowElement,
    r = e.children || "",
    i = e.className,
    o = e.components,
    s = e.disallowedElements,
    a = e.rehypePlugins || ty,
    u = e.remarkPlugins || ty,
    c = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...ny } : ny,
    d = e.skipHtml,
    f = e.unwrapDisallowed,
    h = e.urlTransform || Q3,
    p = B3().use(P4).use(u).use(S3, c).use(a),
    v = new Gw();
  typeof r == "string" && (v.value = r);
  for (const x of q3)
    Object.hasOwn(e, x.from) &&
      ("" +
        x.from +
        (x.to ? "use `" + x.to + "` instead" : "remove it") +
        V3 +
        x.id,
      void 0);
  const g = p.parse(v);
  let b = p.runSync(g, v);
  return (
    i &&
      (b = {
        type: "element",
        tagName: "div",
        properties: { className: i },
        children: b.type === "root" ? b.children : [b],
      }),
    Qw(b, m),
    lM(b, {
      Fragment: l.Fragment,
      components: o,
      ignoreInvalidStyle: !0,
      jsx: l.jsx,
      jsxs: l.jsxs,
      passKeys: !0,
      passNode: !0,
    })
  );
  function m(x, y, k) {
    if (x.type === "raw" && k && typeof y == "number")
      return (
        d
          ? k.children.splice(y, 1)
          : (k.children[y] = { type: "text", value: x.value }),
        y
      );
    if (x.type === "element") {
      let N;
      for (N in bc)
        if (Object.hasOwn(bc, N) && Object.hasOwn(x.properties, N)) {
          const C = x.properties[N],
            j = bc[N];
          (j === null || j.includes(x.tagName)) &&
            (x.properties[N] = h(String(C || ""), N, x));
        }
    }
    if (x.type === "element") {
      let N = t ? !t.includes(x.tagName) : s ? s.includes(x.tagName) : !1;
      if (
        (!N && n && typeof y == "number" && (N = !n(x, y, k)),
        N && k && typeof y == "number")
      )
        return (
          f && x.children
            ? k.children.splice(y, 1, ...x.children)
            : k.children.splice(y, 1),
          y
        );
    }
  }
}
function Q3(e) {
  const t = e.indexOf(":"),
    n = e.indexOf("?"),
    r = e.indexOf("#"),
    i = e.indexOf("/");
  return t < 0 ||
    (i > -1 && t > i) ||
    (n > -1 && t > n) ||
    (r > -1 && t > r) ||
    H3.test(e.slice(0, t))
    ? e
    : "";
}
const hf = {
    income: { label: "Income", icon: ZP, hue: "#1F8A63" },
    housing: { label: "Rent & housing", icon: R1, hue: "#5B6CD6" },
    utilities: { label: "Utilities & phone", icon: T_, hue: "#3F8FC4" },
    insurance: { label: "Insurance", icon: D1, hue: "#6A7F92" },
    debt_payment: { label: "Loans & cards", icon: u_, hue: "#8A5BC4" },
    education: { label: "Education", icon: h_, hue: "#2F9EA3" },
    groceries: { label: "Groceries", icon: j_, hue: "#4E9A3A" },
    dining: { label: "Dining & coffee", icon: l_, hue: "#D27A2C" },
    transport: { label: "Gas & transport", icon: f_, hue: "#C5543F" },
    shopping: { label: "Shopping", icon: E_, hue: "#C9468B" },
    entertainment: { label: "Entertainment", icon: __, hue: "#9B59D0" },
    subscriptions: { label: "Subscriptions", icon: w_, hue: "#D0A12A" },
    health: { label: "Health & fitness", icon: m_, hue: "#D2484F" },
    personal: { label: "Personal care", icon: k_, hue: "#B26B9E" },
    fees: { label: "Bank fees", icon: M1, hue: "#7D8590" },
    transfer: { label: "Transfers", icon: YP, hue: "#7D8590" },
    other: { label: "Other", icon: o_, hue: "#8C9A92" },
  },
  bt = (e) => hf[e] ?? hf.other;
function Ys({ id: e, size: t = 18, className: n = "" }) {
  const r = bt(e),
    i = r.icon;
  return l.jsx("span", {
    className: `inline-flex shrink-0 items-center justify-center rounded-xl ${n}`,
    style: {
      background: `${r.hue}1f`,
      color: r.hue,
      width: t + 16,
      height: t + 16,
    },
    "aria-hidden": !0,
    children: l.jsx(i, { size: t, strokeWidth: 2.1 }),
  });
}
function Cr({ title: e, aside: t, children: n, className: r = "" }) {
  return l.jsxs("section", {
    className: ke("panel p-5 sm:p-6", r),
    children: [
      l.jsxs("div", {
        className:
          "mb-4 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3",
        children: [
          l.jsx("h2", { className: "text-[1.15rem] font-bold", children: e }),
          t &&
            l.jsx("div", {
              className: "text-[0.85rem] text-muted",
              children: t,
            }),
        ],
      }),
      n,
    ],
  });
}
function ks({ className: e = "" }) {
  return l.jsx("div", {
    className: ke("animate-pulse rounded-xl bg-sunken", e),
  });
}
const ry = {
    monthly: "monthly",
    weekly: "every week",
    biweekly: "every 2 weeks",
    twice_monthly: "twice a month",
    once: "once",
  },
  K3 = (e) =>
    `${e}${["th", "st", "nd", "rd"][((e % 100) - 20) % 10] || ["th", "st", "nd", "rd"][e % 100] || "th"}`;
function Xw(e) {
  if (e.kind === "income") {
    const n =
      e.low && e.high
        ? `${ie(e.low, !0)} to ${ie(e.high, !0)}`
        : e.amount
          ? `about ${ie(e.amount, !0)}`
          : "amount not set";
    return `Paid ${ry[e.every] ?? e.every}, ${n}${e.varies ? " (it changes)" : ""}${e.next_date ? `, next on ${ze(e.next_date)}` : ""}`;
  }
  const t = e.day_of_month
    ? `on the ${K3(e.day_of_month)}`
    : e.next_date
      ? `next on ${ze(e.next_date)}`
      : "";
  return `${ie(e.amount ?? 0)} ${ry[e.every] ?? e.every} ${t}`.trim();
}
function Zw({ s: e, compact: t = !1 }) {
  const n = lt(),
    [r, i] = w.useState(!1),
    o = async () => {
      (await de.undo(e.batch_id),
        i(!0),
        await n.invalidateQueries(),
        We.success("Undone. Nothing from that message is saved."));
    },
    s = new Date().toISOString().slice(0, 10);
  return l.jsxs("div", {
    className: ke(
      "rounded-2xl border bg-surface",
      r ? "border-line opacity-60" : "border-forest/35",
    ),
    children: [
      l.jsxs("div", {
        className: "flex items-center justify-between gap-3 px-4 pt-3",
        children: [
          l.jsxs("p", {
            className: "flex items-center gap-2 font-semibold",
            children: [
              l.jsx("span", {
                className: ke(
                  "grid h-6 w-6 place-items-center rounded-full",
                  r
                    ? "bg-sunken text-muted"
                    : "bg-forest text-white dark:text-canvas",
                ),
                children: r
                  ? l.jsx(ag, { size: 13 })
                  : l.jsx(Jt, { size: 14, strokeWidth: 3 }),
              }),
              r ? "Undone" : "Saved",
            ],
          }),
          !r &&
            l.jsxs("button", {
              onClick: o,
              className: "btn-ghost px-2.5 py-1 text-[0.85rem]",
              children: [l.jsx(ag, { size: 15 }), " Undo"],
            }),
        ],
      }),
      l.jsxs("ul", {
        className: ke(
          "num space-y-1.5 px-4 py-3 text-[0.92rem]",
          r && "line-through",
        ),
        children: [
          e.transactions.map((a) =>
            l.jsxs(
              "li",
              {
                className: "flex items-center gap-2.5",
                children: [
                  l.jsx(Ys, { id: a.category, size: 14 }),
                  l.jsxs("span", {
                    className: "min-w-0 flex-1 truncate",
                    children: [
                      a.description,
                      a.date !== s &&
                        l.jsxs("span", {
                          className: "text-muted",
                          children: [", ", ze(a.date)],
                        }),
                    ],
                  }),
                  a.approx &&
                    l.jsx("span", {
                      className:
                        "chip bg-marigold-soft px-2 py-0.5 text-[0.72rem] text-marigold",
                      children: "estimate",
                    }),
                  l.jsxs("span", {
                    className: ke(
                      "font-semibold",
                      a.amount > 0 && "text-forest",
                    ),
                    children: [
                      a.amount > 0 ? "+" : "−",
                      ie(Math.abs(a.amount)),
                    ],
                  }),
                ],
              },
              a.id,
            ),
          ),
          e.schedules.map((a) =>
            l.jsxs(
              "li",
              {
                className: "flex items-center gap-2.5",
                children: [
                  a.kind === "income"
                    ? l.jsx("span", {
                        className:
                          "grid h-[30px] w-[30px] place-items-center rounded-xl bg-forest-soft text-forest",
                        children: l.jsx($l, { size: 15 }),
                      })
                    : l.jsx(Ys, { id: a.category ?? "other", size: 14 }),
                  l.jsxs("span", {
                    className: "min-w-0 flex-1",
                    children: [
                      l.jsx("span", {
                        className: "font-medium",
                        children: a.kind === "income" ? "Pay schedule" : a.name,
                      }),
                      l.jsxs("span", {
                        className: "text-muted",
                        children: [": ", Xw(a)],
                      }),
                    ],
                  }),
                ],
              },
              a.id,
            ),
          ),
          e.balances.map((a, u) =>
            l.jsxs(
              "li",
              {
                className: "flex items-center gap-2.5",
                children: [
                  l.jsx("span", {
                    className:
                      "grid h-[30px] w-[30px] place-items-center rounded-xl bg-sunken text-muted",
                    children: l.jsx(M1, { size: 15 }),
                  }),
                  l.jsx("span", {
                    className: "flex-1",
                    children: "Balance right now",
                  }),
                  l.jsx("span", {
                    className: "font-semibold",
                    children: ie(a.balance),
                  }),
                ],
              },
              u,
            ),
          ),
          e.typical_weekly_spend
            ? l.jsxs("li", {
                className: "flex items-center gap-2.5",
                children: [
                  l.jsx("span", {
                    className:
                      "grid h-[30px] w-[30px] place-items-center rounded-xl bg-sunken text-muted",
                    children: l.jsx($l, { size: 15 }),
                  }),
                  l.jsx("span", {
                    className: "flex-1",
                    children: "Usual everyday spending",
                  }),
                  l.jsxs("span", {
                    className: "font-semibold",
                    children: [ie(e.typical_weekly_spend), " a week"],
                  }),
                ],
              })
            : null,
          e.goal &&
            l.jsxs("li", {
              className: "flex items-center gap-2.5",
              children: [
                l.jsx("span", {
                  className:
                    "grid h-[30px] w-[30px] place-items-center rounded-xl bg-marigold-soft text-marigold",
                  children: l.jsx(Bo, { size: 15 }),
                }),
                l.jsxs("span", {
                  className: "flex-1",
                  children: [
                    "Goal: ",
                    e.goal.name,
                    ", ",
                    ie(e.goal.target, !0),
                    " by ",
                    ze(e.goal.deadline),
                  ],
                }),
              ],
            }),
        ],
      }),
      !t &&
        !r &&
        e.has_balance &&
        l.jsxs("p", {
          className:
            "num border-t border-line px-4 py-2.5 text-[0.85rem] text-muted",
          children: [
            "Safe to spend now: ",
            l.jsxs("span", {
              className: "font-semibold text-ink",
              children: [ie(e.safe_per_day), " a day"],
            }),
            " until payday (",
            ze(e.next_payday),
            ")",
          ],
        }),
    ],
  });
}
function mf({ p: e, compact: t = !1 }) {
  const n = bt(e.focus_category);
  return l.jsxs("div", {
    className: "rounded-2xl border border-line bg-surface",
    children: [
      l.jsxs("div", {
        className: "p-5",
        children: [
          l.jsxs("p", {
            className: "text-[0.85rem] text-muted",
            children: [ze(e.week_start), " to ", ze(e.week_end)],
          }),
          l.jsx("p", {
            className: "mt-1 font-display text-[1.3rem] font-bold leading-snug",
            children: e.headline,
          }),
        ],
      }),
      l.jsxs("div", {
        className: "num grid border-y border-line sm:grid-cols-3",
        children: [
          l.jsxs("div", {
            className: "flex items-center gap-3 p-4 sm:border-r sm:border-line",
            children: [
              l.jsx("span", {
                className:
                  "grid h-10 w-10 place-items-center rounded-xl bg-forest-soft text-forest",
                children: l.jsx(t_, { size: 20 }),
              }),
              l.jsxs("div", {
                children: [
                  l.jsx("p", {
                    className: "text-[0.8rem] text-muted",
                    children: "Daily limit",
                  }),
                  l.jsx("p", {
                    className: "font-display text-[1.25rem] font-bold",
                    children: ie(e.daily_limit),
                  }),
                ],
              }),
            ],
          }),
          l.jsxs("div", {
            className:
              "flex items-center gap-3 border-t border-line p-4 sm:border-r sm:border-t-0",
            children: [
              l.jsx(Ys, { id: e.focus_category, size: 18 }),
              l.jsxs("div", {
                children: [
                  l.jsxs("p", {
                    className: "text-[0.8rem] text-muted",
                    children: [e.focus_label || n.label, " cap"],
                  }),
                  l.jsx("p", {
                    className: "font-display text-[1.25rem] font-bold",
                    children: ie(e.focus_category_cap),
                  }),
                  l.jsxs("p", {
                    className: "text-[0.75rem] text-faint",
                    children: ["usually ", ie(e.focus_weekly_average), "/week"],
                  }),
                ],
              }),
            ],
          }),
          l.jsxs("div", {
            className:
              "flex items-center gap-3 border-t border-line p-4 sm:border-t-0",
            children: [
              l.jsx("span", {
                className:
                  "grid h-10 w-10 place-items-center rounded-xl bg-marigold-soft text-marigold",
                children: l.jsx(v_, { size: 20 }),
              }),
              l.jsxs("div", {
                children: [
                  l.jsx("p", {
                    className: "text-[0.8rem] text-muted",
                    children: "Save this week",
                  }),
                  l.jsx("p", {
                    className: "font-display text-[1.25rem] font-bold",
                    children: ie(e.save_this_week),
                  }),
                  e.goal_name &&
                    l.jsxs("p", {
                      className: "text-[0.75rem] text-faint",
                      children: [
                        e.on_track_for_goal ? "on pace for" : "toward",
                        " ",
                        e.goal_name,
                      ],
                    }),
                ],
              }),
            ],
          }),
        ],
      }),
      !t &&
        l.jsxs("div", {
          className: "space-y-4 p-5",
          children: [
            l.jsxs("div", {
              children: [
                l.jsx("p", {
                  className: "mb-2 font-semibold",
                  children: "Why this plan",
                }),
                l.jsx("ul", {
                  className: "num space-y-1.5 text-[0.93rem] text-muted",
                  children: e.why.map((r, i) =>
                    l.jsxs(
                      "li",
                      {
                        className: "flex gap-2",
                        children: [
                          l.jsx(Bo, {
                            size: 15,
                            className: "mt-1 shrink-0 text-forest",
                          }),
                          r,
                        ],
                      },
                      i,
                    ),
                  ),
                }),
              ],
            }),
            l.jsxs("div", {
              className: "rounded-xl bg-sunken p-4",
              children: [
                l.jsxs("p", {
                  className: "flex items-center gap-2 font-semibold",
                  children: [
                    l.jsx(R_, { size: 16, className: "text-marigold" }),
                    " Do this today",
                  ],
                }),
                l.jsx("p", {
                  className: "num mt-1 text-[0.93rem]",
                  children: e.today_action,
                }),
              ],
            }),
          ],
        }),
      l.jsxs("div", {
        className:
          "flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line px-5 py-3 text-[0.83rem] text-muted",
        children: [
          l.jsxs("span", {
            className: "flex items-center gap-1.5 font-semibold text-ink",
            children: [
              l.jsx(P1, { size: 16, className: "text-forest" }),
              " Critic score ",
              e.critic.score,
              "/10",
            ],
          }),
          l.jsx("span", {
            children:
              e.attempts > 1
                ? "Revised once after review."
                : "Approved on the first draft.",
          }),
          e.tip_source &&
            l.jsxs("span", {
              children: [
                "Guidance: ",
                e.tip_source.replace(".md", "").replaceAll("_", " "),
              ],
            }),
        ],
      }),
    ],
  });
}
function Ss() {
  return l.jsx("span", {
    className:
      "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest text-white",
    children: l.jsx(j1, { size: 23 }),
  });
}
function G3({ history: e, onNewChat: t }) {
  return e.length
    ? l.jsxs(lw, {
        children: [
          l.jsxs(jR, {
            className: "btn-ghost px-0 text-sm",
            children: [l.jsx(g_, { size: 16 }), " View conversation history"],
          }),
          l.jsxs(uw, {
            children: [
              l.jsx(cw, {
                className: "fixed inset-0 z-50 bg-ink/35 backdrop-blur-sm",
              }),
              l.jsxs(dw, {
                className:
                  "fixed left-1/2 top-1/2 z-50 flex max-h-[82vh] w-[min(680px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl border border-line bg-surface p-5 shadow-lift sm:p-6",
                children: [
                  l.jsxs("div", {
                    className: "flex items-start justify-between gap-4",
                    children: [
                      l.jsxs("div", {
                        children: [
                          l.jsx(Jd, {
                            className: "text-xl font-bold",
                            children: "Conversation history",
                          }),
                          l.jsx(ef, {
                            className: "mt-1 text-sm text-muted",
                            children:
                              "Your financial records stay saved even if you start a new chat.",
                          }),
                        ],
                      }),
                      l.jsx(fg, {
                        className:
                          "grid h-9 w-9 place-items-center rounded-full hover:bg-sunken",
                        "aria-label": "Close history",
                        children: l.jsx($o, { size: 18 }),
                      }),
                    ],
                  }),
                  l.jsx("div", {
                    className: "mt-5 space-y-3 overflow-y-auto pr-1",
                    children: e.map((n, r) =>
                      n.role === "user"
                        ? l.jsx(
                            "div",
                            {
                              className: "flex justify-end",
                              children: l.jsx("p", {
                                className:
                                  "max-w-[85%] rounded-2xl rounded-br-md bg-forest px-3 py-2 text-sm text-white",
                                children: n.text,
                              }),
                            },
                            r,
                          )
                        : l.jsx(
                            "div",
                            {
                              className:
                                "rounded-2xl bg-sunken px-3 py-2 text-sm leading-relaxed",
                              children: l.jsx(Yw, { children: n.text }),
                            },
                            r,
                          ),
                    ),
                  }),
                  l.jsxs("div", {
                    className:
                      "mt-5 flex items-center justify-between gap-3 border-t border-line pt-4",
                    children: [
                      l.jsx("p", {
                        className: "text-xs text-muted",
                        children: "Showing the most recent saved conversation.",
                      }),
                      l.jsx(fg, {
                        onClick: t,
                        className: "btn-quiet text-sm",
                        children: "Start a new chat",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    : null;
}
function Y3({ onDone: e, onGoal: t, onActivity: n, onImport: r }) {
  const [i, o] = w.useState(1),
    [s, a] = w.useState(!0),
    u = w.useRef(null),
    c = async (d) => {
      (a(!1), await e(), await (d == null ? void 0 : d()));
    };
  return l.jsx(lw, {
    open: s,
    onOpenChange: (d) => {
      d || c();
    },
    children: l.jsxs(uw, {
      children: [
        l.jsx(cw, {
          className: "fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm",
        }),
        l.jsxs(dw, {
          ref: u,
          className:
            "fixed left-1/2 top-1/2 z-50 max-h-[calc(100vh-1rem)] w-[min(620px,calc(100vw-1.5rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[1.75rem] border border-line bg-surface p-5 shadow-lift sm:p-7",
          children: [
            l.jsxs("div", {
              className: "flex items-center justify-between gap-4",
              children: [
                l.jsxs("span", {
                  className:
                    "rounded-full bg-forest-soft px-3 py-1 text-xs font-bold text-forest",
                  children: ["A quick introduction · ", i, " of 2"],
                }),
                l.jsx("button", {
                  onClick: () => void c(),
                  className:
                    "grid h-9 w-9 place-items-center rounded-full hover:bg-sunken",
                  "aria-label": "Skip introduction",
                  children: l.jsx($o, { size: 18 }),
                }),
              ],
            }),
            i === 1
              ? l.jsxs("div", {
                  className: "mt-5",
                  children: [
                    l.jsx("span", {
                      className:
                        "grid h-12 w-12 place-items-center rounded-2xl bg-marigold-soft text-forest",
                      children: l.jsx(Bo, { size: 25 }),
                    }),
                    l.jsx(Jd, {
                      className:
                        "mt-4 text-2xl font-extrabold leading-tight sm:text-[1.8rem]",
                      children: "Make progress toward what matters.",
                    }),
                    l.jsx(ef, {
                      className: "mt-3 text-[1rem] leading-relaxed text-muted",
                      children:
                        "Set a savings goal and BudgetWise will help you build a realistic path toward it, track your progress, and adjust your guidance as things change.",
                    }),
                    l.jsxs("div", {
                      className: "mt-4 flex gap-3 rounded-2xl bg-sunken p-3.5",
                      children: [
                        l.jsx(O1, {
                          className: "mt-0.5 shrink-0 text-forest",
                          size: 20,
                        }),
                        l.jsxs("p", {
                          className: "text-sm leading-relaxed",
                          children: [
                            l.jsx("strong", {
                              children: "Share only what you choose.",
                            }),
                            " Every question is optional, and you can add, correct, or remove information anytime.",
                          ],
                        }),
                      ],
                    }),
                    l.jsxs("div", {
                      className: "mt-6 flex items-center justify-between gap-3",
                      children: [
                        l.jsx("button", {
                          onClick: () => void c(),
                          className: "btn-ghost text-sm",
                          children: "Skip",
                        }),
                        l.jsxs("button", {
                          onClick: () => {
                            (o(2),
                              window.requestAnimationFrame(() => {
                                var d;
                                return (d = u.current) == null
                                  ? void 0
                                  : d.scrollTo({ top: 0 });
                              }));
                          },
                          className: "btn-primary",
                          children: ["Next ", l.jsx(Bl, { size: 17 })],
                        }),
                      ],
                    }),
                  ],
                })
              : l.jsxs("div", {
                  className: "mt-5",
                  children: [
                    l.jsx("span", {
                      className:
                        "grid h-12 w-12 place-items-center rounded-2xl bg-forest-soft text-forest",
                      children: l.jsx(ua, { size: 25 }),
                    }),
                    l.jsx(Jd, {
                      className:
                        "mt-4 text-2xl font-extrabold leading-tight sm:text-[1.8rem]",
                      children: "Start with anything you know.",
                    }),
                    l.jsx(ef, {
                      className: "mt-3 text-[1rem] leading-relaxed text-muted",
                      children:
                        "Describe spending, income, or bills naturally—like “I spent $20 on lunch”—or import a bank CSV. Estimates and details from earlier days are welcome.",
                    }),
                    l.jsx("p", {
                      className: "mt-3 text-sm leading-relaxed text-muted",
                      children:
                        "A goal is optional. BudgetWise can still organize your activity, explain spending patterns, and offer advice as it learns more.",
                    }),
                    l.jsxs("div", {
                      className: "mt-6 grid gap-2 sm:grid-cols-2",
                      children: [
                        l.jsx("button", {
                          onClick: () => void c(t),
                          className: "btn-primary justify-center",
                          children: "Set a savings goal",
                        }),
                        l.jsx("button", {
                          onClick: () => void c(n),
                          className: "btn-quiet justify-center",
                          children: "Log money activity",
                        }),
                        l.jsxs("button", {
                          onClick: () => void c(r),
                          className: "btn-ghost justify-center sm:col-span-2",
                          children: [
                            l.jsx(To, { size: 17 }),
                            " Import transactions",
                          ],
                        }),
                      ],
                    }),
                    l.jsx("button", {
                      onClick: () => void c(),
                      className:
                        "mx-auto mt-4 block text-sm font-semibold text-muted underline",
                      children: "I’ll start on my own",
                    }),
                  ],
                }),
          ],
        }),
      ],
    }),
  });
}
function X3({ goal: e, submit: t, startActivity: n }) {
  return l.jsxs("div", {
    className: "flex items-start gap-3 pt-2",
    children: [
      l.jsx(Ss, {}),
      l.jsxs("div", {
        className:
          "min-w-0 max-w-2xl flex-1 rounded-2xl border border-forest/15 bg-surface p-4 shadow-sm",
        children: [
          l.jsxs("div", {
            className: "flex items-center gap-2 text-forest",
            children: [
              l.jsx(Jt, { size: 18 }),
              l.jsx("h2", {
                className: "font-bold",
                children: "Your workspace is ready",
              }),
            ],
          }),
          l.jsx("p", {
            className: "mt-2 text-[0.94rem] leading-relaxed",
            children:
              "Keep me updated in your own words whenever money comes in, goes out, or a bill changes. I’ll organize it, track your progress, and make the advice more useful over time.",
          }),
          l.jsxs("div", {
            className: "mt-3 flex flex-wrap gap-2",
            children: [
              e &&
                l.jsx("button", {
                  className: "btn-primary text-sm",
                  onClick: () => t("Give me a starter plan"),
                  children: "See my goal plan",
                }),
              l.jsx("button", {
                className: e ? "btn-quiet text-sm" : "btn-primary text-sm",
                onClick: n,
                children: "Log money activity",
              }),
              l.jsxs(It, {
                to: "/accounts#upload",
                className: "btn-ghost text-sm",
                children: [l.jsx(To, { size: 16 }), " Import a CSV"],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function Z3({ s: e, history: t, submit: n, startLogging: r, onNewChat: i }) {
  const o = e.goal;
  return l.jsxs("div", {
    className: "flex items-start gap-3",
    children: [
      l.jsx(Ss, {}),
      l.jsxs("div", {
        className:
          "min-w-0 max-w-2xl flex-1 rounded-2xl border border-forest/15 bg-surface p-4 shadow-sm sm:p-5",
        children: [
          l.jsxs("div", {
            className: "flex items-center gap-2 text-forest",
            children: [
              l.jsx(ua, { size: 18 }),
              l.jsx("h2", {
                className: "font-bold",
                children: "Here’s where we left off",
              }),
            ],
          }),
          o
            ? l.jsxs("div", {
                className: "mt-3 space-y-2 text-[0.95rem] leading-relaxed",
                children: [
                  l.jsxs("p", {
                    children: [
                      "You’re working toward ",
                      l.jsxs("strong", {
                        children: [ie(o.target, !0), " for ", o.name],
                      }),
                      " by ",
                      l.jsx("strong", { children: ze(o.deadline) }),
                      ".",
                    ],
                  }),
                  l.jsx("p", {
                    children: o.saved_known
                      ? l.jsxs(l.Fragment, {
                          children: [
                            "You’ve set aside ",
                            l.jsx("strong", { children: ie(o.saved) }),
                            ", and your current target is ",
                            l.jsxs("strong", {
                              children: [
                                ie(o.pace_amount),
                                " per ",
                                o.pace_unit,
                              ],
                            }),
                            ".",
                          ],
                        })
                      : l.jsxs(l.Fragment, {
                          children: [
                            "Your current starting target is ",
                            l.jsxs("strong", {
                              children: [
                                ie(o.pace_amount),
                                " per ",
                                o.pace_unit,
                              ],
                            }),
                            ". You haven’t added an amount already set aside.",
                          ],
                        }),
                  }),
                  l.jsx("p", {
                    className: "text-muted",
                    children:
                      o.plan_level === "personalized"
                        ? "This uses the income, bills, and spending you’ve shared."
                        : "This is a starting target. I’ll make it more realistic as you share spending, income, or bills.",
                  }),
                ],
              })
            : l.jsxs("div", {
                className: "mt-3 space-y-2 text-[0.95rem] leading-relaxed",
                children: [
                  l.jsxs("p", {
                    children: [
                      "Your workspace is ready",
                      e.balance_info.as_of
                        ? l.jsxs(l.Fragment, {
                            children: [
                              " with a recorded balance of ",
                              l.jsx("strong", { children: ie(e.balance) }),
                            ],
                          })
                        : null,
                      ".",
                    ],
                  }),
                  l.jsx("p", {
                    className: "text-muted",
                    children:
                      "Share spending, income, or bills whenever they happen. I’ll organize them and explain what they mean.",
                  }),
                ],
              }),
          l.jsx("p", {
            className: "mt-3 text-sm",
            children:
              "Tell me anything whenever it happens, or choose a place to continue:",
          }),
          l.jsxs("div", {
            className: "mt-3 flex flex-wrap gap-2",
            children: [
              o &&
                l.jsx("button", {
                  className: "btn-primary text-sm",
                  onClick: () => n("Give me a starter plan"),
                  children: "Give me a starter plan",
                }),
              l.jsx("button", {
                className: o ? "btn-quiet text-sm" : "btn-primary text-sm",
                onClick: r,
                children: "Log spending or income",
              }),
              l.jsxs(It, {
                to: "/accounts#upload",
                className: "btn-ghost text-sm",
                children: [l.jsx(To, { size: 16 }), " Import transactions"],
              }),
            ],
          }),
          l.jsx("div", {
            className: "mt-3",
            children: l.jsx(G3, { history: t, onNewChat: i }),
          }),
        ],
      }),
    ],
  });
}
function J3({ s: e, embedded: t = !1 }) {
  const n = e.goal,
    r = n
      ? n.remaining === 0
        ? "Goal reached"
        : n.days_remaining === 0
          ? "Deadline reached"
          : n.plan_level === "personalized"
            ? n.fits
              ? "Personalized pace"
              : "Needs adjustment"
            : n.plan_level === "estimated"
              ? "Estimated pace"
              : "Starter pace"
      : "",
    i = n
      ? n.remaining === 0
        ? "You’ve recorded enough savings for this goal. Edit it when you’re ready for your next one."
        : n.days_remaining === 0
          ? "There’s still money to set aside. Edit your deadline to choose a new pace."
          : n.saved_known
            ? n.plan_level === "personalized"
              ? n.fits
                ? "This pace fits the income, bills and spending you’ve shared."
                : "The current pace does not comfortably fit yet. Ask BudgetWise to adjust the plan."
              : n.plan_level === "estimated"
                ? "This uses the information you’ve shared so far. More spending history will sharpen it."
                : "This is a starting target. Add income and bills whenever you want to check what fits."
            : "This starts from zero until you add what you’ve already saved."
      : "",
    o = lt(),
    [s, a] = w.useState(!1),
    [u, c] = w.useState(""),
    [d, f] = w.useState(!1),
    h = async (p) => {
      const v = new FormData(p);
      (f(!0), c(""));
      try {
        (await de.saveSettings({
          goal: {
            name: v.get("name"),
            target: Number(v.get("target")),
            deadline: v.get("deadline"),
            saved: Number(v.get("saved") || 0),
            saved_known: v.get("saved") !== "",
          },
        }),
          await o.invalidateQueries(),
          a(!1));
      } catch (g) {
        c(g.message);
      } finally {
        f(!1);
      }
    };
  return l.jsxs("section", {
    className: t
      ? "p-3.5 sm:p-4"
      : "panel border-t-[3px] border-t-forest p-5 shadow-sm sm:p-6",
    children: [
      l.jsxs("div", {
        className: "flex items-center justify-between gap-3",
        children: [
          l.jsx("h2", {
            className: t
              ? "text-[1.12rem] font-bold"
              : "text-[1.25rem] font-bold",
            children: "Your next milestone",
          }),
          n &&
            l.jsx("button", {
              onClick: () => a(!s),
              className: "text-sm font-semibold text-forest underline",
              children: s ? "Cancel" : "Edit",
            }),
        ],
      }),
      s && n
        ? l.jsxs("form", {
            onSubmit: (p) => {
              (p.preventDefault(), h(p.currentTarget));
            },
            className: "mt-3 space-y-2.5",
            children: [
              l.jsxs("label", {
                className: "block text-sm",
                children: [
                  "Goal name",
                  l.jsx("input", {
                    name: "name",
                    className: "field mt-1",
                    defaultValue: n.name,
                    required: !0,
                    maxLength: 40,
                  }),
                ],
              }),
              l.jsxs("label", {
                className: "block text-sm",
                children: [
                  "Target amount ($)",
                  l.jsx("input", {
                    name: "target",
                    type: "number",
                    min: "0.01",
                    step: "0.01",
                    className: "field mt-1",
                    defaultValue: n.target,
                    required: !0,
                  }),
                ],
              }),
              l.jsxs("label", {
                className: "block text-sm",
                children: [
                  "Deadline",
                  l.jsx("input", {
                    name: "deadline",
                    type: "date",
                    min: e.as_of,
                    className: "field mt-1",
                    defaultValue: n.deadline,
                    required: !0,
                  }),
                ],
              }),
              l.jsxs("label", {
                className: "block text-sm",
                children: [
                  "Already set aside ($)",
                  l.jsx("input", {
                    name: "saved",
                    type: "number",
                    min: "0",
                    step: "0.01",
                    className: "field mt-1",
                    defaultValue: n.saved_known ? n.saved : "",
                    placeholder: "Leave blank if unknown",
                  }),
                ],
              }),
              u &&
                l.jsx("p", {
                  role: "alert",
                  className: "text-sm text-berry",
                  children: u,
                }),
              l.jsx("button", {
                disabled: d,
                className: "btn-primary w-full",
                children: d ? "Saving…" : "Save changes",
              }),
            ],
          })
        : n
          ? l.jsxs("div", {
              className: t ? "mt-2" : "mt-3",
              children: [
                l.jsx("p", {
                  className: "text-sm text-muted",
                  children: n.name,
                }),
                l.jsxs("p", {
                  className: `num mt-0.5 font-display font-bold leading-tight text-forest ${t ? "text-[1.7rem]" : "text-[2rem]"}`,
                  children: [
                    n.saved_known ? ie(n.saved, !0) : "—",
                    " ",
                    l.jsxs("span", {
                      className: "text-[1.05rem]",
                      children: ["of ", ie(n.target, !0)],
                    }),
                  ],
                }),
                !n.saved_known &&
                  l.jsx("p", {
                    className: "mt-1 text-sm text-muted",
                    children: "Amount already set aside hasn’t been added.",
                  }),
                l.jsx("div", {
                  className: t
                    ? "mt-2 h-1.5 overflow-hidden rounded-full bg-line/65"
                    : "mt-3 h-1.5 overflow-hidden rounded-full bg-line/65",
                  role: "progressbar",
                  "aria-label": "Goal savings",
                  "aria-valuemin": 0,
                  "aria-valuemax": 100,
                  "aria-valuenow": n.saved_known ? Math.min(n.percent, 100) : 0,
                  children: l.jsx("div", {
                    className: "h-full rounded-full bg-forest",
                    style: {
                      width: `${n.saved_known ? Math.min(n.percent, 100) : 0}%`,
                    },
                  }),
                }),
                l.jsxs("div", {
                  className: t
                    ? "mt-2 flex flex-wrap items-center justify-between gap-2 text-sm"
                    : "mt-3 flex flex-wrap items-center justify-between gap-3 text-sm",
                  children: [
                    l.jsxs("span", {
                      className: "flex items-center gap-2",
                      children: [
                        l.jsx(Mo, { size: 17, className: "text-forest" }),
                        " By ",
                        ze(n.deadline),
                      ],
                    }),
                    l.jsxs("span", {
                      className: "flex items-center gap-2 font-semibold",
                      children: [
                        l.jsx(_1, { size: 17, className: "text-forest" }),
                        ie(n.pace_amount),
                        " / ",
                        n.pace_unit,
                      ],
                    }),
                  ],
                }),
                !t &&
                  l.jsxs("div", {
                    className:
                      "mt-3 flex items-start gap-3 border-t border-line pt-3",
                    children: [
                      l.jsx("span", {
                        className:
                          "shrink-0 rounded-full bg-marigold-soft px-2.5 py-1 text-xs font-semibold",
                        children: r,
                      }),
                      l.jsx("p", {
                        className: "text-xs leading-relaxed text-muted",
                        children: i,
                      }),
                    ],
                  }),
              ],
            })
          : l.jsxs("div", {
              className: t ? "py-2" : "py-5",
              children: [
                l.jsx(Bo, { size: t ? 24 : 28, className: "text-forest" }),
                l.jsx("h3", {
                  className: "mt-2 text-lg font-semibold",
                  children: "What are you working toward?",
                }),
                l.jsx("p", {
                  className: "mt-1 text-sm leading-relaxed text-muted",
                  children:
                    "A trip, a little breathing room, or something else. Tell me an amount and a date, and your goal will appear here.",
                }),
                l.jsx("p", {
                  className: "mt-2 text-sm text-muted",
                  children:
                    "Goals are optional. You can just track your spending.",
                }),
              ],
            }),
    ],
  });
}
function iy() {
  var V, Y, A;
  const { data: e, error: t } = Ge({
      queryKey: ["snapshot"],
      queryFn: de.snapshot,
    }),
    { data: n } = Ge({
      queryKey: ["conversation", e == null ? void 0 : e.account.id],
      queryFn: de.conversation,
      enabled: !!e,
    }),
    { messages: r, busy: i, send: o, reset: s } = Pi(),
    a = lt(),
    u = Jn(),
    [c, d] = w.useState(""),
    [f, h] = w.useState(!1),
    [p, v] = w.useState(""),
    [g, b] = w.useState([]),
    m = w.useRef(null),
    x = w.useRef(null),
    y = w.useRef(!0),
    k = w.useRef(!1),
    [N, C] = w.useState(!1),
    j = (_ = "smooth") => {
      var S;
      ((y.current = !0),
        C(!1),
        (k.current = !0),
        (S = x.current) == null ||
          S.scrollIntoView({ block: "end", behavior: _ }),
        window.setTimeout(
          () => {
            k.current = !1;
          },
          _ === "smooth" ? 650 : 0,
        ));
    };
  w.useEffect(() => {
    const _ = () => {
      if (k.current) return;
      const U =
        document.documentElement.scrollHeight -
          (window.scrollY + window.innerHeight) <
        150;
      ((y.current = U), C(!U && r.length > 0));
    };
    return (
      window.addEventListener("scroll", _, { passive: !0 }),
      () => window.removeEventListener("scroll", _)
    );
  }, [r.length]);
  const P = (V = r.at(-1)) == null ? void 0 : V.text;
  w.useEffect(() => {
    if (!r.length || !y.current) return;
    const _ = window.requestAnimationFrame(() => j("smooth"));
    return () => window.cancelAnimationFrame(_);
  }, [r.length, P, n == null ? void 0 : n.question]);
  const T = (_) => {
      !_.trim() || i || ((y.current = !0), C(!1), d(""), h(!1), o(_));
    },
    I = async (_) => {
      try {
        (await de.undo(_), b((S) => [...S, _]), await a.invalidateQueries());
      } catch (S) {
        v(S.message);
      }
    },
    D = async () => {
      (await de.saveSettings({ welcome_seen: !0 }),
        await a.invalidateQueries({
          queryKey: ["conversation", e == null ? void 0 : e.account.id],
        }));
    };
  if (t)
    return l.jsx("p", {
      role: "alert",
      className: "panel p-6",
      children: "Couldn’t load your workspace. Please refresh to try again.",
    });
  if (!e) return l.jsx(ks, { className: "h-96" });
  const O = e.goal,
    $ = !!(
      O ||
      e.balance_info.as_of ||
      e.told.length ||
      e.estimates.count ||
      e.spending_last_30_days.length
    ),
    G = (n == null ? void 0 : n.history) || [],
    Q = !!(
      n != null &&
      n.guidance_complete &&
      ((Y = r.at(-1)) == null ? void 0 : Y.role) === "assistant" &&
      (A = r.at(-1)) != null &&
      A.text.includes("That’s enough to get started")
    );
  return l.jsxs(l.Fragment, {
    children: [
      l.jsxs("div", {
        className:
          "home-workspace grid items-start gap-5 lg:grid-cols-[minmax(0,1.58fr)_minmax(340px,0.92fr)] xl:gap-7",
        children: [
          l.jsxs("section", {
            className: "flex min-w-0 flex-col",
            children: [
              l.jsxs("header", {
                className: "pb-3",
                children: [
                  l.jsx("p", {
                    className:
                      "mb-1 text-xs font-bold uppercase tracking-[0.14em] text-forest/75",
                    children: $
                      ? "Your current money picture"
                      : "Your money, one step at a time",
                  }),
                  l.jsx("h1", {
                    className:
                      "text-[2rem] font-extrabold leading-tight tracking-tight sm:text-[2.35rem]",
                    children: $ ? "Welcome back." : "Hi, I’m BudgetWise.",
                  }),
                  l.jsx("p", {
                    className: "mt-0.5 text-base sm:text-lg",
                    children: $
                      ? "Let’s continue from what you’ve already shared."
                      : "Let’s make your next money decision simpler.",
                  }),
                ],
              }),
              l.jsxs("div", {
                className: "min-h-[205px] space-y-3 py-2",
                "aria-live": "polite",
                "aria-label": "Conversation",
                children: [
                  r.length === 0 &&
                    ($
                      ? l.jsx(Z3, {
                          s: e,
                          history: G,
                          submit: T,
                          startLogging: () => {
                            var _;
                            (d("I spent "),
                              (_ = m.current) == null || _.focus());
                          },
                          onNewChat: () => s(),
                        })
                      : l.jsxs("div", {
                          className: "flex items-start gap-3",
                          children: [
                            l.jsx(Ss, {}),
                            l.jsxs("div", {
                              className: "max-w-xl",
                              children: [
                                l.jsx("p", {
                                  className: "leading-relaxed",
                                  children:
                                    "I can help you save for something, understand your spending, and keep track of bills and income. Start with anything you know.",
                                }),
                                l.jsx("p", {
                                  className: "mt-2 text-sm text-muted",
                                  children:
                                    "You can skip questions and add or correct details anytime.",
                                }),
                                l.jsxs("div", {
                                  className: "mt-4 flex flex-wrap gap-2",
                                  children: [
                                    l.jsx("button", {
                                      className: "btn-primary text-sm",
                                      onClick: () => T("Save for something"),
                                      children: "Save for something",
                                    }),
                                    l.jsx("button", {
                                      className: "btn-quiet text-sm",
                                      onClick: () => T("Track spending"),
                                      children: "Track spending",
                                    }),
                                    l.jsx("button", {
                                      className: "btn-ghost text-sm",
                                      onClick: () => T("What can you do?"),
                                      children: "What can you do?",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        })),
                  r.map((_) => {
                    var S;
                    return _.role === "user"
                      ? l.jsx(
                          "div",
                          {
                            className: "flex justify-end pl-10",
                            children: l.jsx("p", {
                              className:
                                "max-w-[85%] rounded-2xl rounded-br-md bg-forest px-4 py-3 text-white",
                              children: _.text,
                            }),
                          },
                          _.id,
                        )
                      : l.jsxs(
                          "div",
                          {
                            className: "flex items-start gap-3",
                            children: [
                              l.jsx(Ss, {}),
                              l.jsxs("div", {
                                className: "min-w-0 max-w-[90%]",
                                children: [
                                  l.jsx("div", {
                                    className:
                                      "prose-chat rounded-2xl bg-sunken px-4 py-3 text-[0.96rem] leading-relaxed",
                                    children:
                                      _.pending && !_.text
                                        ? l.jsxs("span", {
                                            className:
                                              "flex items-center gap-2 text-muted",
                                            children: [
                                              l.jsx(zr, {
                                                size: 16,
                                                className: "animate-spin",
                                              }),
                                              "Organizing what you shared…",
                                            ],
                                          })
                                        : l.jsx(Yw, { children: _.text }),
                                  }),
                                  _.plan &&
                                    l.jsxs("div", {
                                      className: "mt-3",
                                      children: [
                                        l.jsx(mf, { p: _.plan, compact: !0 }),
                                        l.jsx(It, {
                                          to: "/plan",
                                          className:
                                            "btn-primary mt-3 w-full justify-center",
                                          children:
                                            "Review and start this plan",
                                        }),
                                      ],
                                    }),
                                  (S = _.saved) != null && S.count
                                    ? l.jsxs("div", {
                                        className:
                                          "mt-2 flex items-center gap-3 text-xs text-muted",
                                        children: [
                                          l.jsxs("span", {
                                            className:
                                              "flex items-center gap-1",
                                            children: [
                                              l.jsx(Jt, { size: 13 }),
                                              g.includes(_.saved.batch_id)
                                                ? "Undone"
                                                : "Saved to your workspace",
                                            ],
                                          }),
                                          l.jsx("button", {
                                            disabled:
                                              i || g.includes(_.saved.batch_id),
                                            onClick: () =>
                                              void I(_.saved.batch_id),
                                            className:
                                              "font-semibold text-forest underline disabled:opacity-40",
                                            children: "Undo",
                                          }),
                                          l.jsx("button", {
                                            disabled: i,
                                            onClick: () => {
                                              var U;
                                              (d("Actually, "),
                                                (U = m.current) == null ||
                                                  U.focus());
                                            },
                                            className:
                                              "font-semibold text-forest underline",
                                            children: "Correct",
                                          }),
                                        ],
                                      })
                                    : null,
                                  _.error &&
                                    l.jsxs("p", {
                                      role: "alert",
                                      className: "mt-2 text-sm text-berry",
                                      children: [
                                        _.error,
                                        " Check your saved information before trying again.",
                                      ],
                                    }),
                                ],
                              }),
                            ],
                          },
                          _.id,
                        );
                  }),
                  !i &&
                    (n == null ? void 0 : n.question) &&
                    l.jsxs("div", {
                      className: "flex items-start gap-3 pt-2",
                      children: [
                        l.jsx(Ss, {}),
                        l.jsxs("div", {
                          className: "min-w-0 flex-1",
                          children: [
                            l.jsx("p", {
                              className:
                                "rounded-2xl bg-forest-soft px-4 py-3 font-semibold",
                              children: n.question,
                            }),
                            l.jsxs("div", {
                              className: "mt-3 flex flex-wrap gap-2",
                              children: [
                                n.question_key === "payday" &&
                                  l.jsxs("button", {
                                    className: "btn-primary text-sm",
                                    onClick: () => h(!f),
                                    children: [
                                      l.jsx(Mo, { size: 16 }),
                                      " Choose a date",
                                    ],
                                  }),
                                n.choices.map((_) =>
                                  l.jsx(
                                    "button",
                                    {
                                      className:
                                        "btn border border-line bg-surface px-3 py-2 text-sm",
                                      onClick: () => T(_),
                                      children: _,
                                    },
                                    _,
                                  ),
                                ),
                              ],
                            }),
                            f &&
                              l.jsxs("label", {
                                className: "mt-3 block text-sm",
                                children: [
                                  "Next payday",
                                  l.jsx("input", {
                                    "aria-label": "Next payday",
                                    type: "date",
                                    min: e.as_of,
                                    className: "field mt-1 max-w-xs",
                                    onChange: (_) => {
                                      _.target.value && T(_.target.value);
                                    },
                                  }),
                                ],
                              }),
                          ],
                        }),
                      ],
                    }),
                  !i &&
                    Q &&
                    l.jsx(X3, {
                      goal: !!O,
                      submit: T,
                      startActivity: () => {
                        var _;
                        (d("Today I spent "),
                          (_ = m.current) == null || _.focus());
                      },
                    }),
                  l.jsx("div", {
                    ref: x,
                    className: "h-px scroll-mb-40",
                    "aria-hidden": !0,
                  }),
                ],
              }),
              l.jsxs("div", {
                className:
                  "home-composer sticky bottom-[72px] z-10 mt-4 rounded-2xl bg-canvas/95 pt-2 backdrop-blur md:bottom-3",
                children: [
                  N &&
                    l.jsxs("button", {
                      onClick: () => j(),
                      className:
                        "absolute -top-10 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-forest shadow-sm",
                      children: [l.jsx(GP, { size: 14 }), " Jump to latest"],
                    }),
                  l.jsxs("form", {
                    onSubmit: (_) => {
                      (_.preventDefault(), T(c));
                    },
                    className:
                      "flex items-center gap-2 rounded-2xl border border-forest/30 bg-surface p-2 shadow-md sm:gap-3",
                    children: [
                      l.jsx(It, {
                        to: "/accounts#upload",
                        "aria-label": "Import transactions",
                        className:
                          "border-r border-line px-2 py-2 text-forest sm:px-3",
                        children: l.jsx(To, { size: 22 }),
                      }),
                      l.jsx("input", {
                        ref: m,
                        "aria-label": "Message BudgetWise",
                        className:
                          "min-w-0 flex-1 bg-transparent py-3 text-base outline-none",
                        placeholder: "Tell me anything, or ask a question…",
                        value: c,
                        maxLength: 1e3,
                        onChange: (_) => d(_.target.value),
                      }),
                      l.jsx("button", {
                        disabled: i || !c.trim(),
                        className: "btn-primary px-3",
                        "aria-label": "Send message",
                        children: i
                          ? l.jsx(zr, { size: 19, className: "animate-spin" })
                          : l.jsx(C_, { size: 19 }),
                      }),
                    ],
                  }),
                  l.jsxs("p", {
                    className: "mt-2 text-xs text-muted",
                    children: [
                      "Add spending, income or bills anytime. Estimates are welcome. ",
                      l.jsx("button", {
                        onClick: () => T("Privacy"),
                        className: "underline",
                        children: "About privacy",
                      }),
                    ],
                  }),
                  p &&
                    l.jsx("p", {
                      role: "alert",
                      className: "text-sm text-berry",
                      children: p,
                    }),
                ],
              }),
            ],
          }),
          l.jsxs("aside", {
            className:
              "home-summary min-w-0 overflow-hidden rounded-3xl border border-line bg-surface lg:sticky lg:top-[84px]",
            children: [
              l.jsx(J3, { s: e, embedded: !0 }),
              l.jsxs("section", {
                className: "border-t border-line px-4 py-2.5",
                children: [
                  l.jsxs("div", {
                    className: "flex items-center justify-between gap-3",
                    children: [
                      l.jsxs("div", {
                        children: [
                          l.jsx("p", {
                            className:
                              "text-[0.7rem] font-semibold uppercase tracking-wide text-muted",
                            children: "Safe to spend today",
                          }),
                          e.readiness.ready
                            ? l.jsx("p", {
                                className:
                                  "num mt-0.5 text-xl font-bold text-forest",
                                children: ie(Math.max(e.left_today, 0)),
                              })
                            : l.jsx("p", {
                                className: "mt-0.5 font-semibold",
                                children: "Not calculated yet",
                              }),
                        ],
                      }),
                      l.jsx($l, { className: "text-forest", size: 22 }),
                    ],
                  }),
                  l.jsx("p", {
                    className: "mt-1 text-xs leading-snug text-muted",
                    children: e.readiness.ready
                      ? e.left_today <= 0 && e.spent_today > 0
                        ? `You’ve already logged ${ie(e.spent_today)} today, using today’s ${ie(e.safe_per_day)} amount.`
                        : `Known bills and your cushion are protected across the next ${e.planning_horizon_days} days.`
                      : `Add ${e.readiness.missing.join(", ")} when you’re ready for a reliable amount.`,
                  }),
                ],
              }),
              l.jsxs("section", {
                className: "border-t border-line px-4 pb-3 pt-2.5",
                children: [
                  l.jsxs("div", {
                    className: "flex items-center justify-between gap-3",
                    children: [
                      l.jsx("h2", {
                        className: "text-[1.02rem] font-bold",
                        children: "What you’ve shared",
                      }),
                      l.jsx("span", {
                        className: "text-[0.7rem] text-muted",
                        children: "Add or correct anytime",
                      }),
                    ],
                  }),
                  l.jsxs("dl", {
                    className: "mt-1.5 grid grid-cols-2 gap-1.5 text-sm",
                    children: [
                      l.jsx(Wa, {
                        icon: Bo,
                        name: "Goal",
                        value: O
                          ? `${ie(O.target, !0)} by ${ze(O.deadline)}`
                          : "Not added",
                      }),
                      l.jsx(Wa, {
                        icon: _1,
                        name: "Set aside",
                        value:
                          O != null && O.saved_known
                            ? ie(O.saved)
                            : "Not added",
                      }),
                      l.jsx(Wa, {
                        icon: $l,
                        name: "Available money",
                        value: e.readiness.missing.includes("balance")
                          ? "Not added"
                          : ie(e.balance),
                      }),
                      l.jsx(Wa, {
                        icon: Mo,
                        name: "Next payday",
                        value: e.readiness.payday_known
                          ? ze(e.next_payday)
                          : "Not added",
                      }),
                    ],
                  }),
                  l.jsxs(It, {
                    to: "/accounts#upload",
                    className:
                      "mt-2 flex items-center justify-center gap-2 rounded-xl border border-line bg-sunken/55 px-3 py-1.5 text-sm font-semibold text-forest",
                    children: [l.jsx(To, { size: 16 }), " Import transactions"],
                  }),
                ],
              }),
              e.insights.length > 0 &&
                l.jsxs("section", {
                  className:
                    "border-t border-line bg-forest-soft/45 px-4 py-2.5",
                  children: [
                    l.jsx("h2", {
                      className: "text-sm font-bold",
                      children: "From your activity",
                    }),
                    l.jsx("p", {
                      className: "mt-0.5 text-xs leading-snug text-muted",
                      children: e.insights[0].detail,
                    }),
                    l.jsx(It, {
                      to: "/spending",
                      className:
                        "mt-1 inline-block text-xs font-semibold text-forest",
                      children: "Review activity →",
                    }),
                  ],
                }),
              l.jsx("p", {
                className:
                  "border-t border-line px-4 py-2 text-[0.7rem] leading-snug text-muted",
                children:
                  "Share only what you choose. Your plan improves as you add information.",
              }),
            ],
          }),
        ],
      }),
      n &&
        !n.welcome_seen &&
        e.account.kind === "personal" &&
        l.jsx(Y3, {
          onDone: D,
          onGoal: async () => {
            T("Save for something");
          },
          onActivity: async () => {
            (d("Today I spent "),
              window.setTimeout(() => {
                var _;
                return (_ = m.current) == null ? void 0 : _.focus();
              }, 50));
          },
          onImport: async () => {
            u("/accounts#upload");
          },
        }),
    ],
  });
}
function Wa({ icon: e, name: t, value: n }) {
  return l.jsxs("div", {
    className: "rounded-xl bg-sunken/60 p-2",
    children: [
      l.jsxs("div", {
        className: "flex items-center gap-1.5",
        children: [
          l.jsx(e, { size: 15, className: "shrink-0 text-forest" }),
          l.jsx("dt", {
            className: "text-[0.7rem] font-semibold text-muted",
            children: t,
          }),
        ],
      }),
      l.jsx("dd", {
        className: "mt-0.5 truncate text-[0.86rem] font-semibold",
        title: n,
        children: n,
      }),
    ],
  });
}
let oy = null;
async function Jw(e, t = {}, n) {
  const r = { text: "", saved: null, batchId: null };
  try {
    await Fp(
      "/api/chat",
      {
        message: e,
        mode: "log",
        session_id: oy,
        checkin: t.checkin,
        context_hint: t.contextHint,
      },
      (i) => {
        const o = i;
        o.type === "session"
          ? (oy = o.session_id)
          : o.type === "token"
            ? ((r.text += o.text), n == null || n(r.text))
            : o.type === "replace"
              ? ((r.text = o.text), n == null || n(r.text))
              : o.type === "card" && o.kind === "saved"
                ? (r.saved = o.data)
                : o.type === "done"
                  ? (r.batchId = o.batch_id ?? null)
                  : o.type === "error" && (r.error = o.message);
      },
    );
  } catch (i) {
    r.error = i.message;
  }
  return r;
}
function e5({
  placeholder: e = "e.g. spent about $20 on food",
  checkin: t,
  contextHint: n,
  onDone: r,
  autoFocus: i = !1,
  compactCard: o = !1,
}) {
  const s = lt(),
    [a, u] = w.useState(""),
    [c, d] = w.useState(!1),
    [f, h] = w.useState(null),
    [p, v] = w.useState(""),
    g = async () => {
      const b = a.trim();
      if (!b || c) return;
      (d(!0), h(null), v(""));
      const m = await Jw(b, { checkin: t, contextHint: n }, v);
      (d(!1),
        h(m),
        m.error && We.error(m.error),
        m.saved && u(""),
        await s.invalidateQueries(),
        r == null || r(m));
    };
  return l.jsxs("div", {
    className: "space-y-3",
    children: [
      l.jsxs("form", {
        onSubmit: (b) => {
          (b.preventDefault(), g());
        },
        className: "relative",
        children: [
          l.jsx("input", {
            value: a,
            onChange: (b) => u(b.target.value),
            placeholder: e,
            autoFocus: i,
            className: "field h-12 pr-12",
            "aria-label": "Tell BudgetWise what you spent or earned",
          }),
          l.jsx("button", {
            type: "submit",
            disabled: c || !a.trim(),
            "aria-label": "Save",
            className:
              "absolute right-1.5 top-1.5 grid h-9 w-9 place-items-center rounded-lg bg-forest text-white disabled:opacity-40 dark:text-canvas",
            children: c
              ? l.jsx(zr, { size: 18, className: "animate-spin" })
              : l.jsx(XP, { size: 18 }),
          }),
        ],
      }),
      (c || f) &&
        l.jsxs("div", {
          className: "space-y-2 animate-rise",
          children: [
            (p || (f == null ? void 0 : f.text)) &&
              l.jsx("p", {
                className: "num text-[0.93rem] text-muted",
                children: ((f == null ? void 0 : f.text) || p).replace(
                  /\*\*/g,
                  "",
                ),
              }),
            (f == null ? void 0 : f.saved) &&
              l.jsx(Zw, { s: f.saved, compact: o }),
          ],
        }),
    ],
  });
}
const t5 = [
  { id: "month", label: "This month" },
  { id: "30", label: "Last 30 days" },
  { id: "90", label: "Last 90 days" },
];
function n5(e, t, n) {
  if (t === "month") return e.date.slice(0, 7) === n.slice(0, 7);
  const r = Number(t),
    i = new Date(n);
  return (
    i.setDate(i.getDate() - r + 1),
    e.date >= i.toISOString().slice(0, 10)
  );
}
function r5({ t: e }) {
  const t = lt(),
    n = async (i) => {
      if (i !== e.category)
        try {
          const o = await de.setCategory(e.id, i);
          (We.success(
            o.changed > 1
              ? `Moved ${o.changed} ${e.merchant} transactions to ${bt(i).label}`
              : `Moved to ${bt(i).label}`,
          ),
            await t.invalidateQueries());
        } catch (o) {
          We.error(o.message);
        }
    },
    r = bt(e.category);
  return l.jsxs(b1, {
    children: [
      l.jsxs(k1, {
        className:
          "chip max-w-[11rem] border border-line bg-surface text-muted hover:border-forest/40 hover:text-ink",
        "aria-label": `Category: ${r.label}. Change`,
        children: [
          l.jsx("span", {
            className: "h-2 w-2 shrink-0 rounded-full",
            style: { background: r.hue },
          }),
          l.jsx("span", { className: "truncate", children: r.label }),
        ],
      }),
      l.jsx(S1, {
        children: l.jsxs(C1, {
          align: "end",
          sideOffset: 6,
          className:
            "z-50 max-h-80 w-60 overflow-y-auto rounded-2xl border border-line bg-surface p-1.5 shadow-lift",
          children: [
            l.jsxs(N1, {
              className: "px-3 pb-1 pt-2 text-[0.8rem] text-muted",
              children: ["Applies to every ", e.merchant, " transaction"],
            }),
            Object.entries(hf).map(([i, o]) =>
              l.jsxs(
                Li,
                {
                  onSelect: () => n(i),
                  className:
                    "flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-1.5 text-[0.9rem] outline-none data-[highlighted]:bg-sunken",
                  children: [
                    l.jsx("span", {
                      className: "h-2.5 w-2.5 rounded-full",
                      style: { background: o.hue },
                    }),
                    l.jsx("span", { className: "flex-1", children: o.label }),
                    i === e.category &&
                      l.jsx(Jt, { size: 15, className: "text-forest" }),
                  ],
                },
                i,
              ),
            ),
          ],
        }),
      }),
    ],
  });
}
function i5({ t: e }) {
  const t = lt();
  if (!["chat", "checkin", "setup"].includes(e.source)) return null;
  const n = async () => {
    (await de.deleteTxn(e.id),
      We.success("Entry deleted"),
      await t.invalidateQueries());
  };
  return l.jsx("button", {
    onClick: n,
    className: "rounded-lg p-1.5 text-faint hover:bg-sunken hover:text-berry",
    "aria-label": `Delete ${e.merchant}`,
    children: l.jsx(L1, { size: 15 }),
  });
}
function o5() {
  const { data: e, isLoading: t } = Ge({
      queryKey: ["transactions"],
      queryFn: de.transactions,
    }),
    { data: n } = Ge({ queryKey: ["snapshot"], queryFn: de.snapshot }),
    [r, i] = w.useState("month"),
    [o, s] = w.useState(null),
    [a, u] = w.useState(""),
    c = (n == null ? void 0 : n.as_of) ?? new Date().toISOString().slice(0, 10),
    d = w.useMemo(
      () =>
        ((e == null ? void 0 : e.transactions) ?? []).filter((y) =>
          n5(y, r, c),
        ),
      [e, r, c],
    ),
    f = w.useMemo(() => {
      const y = new Map();
      for (const k of d)
        k.amount < 0 &&
          k.category !== "transfer" &&
          y.set(k.category, (y.get(k.category) ?? 0) - k.amount);
      return [...y.entries()].sort((k, N) => N[1] - k[1]);
    }, [d]),
    h = f.reduce((y, [, k]) => y + k, 0),
    p = d
      .filter((y) => y.category === "income")
      .reduce((y, k) => y + k.amount, 0),
    v = d.filter(
      (y) =>
        (!o || y.category === o) &&
        (!a ||
          `${y.merchant} ${y.description}`
            .toLowerCase()
            .includes(a.toLowerCase())),
    ),
    g = w.useMemo(() => {
      const y = new Map();
      for (const k of v) y.set(k.date, [...(y.get(k.date) ?? []), k]);
      return [...y.entries()];
    }, [v]),
    b = f[0],
    m = p - h,
    x = n == null ? void 0 : n.insights[0];
  return l.jsxs("div", {
    className: "space-y-5",
    children: [
      l.jsxs("div", {
        className: "flex flex-wrap items-end justify-between gap-4",
        children: [
          l.jsxs("div", {
            children: [
              l.jsx("p", {
                className:
                  "text-xs font-bold uppercase tracking-[0.14em] text-forest/75",
                children: "Your money activity",
              }),
              l.jsx("h1", {
                className: "mt-1 text-[2rem] font-bold leading-tight",
                children: "Activity",
              }),
              l.jsx("p", {
                className: "mt-1 max-w-2xl text-muted",
                children:
                  "See what came in, where money went, and what deserves attention.",
              }),
            ],
          }),
          l.jsx("div", {
            className: "flex rounded-xl bg-sunken p-1",
            role: "tablist",
            "aria-label": "Time period",
            children: t5.map((y) =>
              l.jsx(
                "button",
                {
                  role: "tab",
                  "aria-selected": r === y.id,
                  onClick: () => i(y.id),
                  className: ke(
                    "rounded-lg px-3 py-1.5 text-[0.88rem] font-medium text-muted",
                    r === y.id && "bg-surface text-ink shadow-sm",
                  ),
                  children: y.label,
                },
                y.id,
              ),
            ),
          }),
        ],
      }),
      l.jsxs("div", {
        className:
          "grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.75fr)]",
        children: [
          l.jsxs("section", {
            className:
              "overflow-hidden rounded-3xl border border-line bg-surface shadow-sm",
            children: [
              l.jsxs("div", {
                className:
                  "grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0",
                children: [
                  l.jsxs("div", {
                    className: "p-5",
                    children: [
                      l.jsxs("div", {
                        className: "flex items-center gap-2 text-sm text-muted",
                        children: [
                          l.jsx(KP, { size: 17, className: "text-berry" }),
                          " Spent",
                        ],
                      }),
                      l.jsx("p", {
                        className:
                          "num mt-1 font-display text-[1.8rem] font-bold",
                        children: ie(h),
                      }),
                    ],
                  }),
                  l.jsxs("div", {
                    className: "p-5",
                    children: [
                      l.jsxs("div", {
                        className: "flex items-center gap-2 text-sm text-muted",
                        children: [
                          l.jsx(j1, { size: 17, className: "text-forest" }),
                          " Came in",
                        ],
                      }),
                      l.jsx("p", {
                        className:
                          "num mt-1 font-display text-[1.8rem] font-bold text-forest",
                        children: ie(p),
                      }),
                    ],
                  }),
                  l.jsxs("div", {
                    className: "p-5",
                    children: [
                      l.jsxs("div", {
                        className: "flex items-center gap-2 text-sm text-muted",
                        children: [l.jsx(s_, { size: 17 }), " Net activity"],
                      }),
                      l.jsxs("p", {
                        className: ke(
                          "num mt-1 font-display text-[1.8rem] font-bold",
                          m >= 0 ? "text-forest" : "text-berry",
                        ),
                        children: [m >= 0 ? "+" : "−", ie(Math.abs(m))],
                      }),
                    ],
                  }),
                ],
              }),
              l.jsxs("div", {
                className: "border-t border-line px-5 py-4",
                children: [
                  l.jsxs("div", {
                    className: "flex items-center justify-between gap-3",
                    children: [
                      l.jsx("p", {
                        className: "text-sm font-semibold",
                        children: "Where spending went",
                      }),
                      l.jsxs("p", {
                        className: "num text-xs text-muted",
                        children: [d.length, " transactions"],
                      }),
                    ],
                  }),
                  h > 0
                    ? l.jsxs(l.Fragment, {
                        children: [
                          l.jsx("div", {
                            className:
                              "mt-3 flex h-3 overflow-hidden rounded-full bg-sunken",
                            "aria-label": "Spending by category",
                            children: f.map(([y, k]) =>
                              l.jsx(
                                "div",
                                {
                                  style: {
                                    width: `${(k / h) * 100}%`,
                                    background: bt(y).hue,
                                  },
                                  title: `${bt(y).label}: ${ie(k)}`,
                                },
                                y,
                              ),
                            ),
                          }),
                          l.jsx("div", {
                            className: "mt-3 flex flex-wrap gap-1.5",
                            children: f.slice(0, 5).map(([y, k]) =>
                              l.jsxs(
                                "button",
                                {
                                  onClick: () => s(o === y ? null : y),
                                  "aria-pressed": o === y,
                                  className: ke(
                                    "chip border border-line bg-surface text-muted hover:text-ink",
                                    o === y &&
                                      "border-forest bg-forest-soft text-forest",
                                  ),
                                  children: [
                                    l.jsx("span", {
                                      className: "h-2 w-2 rounded-full",
                                      style: { background: bt(y).hue },
                                    }),
                                    bt(y).label,
                                    " ",
                                    l.jsx("span", {
                                      className: "num font-semibold text-ink",
                                      children: ie(k, !0),
                                    }),
                                  ],
                                },
                                y,
                              ),
                            ),
                          }),
                        ],
                      })
                    : l.jsx("p", {
                        className: "mt-2 text-sm text-muted",
                        children:
                          "Add activity or import transactions to see a breakdown.",
                      }),
                ],
              }),
            ],
          }),
          l.jsxs("section", {
            className:
              "rounded-3xl border border-forest/20 bg-gradient-to-br from-forest-soft/70 to-surface p-5 shadow-sm",
            children: [
              l.jsxs("div", {
                className: "flex items-center gap-2 text-forest",
                children: [
                  l.jsx(ua, { size: 19 }),
                  l.jsx("h2", {
                    className: "font-bold",
                    children: "Worth noticing",
                  }),
                ],
              }),
              x
                ? l.jsxs(l.Fragment, {
                    children: [
                      l.jsx("p", {
                        className: "mt-4 text-lg font-bold leading-snug",
                        children: x.title,
                      }),
                      l.jsx("p", {
                        className: "mt-2 text-sm leading-relaxed text-muted",
                        children: x.detail,
                      }),
                    ],
                  })
                : b
                  ? l.jsxs(l.Fragment, {
                      children: [
                        l.jsxs("p", {
                          className: "mt-4 text-lg font-bold leading-snug",
                          children: [
                            bt(b[0]).label,
                            " is your largest category",
                          ],
                        }),
                        l.jsxs("p", {
                          className: "mt-2 text-sm leading-relaxed text-muted",
                          children: [
                            "It accounts for ",
                            Math.round((b[1] / h) * 100),
                            "% of spending in this period. Keep logging activity and BudgetWise will identify more useful patterns.",
                          ],
                        }),
                      ],
                    })
                  : l.jsxs(l.Fragment, {
                      children: [
                        l.jsx("p", {
                          className: "mt-4 text-lg font-bold",
                          children: "Your insights will appear here",
                        }),
                        l.jsx("p", {
                          className: "mt-2 text-sm leading-relaxed text-muted",
                          children:
                            "About a week of activity or a bank CSV gives BudgetWise enough context to spot patterns.",
                        }),
                      ],
                    }),
            ],
          }),
        ],
      }),
      l.jsxs("section", {
        className:
          "rounded-2xl border border-line bg-surface p-4 shadow-sm sm:flex sm:items-start sm:gap-5",
        children: [
          l.jsxs("div", {
            className: "mb-3 shrink-0 sm:mb-0 sm:w-48",
            children: [
              l.jsx("p", {
                className: "font-bold",
                children: "Add money activity",
              }),
              l.jsx("p", {
                className: "mt-0.5 text-xs text-muted",
                children: "Write it naturally. Estimates are fine.",
              }),
            ],
          }),
          l.jsx("div", {
            className: "min-w-0 flex-1",
            children: l.jsx(e5, {
              placeholder:
                "e.g. $12 lunch and $30 gas yesterday, or I made $300 in tips",
            }),
          }),
        ],
      }),
      l.jsxs("section", {
        className:
          "overflow-hidden rounded-3xl border border-line bg-surface shadow-sm",
        children: [
          l.jsxs("div", {
            className:
              "flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5",
            children: [
              l.jsxs("div", {
                children: [
                  l.jsx("h2", {
                    className: "text-lg font-bold",
                    children: "Transactions",
                  }),
                  l.jsx("p", {
                    className: "text-xs text-muted",
                    children:
                      "Correct a category once and BudgetWise remembers that store.",
                  }),
                ],
              }),
              l.jsxs("div", {
                className: "relative w-full sm:max-w-sm",
                children: [
                  l.jsx(S_, {
                    size: 17,
                    className:
                      "pointer-events-none absolute left-3.5 top-3 text-faint",
                  }),
                  l.jsx("input", {
                    value: a,
                    onChange: (y) => u(y.target.value),
                    placeholder: "Search stores",
                    className: "field py-2 pl-10",
                    "aria-label": "Search transactions",
                  }),
                ],
              }),
            ],
          }),
          o &&
            l.jsxs("div", {
              className:
                "flex items-center gap-2 border-b border-line bg-forest-soft/35 px-5 py-2 text-sm",
              children: [
                l.jsxs("span", { children: ["Showing ", bt(o).label] }),
                l.jsxs("button", {
                  onClick: () => s(null),
                  className: "chip text-forest hover:bg-forest-soft",
                  children: [l.jsx($o, { size: 14 }), " Clear"],
                }),
              ],
            }),
          t
            ? l.jsx("div", {
                className: "space-y-3 p-5",
                children: Array.from({ length: 6 }).map((y, k) =>
                  l.jsx(ks, { className: "h-14" }, k),
                ),
              })
            : g.length === 0
              ? l.jsx("p", {
                  className: "p-6 text-muted",
                  children:
                    "No transactions match. Try a different period, category or search.",
                })
              : l.jsx("div", {
                  className: "divide-y divide-line",
                  children: g.map(([y, k]) =>
                    l.jsxs(
                      "div",
                      {
                        children: [
                          l.jsxs("div", {
                            className:
                              "flex items-center justify-between bg-sunken/50 px-5 py-2 text-[0.85rem] font-medium text-muted",
                            children: [
                              l.jsx("span", {
                                children: y === c ? "Today" : ze(y),
                              }),
                              l.jsx("span", {
                                className: "num",
                                children: ie(
                                  k
                                    .filter(
                                      (N) =>
                                        N.amount < 0 &&
                                        N.category !== "transfer",
                                    )
                                    .reduce((N, C) => N - C.amount, 0),
                                ),
                              }),
                            ],
                          }),
                          l.jsx("ul", {
                            children: k.map((N) =>
                              l.jsxs(
                                "li",
                                {
                                  className:
                                    "flex items-center gap-3 px-5 py-3",
                                  children: [
                                    l.jsx(Ys, { id: N.category, size: 16 }),
                                    l.jsxs("div", {
                                      className: "min-w-0 flex-1",
                                      children: [
                                        l.jsxs("p", {
                                          className:
                                            "flex items-center gap-2 truncate font-medium leading-tight",
                                          children: [
                                            l.jsx("span", {
                                              className: "truncate",
                                              children: N.merchant,
                                            }),
                                            N.approx &&
                                              l.jsx("span", {
                                                className:
                                                  "chip shrink-0 bg-marigold-soft px-2 py-0.5 text-[0.7rem] text-marigold",
                                                children: "estimate",
                                              }),
                                          ],
                                        }),
                                        l.jsxs("p", {
                                          className:
                                            "truncate text-[0.78rem] text-faint",
                                          children: [
                                            N.source === "chat"
                                              ? "You told BudgetWise"
                                              : N.source === "checkin"
                                                ? "Daily check-in"
                                                : N.description,
                                            N.source === "chat" &&
                                              ` · ${N.payment_method === "available_money" ? "Available money" : N.payment_method === "credit_card" ? "Credit card" : "Separate money"}`,
                                          ],
                                        }),
                                      ],
                                    }),
                                    l.jsx("div", {
                                      className: "hidden sm:block",
                                      children: l.jsx(r5, { t: N }),
                                    }),
                                    l.jsx(i5, { t: N }),
                                    l.jsxs("p", {
                                      className: ke(
                                        "num w-24 text-right font-semibold",
                                        N.amount > 0 && "text-forest",
                                      ),
                                      children: [
                                        N.amount > 0 ? "+" : "−",
                                        ie(Math.abs(N.amount)),
                                      ],
                                    }),
                                  ],
                                },
                                N.id,
                              ),
                            ),
                          }),
                        ],
                      },
                      y,
                    ),
                  ),
                }),
        ],
      }),
    ],
  });
}
const s5 = {
  Guardrail: { icon: D1, role: "Safety check" },
  Router: { icon: p_, role: "Router" },
  Analyst: { icon: n_, role: "Analyst agent" },
  Planner: { icon: Mo, role: "Planner agent" },
  Critic: { icon: P1, role: "Critic agent" },
  Knowledge: { icon: JP, role: "Guide library" },
  "Money engine": { icon: e_, role: "Money engine" },
  Grounding: { icon: O1, role: "Number check" },
};
function a5({ status: e }) {
  return e === "running"
    ? l.jsx(zr, { size: 14, className: "animate-spin text-forest" })
    : e === "error" || e === "fail" || e === "blocked"
      ? l.jsx($o, { size: 14, className: "text-berry" })
      : e === "revise" || e === "retry"
        ? l.jsx(b_, { size: 14, className: "text-marigold" })
        : l.jsx(Jt, { size: 14, className: "text-forest" });
}
function l5({ items: e, className: t = "" }) {
  return e.length
    ? l.jsx("ol", {
        className: ke("relative space-y-2 border-l-2 border-line pl-4", t),
        children: e.map((n) => {
          const r =
              n.kind === "tool"
                ? { icon: M_, role: `${n.who} used a tool` }
                : (s5[n.who] ?? { icon: N_, role: n.who }),
            i = r.icon;
          return l.jsxs(
            "li",
            {
              className: "relative animate-rise",
              children: [
                l.jsx("span", {
                  className: ke(
                    "absolute -left-[27px] top-0.5 grid h-5 w-5 place-items-center rounded-full border-2 bg-surface",
                    n.status === "running" ? "border-forest" : "border-line",
                  ),
                  children: l.jsx(a5, { status: n.status }),
                }),
                l.jsxs("div", {
                  className: "flex items-start gap-2 text-[0.85rem]",
                  children: [
                    l.jsx(i, {
                      size: 15,
                      className: "mt-[3px] shrink-0 text-muted",
                    }),
                    l.jsxs("p", {
                      className: "leading-snug",
                      children: [
                        l.jsx("span", {
                          className: "font-semibold text-ink",
                          children: r.role,
                        }),
                        l.jsx("span", {
                          className: "num text-muted",
                          children: n.label ? `: ${n.label}` : "",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            },
            n.key,
          );
        }),
      })
    : null;
}
function ql({ label: e, value: t, limit: n, note: r }) {
  const i = n > 0 ? Math.min(100, (t / n) * 100) : 100,
    o = t > n;
  return l.jsxs("div", {
    children: [
      l.jsxs("div", {
        className:
          "num flex items-baseline justify-between gap-2 text-[0.92rem]",
        children: [
          l.jsx("span", { className: "font-medium", children: e }),
          l.jsxs("span", {
            children: [
              l.jsx("span", {
                className: ke("font-semibold", o ? "text-berry" : "text-ink"),
                children: ie(t),
              }),
              " ",
              l.jsxs("span", {
                className: "text-muted",
                children: ["of ", ie(n)],
              }),
            ],
          }),
        ],
      }),
      l.jsx("div", {
        className: "mt-1.5 h-2.5 overflow-hidden rounded-full bg-sunken",
        children: l.jsx("div", {
          className: ke("h-full rounded-full", o ? "bg-berry" : "bg-forest"),
          style: { width: `${i}%` },
        }),
      }),
      r &&
        l.jsx("p", { className: "mt-1 text-[0.8rem] text-muted", children: r }),
    ],
  });
}
function u5({ lp: e }) {
  return l.jsxs(Cr, {
    title: "How last week went",
    aside: `Week of ${ze(e.week_start)}`,
    children: [
      l.jsxs("div", {
        className: "flex items-start gap-3",
        children: [
          l.jsx("span", {
            className: ke(
              "grid h-9 w-9 shrink-0 place-items-center rounded-xl",
              e.stuck_to_plan
                ? "bg-forest-soft text-forest"
                : "bg-marigold-soft text-marigold",
            ),
            children: e.stuck_to_plan
              ? l.jsx(Jt, { size: 18 })
              : l.jsx($o, { size: 18 }),
          }),
          l.jsx("p", {
            className: "num",
            children: e.stuck_to_plan
              ? "You stuck to the plan. Nice work."
              : "The plan slipped a bit, which is normal. This week's plan takes it into account.",
          }),
        ],
      }),
      l.jsxs("div", {
        className: "mt-5 space-y-4",
        children: [
          l.jsx(ql, {
            label: "Average spending per day",
            value: e.actual_daily_average,
            limit: e.daily_limit,
          }),
          l.jsx(ql, {
            label: `${bt(e.focus_category).label} for the week`,
            value: e.actual_focus_spent,
            limit: e.focus_category_cap,
          }),
        ],
      }),
    ],
  });
}
function c5({ s: e }) {
  const t = e.goal;
  return l.jsxs("section", {
    className: "rounded-3xl border border-line bg-surface p-5 shadow-sm",
    children: [
      l.jsxs("div", {
        className: "flex items-center justify-between gap-3",
        children: [
          l.jsxs("div", {
            className: "flex items-center gap-2 text-forest",
            children: [
              l.jsx(Bo, { size: 19 }),
              l.jsx("h2", { className: "font-bold", children: "Savings goal" }),
            ],
          }),
          l.jsx(It, {
            to: "/accounts#goals",
            className: "text-sm font-semibold text-forest underline",
            children: "Edit",
          }),
        ],
      }),
      t
        ? l.jsxs(l.Fragment, {
            children: [
              l.jsxs("div", {
                className:
                  "mt-4 flex flex-wrap items-end justify-between gap-3",
                children: [
                  l.jsxs("div", {
                    children: [
                      l.jsx("p", {
                        className: "text-sm text-muted",
                        children: t.name,
                      }),
                      l.jsxs("p", {
                        className:
                          "num font-display text-[1.8rem] font-bold text-forest",
                        children: [
                          t.saved_known ? ie(t.saved, !0) : "—",
                          " ",
                          l.jsxs("span", {
                            className: "text-base text-ink",
                            children: ["of ", ie(t.target, !0)],
                          }),
                        ],
                      }),
                    ],
                  }),
                  l.jsxs("div", {
                    className: "text-right",
                    children: [
                      l.jsxs("p", {
                        className: "num font-semibold",
                        children: [ie(t.needed_per_week), " / week"],
                      }),
                      l.jsxs("p", {
                        className: "text-xs text-muted",
                        children: ["until ", ze(t.deadline)],
                      }),
                    ],
                  }),
                ],
              }),
              l.jsx("div", {
                className: "mt-3 h-2 overflow-hidden rounded-full bg-sunken",
                children: l.jsx("div", {
                  className: "h-full rounded-full bg-forest",
                  style: {
                    width: `${t.saved_known ? Math.min(t.percent, 100) : 0}%`,
                  },
                }),
              }),
              l.jsx("p", {
                className: "mt-3 text-xs leading-relaxed text-muted",
                children:
                  t.plan_level === "personalized"
                    ? t.fits
                      ? "This pace fits the information you’ve shared."
                      : "This pace needs adjustment based on the information you’ve shared."
                    : "This is a starting pace. It becomes more realistic as you add income, bills, and spending.",
              }),
            ],
          })
        : l.jsxs(l.Fragment, {
            children: [
              l.jsx("p", {
                className: "mt-4 font-semibold",
                children: "No savings goal yet",
              }),
              l.jsx("p", {
                className: "mt-1 text-sm text-muted",
                children:
                  "A goal is optional, but it gives each weekly plan a clear destination.",
              }),
              l.jsx(It, {
                to: "/",
                className: "btn-primary mt-4 text-sm",
                children: "Set a goal on Home",
              }),
            ],
          }),
    ],
  });
}
function d5({ s: e }) {
  const t = e.upcoming_bills.slice(0, 3),
    n = e.upcoming_bills.reduce((r, i) => r + i.amount, 0);
  return l.jsxs("section", {
    className: "rounded-3xl border border-line bg-surface p-5 shadow-sm",
    children: [
      l.jsxs("div", {
        className: "flex items-center gap-2 text-forest",
        children: [
          l.jsx(A1, { size: 19 }),
          l.jsx("h2", { className: "font-bold", children: "Coming up" }),
        ],
      }),
      l.jsxs("div", {
        className: "mt-4 grid grid-cols-2 gap-2",
        children: [
          l.jsxs("div", {
            className: "rounded-xl bg-sunken/65 p-3",
            children: [
              l.jsx("p", {
                className: "text-xs text-muted",
                children: "Upcoming bills",
              }),
              l.jsx("p", {
                className: "num mt-0.5 font-bold",
                children: ie(n),
              }),
            ],
          }),
          l.jsxs("div", {
            className: "rounded-xl bg-sunken/65 p-3",
            children: [
              l.jsx("p", {
                className: "text-xs text-muted",
                children: "Next payday",
              }),
              l.jsx("p", {
                className: "mt-0.5 font-bold",
                children: e.readiness.payday_known
                  ? ze(e.next_payday)
                  : "Not added",
              }),
            ],
          }),
        ],
      }),
      t.length
        ? l.jsx("ul", {
            className: "mt-3 divide-y divide-line",
            children: t.map((r) =>
              l.jsxs(
                "li",
                {
                  className:
                    "flex items-center justify-between gap-4 py-2 text-sm",
                  children: [
                    l.jsxs("span", {
                      className: "min-w-0 truncate",
                      children: [
                        r.name,
                        l.jsx("span", {
                          className: "ml-2 text-xs text-muted",
                          children: ze(r.next_due),
                        }),
                      ],
                    }),
                    l.jsx("strong", {
                      className: "num shrink-0",
                      children: ie(r.amount),
                    }),
                  ],
                },
                `${r.name}-${r.next_due}`,
              ),
            ),
          })
        : l.jsx("p", {
            className: "mt-3 text-sm text-muted",
            children: "No upcoming bills recorded yet.",
          }),
    ],
  });
}
function f5() {
  const e = lt(),
    [t, n] = Bv(),
    { data: r, isLoading: i } = Ge({ queryKey: ["plans"], queryFn: de.plans }),
    { data: o } = Ge({ queryKey: ["snapshot"], queryFn: de.snapshot }),
    { data: s } = Ge({
      queryKey: ["draftPlan"],
      queryFn: () => null,
      staleTime: 1 / 0,
      initialData: null,
    }),
    [a, u] = w.useState([]),
    [c, d] = w.useState(!1),
    [f, h] = w.useState(null),
    p = w.useRef(!1),
    v = w.useRef(null),
    g = async () => {
      (d(!0),
        u([]),
        h(null),
        e.setQueryData(["draftPlan"], null),
        window.requestAnimationFrame(() => {
          var y;
          return (y = v.current) == null
            ? void 0
            : y.scrollIntoView({ behavior: "smooth", block: "start" });
        }));
      try {
        await Fp("/api/plan/generate", {}, (y) => {
          y.type === "plan"
            ? e.setQueryData(["draftPlan"], y.plan)
            : y.type === "done"
              ? h(y.elapsed)
              : y.type === "error"
                ? We.error(y.message)
                : u((k) => z1(k, y));
        });
      } catch (y) {
        We.error(`Couldn't build a plan: ${y.message}`);
      } finally {
        d(!1);
      }
    };
  w.useEffect(() => {
    t.get("new") &&
      !p.current &&
      o != null &&
      o.readiness.ready &&
      ((p.current = !0), n({}, { replace: !0 }), g());
  }, [o]);
  const b = async () => {
      s &&
        (await de.acceptPlan(s),
        e.setQueryData(["draftPlan"], null),
        await e.invalidateQueries({ queryKey: ["plans"] }),
        await e.invalidateQueries({ queryKey: ["snapshot"] }),
        We.success("Plan started. BudgetWise will check in on it next week."));
    },
    m = r == null ? void 0 : r.current,
    x = r == null ? void 0 : r.progress;
  return l.jsxs("div", {
    className: "space-y-5",
    children: [
      l.jsx("div", {
        className: "flex flex-wrap items-end justify-between gap-4",
        children: l.jsxs("div", {
          children: [
            l.jsx("p", {
              className:
                "text-xs font-bold uppercase tracking-[0.14em] text-forest/75",
              children: "Your next seven days",
            }),
            l.jsx("h1", {
              className: "mt-1 text-[2rem] font-bold leading-tight",
              children: "Weekly plan",
            }),
            l.jsx("p", {
              className: "mt-1 max-w-2xl text-muted",
              children:
                "A practical spending and saving plan built from what you’ve shared.",
            }),
          ],
        }),
      }),
      l.jsxs("div", {
        ref: v,
        className: "scroll-mt-24",
        children: [
          c &&
            !s &&
            l.jsxs("section", {
              className:
                "rounded-3xl border border-forest/20 bg-surface p-6 shadow-sm",
              children: [
                l.jsxs("div", {
                  className: "flex items-center gap-3",
                  children: [
                    l.jsx("span", {
                      className:
                        "grid h-10 w-10 place-items-center rounded-xl bg-forest-soft text-forest",
                      children: l.jsx(xc, {
                        size: 19,
                        className: "animate-spin",
                      }),
                    }),
                    l.jsxs("div", {
                      children: [
                        l.jsx("h2", {
                          className: "font-bold",
                          children: "Building your weekly plan",
                        }),
                        l.jsx("p", {
                          className: "text-sm text-muted",
                          children:
                            "Checking your goal, spending, income, and upcoming commitments.",
                        }),
                      ],
                    }),
                  ],
                }),
                l.jsxs("div", {
                  className: "mt-5 grid gap-3 sm:grid-cols-3",
                  children: [
                    l.jsx(ks, { className: "h-20" }),
                    l.jsx(ks, { className: "h-20" }),
                    l.jsx(ks, { className: "h-20" }),
                  ],
                }),
              ],
            }),
          s &&
            l.jsxs("div", {
              className: "space-y-3 animate-rise",
              children: [
                l.jsx(mf, { p: s }),
                l.jsxs("div", {
                  className: "flex flex-wrap gap-2",
                  children: [
                    l.jsxs("button", {
                      onClick: b,
                      className: "btn-primary",
                      children: [l.jsx(Jt, { size: 18 }), " Start this plan"],
                    }),
                    l.jsxs("button", {
                      onClick: g,
                      disabled: c,
                      className: "btn-ghost",
                      children: [
                        l.jsx(xc, { size: 16 }),
                        " Try a different plan",
                      ],
                    }),
                  ],
                }),
              ],
            }),
          !s &&
            !c &&
            m &&
            l.jsxs("div", {
              className: "space-y-4",
              children: [
                l.jsx(mf, { p: m }),
                l.jsxs("button", {
                  onClick: g,
                  className: "btn-quiet",
                  children: [l.jsx(xc, { size: 16 }), " Make a new plan"],
                }),
                x &&
                  l.jsx(Cr, {
                    title: "Progress this week",
                    aside: `Day ${Math.min(x.days_in, 7)} of 7`,
                    children: l.jsxs("div", {
                      className: "grid gap-5 md:grid-cols-2",
                      children: [
                        l.jsx(ql, {
                          label: "Everyday spending",
                          value: x.flexible_spent,
                          limit: x.allowance_so_far,
                          note: `Your limit so far is ${ie(m.daily_limit)} × ${Math.min(x.days_in, 7)} days.`,
                        }),
                        l.jsx(ql, {
                          label: `${bt(m.focus_category).label} this week`,
                          value: x.focus_spent,
                          limit: x.focus_cap,
                        }),
                      ],
                    }),
                  }),
              ],
            }),
          !s &&
            !c &&
            !m &&
            !i &&
            (o == null ? void 0 : o.readiness.ready) &&
            l.jsx("section", {
              className:
                "rounded-3xl border border-forest/20 bg-gradient-to-r from-forest-soft/70 to-surface p-6 shadow-sm",
              children: l.jsxs("div", {
                className:
                  "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
                children: [
                  l.jsxs("div", {
                    children: [
                      l.jsx("h2", {
                        className: "text-xl font-bold",
                        children: "Turn your information into a weekly plan",
                      }),
                      l.jsx("p", {
                        className: "mt-1 max-w-2xl text-sm text-muted",
                        children:
                          "Get a daily spending target, one category to watch, and an amount to put toward your goal.",
                      }),
                    ],
                  }),
                  l.jsxs("button", {
                    onClick: g,
                    className: "btn-primary shrink-0",
                    children: [
                      l.jsx(Mo, { size: 18 }),
                      " Make this week’s plan",
                    ],
                  }),
                ],
              }),
            }),
        ],
      }),
      o &&
        !o.readiness.ready &&
        l.jsxs("div", {
          className:
            "rounded-2xl border border-forest/15 bg-forest-soft/55 p-4",
          children: [
            l.jsx("h2", {
              className: "font-bold",
              children: "A plan needs a little more context",
            }),
            l.jsxs("p", {
              className: "mt-1 text-sm text-muted",
              children: [
                "Add ",
                o.readiness.missing.join(", "),
                " when you’re comfortable. Your savings-goal pace is still available below.",
              ],
            }),
            l.jsx(It, {
              to: "/",
              className:
                "mt-2 inline-block text-sm font-semibold text-forest underline",
              children: "Continue on Home",
            }),
          ],
        }),
      o &&
        l.jsxs("div", {
          className: "grid gap-4 md:grid-cols-2",
          children: [l.jsx(c5, { s: o }), l.jsx(d5, { s: o })],
        }),
      ((r == null ? void 0 : r.last_week) || (r && r.history.length > 0)) &&
        l.jsxs("div", {
          className: "grid gap-4 lg:grid-cols-2",
          children: [
            (r == null ? void 0 : r.last_week) &&
              l.jsx(u5, { lp: r.last_week }),
            r &&
              r.history.length > 0 &&
              l.jsx(Cr, {
                title: "Past plans",
                children: l.jsx("ul", {
                  className: "divide-y divide-line",
                  children: r.history.slice(0, 4).map((y) =>
                    l.jsxs(
                      "li",
                      {
                        className:
                          "num flex items-center justify-between gap-3 py-2.5 text-[0.9rem]",
                        children: [
                          l.jsxs("span", {
                            children: ["Week of ", ze(y.week_start)],
                          }),
                          l.jsxs("span", {
                            className: "text-right text-muted",
                            children: [
                              ie(y.daily_limit),
                              "/day · ",
                              bt(y.focus_category).label,
                              " cap ",
                              ie(y.focus_category_cap, !0),
                            ],
                          }),
                        ],
                      },
                      y.week_start,
                    ),
                  ),
                }),
              }),
          ],
        }),
      (c || a.length > 0) &&
        l.jsxs("details", {
          className: "group rounded-2xl border border-line bg-surface",
          children: [
            l.jsxs("summary", {
              className:
                "flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4",
              children: [
                l.jsxs("span", {
                  className: "flex items-center gap-2 font-semibold",
                  children: [
                    l.jsx(r_, {
                      size: 18,
                      className: "transition-transform group-open:rotate-180",
                    }),
                    " How this plan was created",
                  ],
                }),
                l.jsx("span", {
                  className: "text-sm text-muted",
                  children:
                    f !== null
                      ? `${f.toFixed(1)}s`
                      : c
                        ? "Working…"
                        : "Agent details",
                }),
              ],
            }),
            l.jsx("div", {
              className: "border-t border-line px-5 py-4",
              children: l.jsx(l5, { items: a }),
            }),
          ],
        }),
    ],
  });
}
function p5() {
  const e = lt(),
    { data: t } = Ge({ queryKey: ["accounts"], queryFn: de.accounts }),
    n = t == null ? void 0 : t.accounts.find((j) => j.id === t.active),
    r = (n == null ? void 0 : n.kind) === "personal",
    [i, o] = w.useState("active"),
    s = Jn(),
    { reset: a } = Pi(),
    u = w.useRef(null),
    [c, d] = w.useState(!1),
    [f, h] = w.useState(null),
    [p, v] = w.useState("My checking"),
    [g, b] = w.useState(""),
    [m, x] = w.useState("idle"),
    [y, k] = w.useState(null),
    N = async (j) => {
      x("reading");
      try {
        const P = await de.importPreview(j);
        (h(P), b(P.balance !== null ? String(P.balance) : ""), x("ready"));
      } catch (P) {
        (We.error(P.message), x("idle"));
      }
    },
    C = async () => {
      if (!f) return;
      const j = Number(g.replace(/[$,]/g, ""));
      if (!g.trim() || Number.isNaN(j)) {
        We.error(
          "Enter your current balance so BudgetWise can work out what's safe to spend.",
        );
        return;
      }
      x("importing");
      try {
        const P = await de.importCommit(
          f.token,
          p.trim() || "My checking",
          j,
          r ? i : "new",
        );
        (k(P), x("done"), a(), await e.invalidateQueries());
      } catch (P) {
        (We.error(P.message), x("ready"));
      }
    };
  if (m === "done" && y) {
    const j = y.how_categorized;
    return l.jsxs("div", {
      className: "space-y-4 animate-rise",
      children: [
        l.jsxs("div", {
          className: "flex items-center gap-3",
          children: [
            l.jsx("span", {
              className:
                "grid h-10 w-10 place-items-center rounded-xl bg-forest-soft text-forest",
              children: l.jsx(Jt, { size: 20 }),
            }),
            l.jsxs("p", {
              className: "font-display text-[1.2rem] font-bold",
              children: [
                "Imported ",
                y.transactions,
                " transactions in ",
                y.seconds,
                "s",
              ],
            }),
          ],
        }),
        l.jsxs("ul", {
          className: "num space-y-1 text-[0.93rem] text-muted",
          children: [
            y.duplicates_skipped > 0 &&
              l.jsxs("li", {
                children: [
                  l.jsx("span", {
                    className: "font-semibold text-ink",
                    children: y.duplicates_skipped,
                  }),
                  " were already saved from an earlier file, so they were skipped",
                ],
              }),
            y.estimates_replaced > 0 &&
              l.jsxs("li", {
                children: [
                  l.jsx("span", {
                    className: "font-semibold text-ink",
                    children: y.estimates_replaced,
                  }),
                  " estimates you logged were replaced by exact bank rows",
                ],
              }),
            l.jsxs("li", {
              children: [
                l.jsx("span", {
                  className: "font-semibold text-ink",
                  children: j.rules,
                }),
                " sorted instantly by store-name rules",
              ],
            }),
            j.memory > 0 &&
              l.jsxs("li", {
                children: [
                  l.jsx("span", {
                    className: "font-semibold text-ink",
                    children: j.memory,
                  }),
                  " sorted from stores you've corrected before",
                ],
              }),
            l.jsxs("li", {
              children: [
                l.jsx("span", {
                  className: "font-semibold text-ink",
                  children: j.ai,
                }),
                " sorted by the Categorizer agent (",
                y.merchants_sent_to_ai,
                " store names sent, nothing else)",
              ],
            }),
            j.unknown > 0 &&
              l.jsxs("li", {
                children: [
                  l.jsx("span", {
                    className: "font-semibold text-ink",
                    children: j.unknown,
                  }),
                  " left as Other. You can fix them on the Spending page.",
                ],
              }),
          ],
        }),
        l.jsxs("div", {
          className: "flex flex-wrap gap-2",
          children: [
            l.jsx("button", {
              className: "btn-primary",
              onClick: () => s("/"),
              children: "See my numbers",
            }),
            l.jsx("button", {
              className: "btn-ghost",
              onClick: () => {
                (x("idle"), h(null), k(null));
              },
              children: "Upload another file",
            }),
          ],
        }),
      ],
    });
  }
  if ((m === "ready" || m === "importing") && f) {
    const j = f.detected;
    return l.jsxs("div", {
      className: "space-y-5 animate-rise",
      children: [
        l.jsxs("div", {
          className: "flex items-start gap-3",
          children: [
            l.jsx(d_, { className: "mt-0.5 text-forest", size: 22 }),
            l.jsxs("div", {
              children: [
                l.jsxs("p", {
                  className: "font-semibold",
                  children: [
                    j.rows,
                    " transactions from ",
                    ze(String(j.first_date)),
                    " to ",
                    ze(String(j.last_date)),
                  ],
                }),
                l.jsxs("p", {
                  className: "text-[0.88rem] text-muted",
                  children: [
                    "Found columns: date “",
                    String(j.date),
                    "”, description “",
                    String(j.description),
                    "”, amount “",
                    String(j.amount),
                    "”",
                    j.balance ? `, balance “${j.balance}”` : "",
                    ".",
                    Number(j.skipped) > 0 &&
                      ` Skipped ${j.skipped} rows that weren't transactions.`,
                  ],
                }),
              ],
            }),
          ],
        }),
        l.jsx("div", {
          className: "overflow-x-auto rounded-xl border border-line",
          children: l.jsx("table", {
            className: "num w-full text-[0.85rem]",
            children: l.jsx("tbody", {
              className: "divide-y divide-line",
              children: f.sample.map((P, T) =>
                l.jsxs(
                  "tr",
                  {
                    children: [
                      l.jsx("td", {
                        className: "whitespace-nowrap px-3 py-2 text-muted",
                        children: ze(P.date),
                      }),
                      l.jsx("td", {
                        className: "px-3 py-2",
                        children: P.description,
                      }),
                      l.jsx("td", {
                        className: ke(
                          "whitespace-nowrap px-3 py-2 text-right font-semibold",
                          P.amount > 0 && "text-forest",
                        ),
                        children: ie(P.amount),
                      }),
                    ],
                  },
                  T,
                ),
              ),
            }),
          }),
        }),
        r &&
          l.jsx("div", {
            className: "flex flex-wrap gap-2",
            role: "radiogroup",
            "aria-label": "Where to add this file",
            children: [
              ["active", `Add to ${n == null ? void 0 : n.name}`],
              ["new", "Make a new account"],
            ].map(([P, T]) =>
              l.jsxs(
                "button",
                {
                  role: "radio",
                  "aria-checked": i === P,
                  onClick: () => o(P),
                  className: ke(
                    "chip border px-3.5 py-1.5 text-[0.9rem]",
                    i === P
                      ? "border-forest bg-forest-soft text-forest"
                      : "border-line text-muted",
                  ),
                  children: [i === P && l.jsx(Jt, { size: 14 }), T],
                },
                P,
              ),
            ),
          }),
        l.jsxs("div", {
          className: "grid gap-4 sm:grid-cols-2",
          children: [
            (!r || i === "new") &&
              l.jsxs("label", {
                className: "block",
                children: [
                  l.jsx("span", {
                    className: "mb-1.5 block text-[0.9rem] font-medium",
                    children: "Name this account",
                  }),
                  l.jsx("input", {
                    className: "field",
                    value: p,
                    onChange: (P) => v(P.target.value),
                    maxLength: 40,
                  }),
                ],
              }),
            l.jsxs("label", {
              className: "block",
              children: [
                l.jsx("span", {
                  className: "mb-1.5 block text-[0.9rem] font-medium",
                  children: "Available money right now",
                }),
                l.jsx("input", {
                  className: "field num",
                  inputMode: "decimal",
                  value: g,
                  onChange: (P) => b(P.target.value),
                  placeholder: "e.g. 842.17",
                }),
                l.jsx("span", {
                  className: "mt-1 block text-[0.8rem] text-muted",
                  children:
                    f.balance !== null
                      ? "Taken from your file. Change it if it's different today."
                      : "Check your banking app and type it in.",
                }),
              ],
            }),
          ],
        }),
        l.jsxs("div", {
          className: "flex flex-wrap gap-2",
          children: [
            l.jsx("button", {
              className: "btn-primary",
              onClick: C,
              disabled: m === "importing",
              children:
                m === "importing"
                  ? l.jsxs(l.Fragment, {
                      children: [
                        l.jsx(zr, { size: 18, className: "animate-spin" }),
                        " Sorting your transactions",
                      ],
                    })
                  : "Import and sort transactions",
            }),
            l.jsx("button", {
              className: "btn-ghost",
              onClick: () => {
                (x("idle"), h(null));
              },
              disabled: m === "importing",
              children: "Choose a different file",
            }),
          ],
        }),
      ],
    });
  }
  return l.jsxs("div", {
    className: "space-y-4",
    children: [
      l.jsxs("button", {
        onClick: () => {
          var j;
          return (j = u.current) == null ? void 0 : j.click();
        },
        onDragOver: (j) => {
          (j.preventDefault(), d(!0));
        },
        onDragLeave: () => d(!1),
        onDrop: (j) => {
          (j.preventDefault(), d(!1));
          const P = j.dataTransfer.files[0];
          P && N(P);
        },
        className: ke(
          "flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-line px-6 py-10 text-center hover:border-forest/50",
          c && "border-forest bg-forest-soft/40",
        ),
        children: [
          m === "reading"
            ? l.jsx(zr, { size: 30, className: "animate-spin text-forest" })
            : l.jsx(a_, { size: 30, className: "text-forest" }),
          l.jsx("span", {
            className: "font-display text-[1.15rem] font-bold",
            children:
              m === "reading"
                ? "Reading your file"
                : "Drop your bank's CSV here, or click to choose it",
          }),
          l.jsx("span", {
            className: "max-w-md text-[0.88rem] text-muted",
            children:
              "Works with exports from Chase, Bank of America, Capital One, Wells Fargo and most other banks. Two or three months works best.",
          }),
        ],
      }),
      l.jsx("input", {
        ref: u,
        type: "file",
        accept: ".csv,text/csv",
        className: "hidden",
        onChange: (j) => {
          var T;
          const P = (T = j.target.files) == null ? void 0 : T[0];
          (P && N(P), (j.target.value = ""));
        },
      }),
      l.jsxs("div", {
        className:
          "flex flex-wrap items-center justify-between gap-3 text-[0.85rem] text-muted",
        children: [
          l.jsxs("span", {
            className: "flex items-center gap-2",
            children: [
              l.jsx(y_, { size: 15 }),
              " Your file stays on this computer. Account numbers are masked, and only unknown store names are sent to the AI.",
            ],
          }),
          l.jsxs("a", {
            href: "/api/sample-csv",
            className:
              "inline-flex items-center gap-1.5 font-medium text-forest hover:underline",
            children: [l.jsx(c_, { size: 15 }), " Sample file to try"],
          }),
        ],
      }),
    ],
  });
}
function h5() {
  const e = lt(),
    t = Jn(),
    { data: n } = Ge({ queryKey: ["snapshot"], queryFn: de.snapshot }),
    { data: r } = Ge({ queryKey: ["settings"], queryFn: de.settings }),
    { data: i } = Ge({
      queryKey: ["development-logs"],
      queryFn: de.developmentLogs,
    }),
    [o, s] = w.useState(!1),
    [a, u] = w.useState({});
  w.useEffect(() => {
    if (!r) return;
    const g = r.goal ?? {};
    u({
      balance:
        r.current_balance != null ? Number(r.current_balance).toFixed(2) : "",
      buffer:
        r.savings_buffer != null ? Number(r.savings_buffer).toFixed(2) : "",
      payday: String(r.next_payday ?? ""),
      goalName: String(g.name ?? ""),
      goalTarget: String(g.target ?? ""),
      goalSaved: String(g.saved ?? ""),
      goalDeadline: String(g.deadline ?? ""),
      useCase: String(r.use_case ?? ""),
    });
  }, [r]);
  const c = (g) => (b) => u((m) => ({ ...m, [g]: b.target.value })),
    d = async (g) => {
      (await de.deleteSchedule(g),
        await e.invalidateQueries(),
        We.success("Removed"));
    },
    f = async () => {
      const g = { use_case: a.useCase.trim() };
      (a.balance.trim() && (g.current_balance = Number(a.balance)),
        a.buffer.trim() && (g.savings_buffer = Number(a.buffer)),
        a.payday ? (g.next_payday = a.payday) : (g.clear_payday = !0),
        a.goalName &&
          a.goalTarget &&
          a.goalDeadline &&
          (g.goal = {
            name: a.goalName,
            target: Number(a.goalTarget),
            saved: Number(a.goalSaved || 0),
            deadline: a.goalDeadline,
          }));
      try {
        (await de.saveSettings(g),
          await e.invalidateQueries(),
          We.success("Saved. Your numbers are updated."));
      } catch (b) {
        We.error(b.message);
      }
    },
    h = async () => {
      s(!0);
      try {
        const g = await de.archiveDevelopmentLogs();
        (await e.invalidateQueries({ queryKey: ["development-logs"] }),
          g.archived
            ? We.success(
                `Archived ${g.archived.turns} conversation turns to ${g.archived.filename}`,
              )
            : We.info("There are no active conversation logs to archive yet."));
      } catch (g) {
        We.error(g.message);
      } finally {
        s(!1);
      }
    },
    p = async () => {
      (await de.saveSettings({ welcome_seen: !1 }),
        await e.invalidateQueries({ queryKey: ["conversation"] }),
        t("/"));
    },
    v = (r == null ? void 0 : r.schedules) ?? [];
  return l.jsxs("div", {
    className: "space-y-5",
    children: [
      (n == null ? void 0 : n.account.kind) === "personal" &&
        l.jsxs("div", {
          className:
            "flex flex-col gap-3 rounded-2xl border border-line bg-sunken/45 p-4 sm:flex-row sm:items-center sm:justify-between",
          children: [
            l.jsxs("div", {
              className: "flex gap-3",
              children: [
                l.jsx(ua, {
                  className: "mt-0.5 shrink-0 text-forest",
                  size: 20,
                }),
                l.jsxs("div", {
                  children: [
                    l.jsx("p", {
                      className: "font-semibold",
                      children: "BudgetWise introduction",
                    }),
                    l.jsx("p", {
                      className: "mt-0.5 text-[0.84rem] text-muted",
                      children:
                        "Review the two short screens explaining goals, natural-language tracking, imports, and privacy choices.",
                    }),
                  ],
                }),
              ],
            }),
            l.jsx("button", {
              className: "btn-ghost shrink-0 text-sm",
              onClick: () => void p(),
              children: "Replay introduction",
            }),
          ],
        }),
      l.jsxs("label", {
        className: "block",
        children: [
          l.jsx("span", {
            className: "mb-1.5 block text-[0.9rem] font-medium",
            children: "What should BudgetWise help you with?",
          }),
          l.jsx("input", {
            className: "field",
            value: a.useCase ?? "",
            onChange: c("useCase"),
            placeholder: "For example: help me cut back on eating out",
          }),
          l.jsx("span", {
            className: "mt-1 block text-[0.8rem] text-muted",
            children:
              "Optional. You can change this as your priorities change.",
          }),
        ],
      }),
      v.length > 0 &&
        l.jsxs("div", {
          children: [
            l.jsx("p", {
              className: "mb-2 font-medium",
              children: "Bills and pay you told BudgetWise",
            }),
            l.jsx("ul", {
              className: "divide-y divide-line rounded-2xl border border-line",
              children: v.map((g) =>
                l.jsxs(
                  "li",
                  {
                    className: "flex items-center gap-3 px-4 py-2.5",
                    children: [
                      l.jsx(Ys, {
                        id:
                          g.kind === "income"
                            ? "income"
                            : (g.category ?? "other"),
                        size: 14,
                      }),
                      l.jsxs("span", {
                        className: "num min-w-0 flex-1 text-[0.93rem]",
                        children: [
                          l.jsx("span", {
                            className: "font-medium",
                            children:
                              g.kind === "income" ? "Pay schedule" : g.name,
                          }),
                          l.jsxs("span", {
                            className: "text-muted",
                            children: [": ", Xw(g)],
                          }),
                        ],
                      }),
                      l.jsx("button", {
                        onClick: () => d(g.id),
                        className:
                          "rounded-lg p-1.5 text-faint hover:bg-sunken hover:text-berry",
                        "aria-label": `Remove ${g.name}`,
                        children: l.jsx($o, { size: 15 }),
                      }),
                    ],
                  },
                  g.id,
                ),
              ),
            }),
            l.jsx("p", {
              className: "mt-1.5 text-[0.82rem] text-muted",
              children:
                "To change one, just tell BudgetWise, e.g. “rent is $750 now”.",
            }),
          ],
        }),
      l.jsxs("div", {
        className: "grid gap-4 sm:grid-cols-3",
        children: [
          l.jsxs("label", {
            children: [
              l.jsx("span", {
                className: "mb-1.5 block text-[0.9rem] font-medium",
                children: "Available money",
              }),
              l.jsx("input", {
                className: "field num",
                inputMode: "decimal",
                value: a.balance ?? "",
                onChange: c("balance"),
              }),
              l.jsx("span", {
                className: "mt-1 block text-[0.8rem] text-muted",
                children: "The checking or cash pool you want this plan to use",
              }),
            ],
          }),
          l.jsxs("label", {
            children: [
              l.jsx("span", {
                className: "mb-1.5 block text-[0.9rem] font-medium",
                children: "Cushion to keep",
              }),
              l.jsx("input", {
                className: "field num",
                inputMode: "decimal",
                value: a.buffer ?? "",
                onChange: c("buffer"),
              }),
              l.jsx("span", {
                className: "mt-1 block text-[0.8rem] text-muted",
                children: "Never counted as spendable",
              }),
            ],
          }),
          l.jsxs("label", {
            children: [
              l.jsx("span", {
                className: "mb-1.5 block text-[0.9rem] font-medium",
                children: "Next payday",
              }),
              l.jsx("input", {
                className: "field",
                type: "date",
                value: a.payday ?? "",
                onChange: c("payday"),
              }),
              l.jsx("span", {
                className: "mt-1 block text-[0.8rem] text-muted",
                children: n
                  ? `Leave empty to use the detected date (${ze(n.income.next_payday)})`
                  : " ",
              }),
            ],
          }),
        ],
      }),
      l.jsxs("div", {
        id: "goals",
        className: "grid scroll-mt-6 gap-4 sm:grid-cols-4",
        children: [
          l.jsxs("label", {
            className: "sm:col-span-1",
            children: [
              l.jsx("span", {
                className: "mb-1.5 block text-[0.9rem] font-medium",
                children: "Savings goal",
              }),
              l.jsx("input", {
                className: "field",
                value: a.goalName ?? "",
                onChange: c("goalName"),
                placeholder: "Emergency fund",
              }),
            ],
          }),
          l.jsxs("label", {
            children: [
              l.jsx("span", {
                className: "mb-1.5 block text-[0.9rem] font-medium",
                children: "Target",
              }),
              l.jsx("input", {
                className: "field num",
                inputMode: "decimal",
                value: a.goalTarget ?? "",
                onChange: c("goalTarget"),
              }),
            ],
          }),
          l.jsxs("label", {
            children: [
              l.jsx("span", {
                className: "mb-1.5 block text-[0.9rem] font-medium",
                children: "Saved so far",
              }),
              l.jsx("input", {
                className: "field num",
                inputMode: "decimal",
                value: a.goalSaved ?? "",
                onChange: c("goalSaved"),
              }),
            ],
          }),
          l.jsxs("label", {
            children: [
              l.jsx("span", {
                className: "mb-1.5 block text-[0.9rem] font-medium",
                children: "By",
              }),
              l.jsx("input", {
                className: "field",
                type: "date",
                value: a.goalDeadline ?? "",
                onChange: c("goalDeadline"),
              }),
            ],
          }),
        ],
      }),
      (i == null ? void 0 : i.enabled) &&
        l.jsxs("div", {
          className:
            "rounded-2xl border border-marigold/30 bg-marigold-soft/45 p-4 sm:flex sm:items-center sm:justify-between sm:gap-5",
          children: [
            l.jsxs("div", {
              className: "flex gap-3",
              children: [
                l.jsx(sg, {
                  className: "mt-0.5 shrink-0 text-marigold",
                  size: 20,
                }),
                l.jsxs("div", {
                  children: [
                    l.jsx("p", {
                      className: "font-semibold",
                      children: "Development conversation logging is on",
                    }),
                    l.jsx("p", {
                      className: "mt-1 text-[0.84rem] text-muted",
                      children:
                        "Logs can contain conversation and financial text from every local workspace. Archiving moves the complete active log to a timestamped file and starts a new one with the next message.",
                    }),
                    l.jsxs("p", {
                      className:
                        "num mt-1.5 break-all text-[0.76rem] text-faint",
                      children: ["Active file: ", i.active_path],
                    }),
                  ],
                }),
              ],
            }),
            l.jsxs("button", {
              className: "btn-ghost mt-3 shrink-0 sm:mt-0",
              onClick: h,
              disabled: o || !i.has_active_log,
              children: [
                o
                  ? l.jsx(zr, { size: 17, className: "animate-spin" })
                  : l.jsx(sg, { size: 17 }),
                i.has_active_log ? "Archive current log" : "No active log yet",
              ],
            }),
          ],
        }),
      l.jsx("button", {
        className: "btn-primary",
        onClick: f,
        children: "Save changes",
      }),
    ],
  });
}
function m5() {
  const e = lt(),
    { reset: t } = Pi(),
    { data: n } = Ge({ queryKey: ["accounts"], queryFn: de.accounts }),
    r = n == null ? void 0 : n.accounts.find((o) => o.id === n.active);
  w.useEffect(() => {
    var o;
    window.location.hash === "#upload" &&
      ((o = document.getElementById("upload")) == null ||
        o.scrollIntoView({ behavior: "smooth" }));
  }, []);
  const i = async () => {
    r &&
      (await de.deleteAccount(r.id),
      t(),
      await e.invalidateQueries(),
      We.success(
        r.kind === "demo"
          ? "Demo reset to its original data"
          : "Account deleted from this computer",
      ));
  };
  return l.jsxs("div", {
    className: "space-y-8",
    children: [
      l.jsxs("div", {
        children: [
          l.jsx("p", {
            className:
              "text-xs font-bold uppercase tracking-[0.14em] text-forest/75",
            children: "Your workspace",
          }),
          l.jsx("h1", {
            className: "mt-1 text-[2rem] font-bold leading-tight",
            children: "Settings & accounts",
          }),
          l.jsx("p", {
            className: "mt-1 max-w-2xl text-muted",
            children:
              "Review and update the information BudgetWise uses for your current workspace. Sample profiles are available separately under View example.",
          }),
        ],
      }),
      r &&
        l.jsx(Cr, {
          title: `Financial settings for ${r.name}`,
          aside: r.kind === "demo" ? "Example mode" : "Saved on this computer",
          children: l.jsx(h5, {}),
        }),
      l.jsxs("div", {
        className: "grid gap-6 lg:grid-cols-[1fr_1.6fr]",
        children: [
          l.jsx(Cr, {
            title: "Add details in your own words",
            children: l.jsxs("div", {
              className: "flex h-full flex-col",
              children: [
                l.jsx(T1, { className: "text-forest" }),
                l.jsx("p", {
                  className: "mt-2 flex-1 text-[0.93rem] text-muted",
                  children:
                    "Add or correct income, bills, balances, and goals conversationally. Every question is optional.",
                }),
                l.jsxs(It, {
                  to: "/",
                  className: "btn-primary mt-4 self-start",
                  children: [
                    "Continue with BudgetWise ",
                    l.jsx(Bl, { size: 17 }),
                  ],
                }),
              ],
            }),
          }),
          l.jsx("div", {
            id: "upload",
            className: "scroll-mt-24",
            children: l.jsx(Cr, {
              title: "Use your bank's CSV",
              children: l.jsx(p5, {}),
            }),
          }),
        ],
      }),
      r &&
        l.jsxs(Cr, {
          title: "Workspace data controls",
          aside: "This action cannot be undone",
          children: [
            l.jsx("p", {
              className: "mb-3 max-w-2xl text-sm text-muted",
              children:
                "Your conversation can be cleared separately without removing saved financial records. Deleting this workspace removes its saved settings and activity from this computer.",
            }),
            l.jsxs("button", {
              onClick: i,
              className: "btn-ghost text-berry hover:text-berry",
              children: [
                l.jsx(L1, { size: 16 }),
                " ",
                r.kind === "demo"
                  ? `Reset ${r.name}'s demo`
                  : `Delete ${r.name} from this computer`,
              ],
            }),
          ],
        }),
    ],
  });
}
function g5() {
  const e = lt(),
    t = Jn(),
    { reset: n } = Pi(),
    { data: r } = Ge({ queryKey: ["accounts"], queryFn: de.accounts }),
    i = async (o) => {
      (await de.setActive(o),
        n(!1),
        await e.invalidateQueries(),
        We.success(
          "Example opened. Your personal information remains separate.",
        ),
        t("/"));
    };
  return l.jsxs("div", {
    className: "space-y-6",
    children: [
      l.jsxs("header", {
        children: [
          l.jsx("p", {
            className:
              "text-xs font-bold uppercase tracking-[0.14em] text-forest/75",
            children: "Sample data only",
          }),
          l.jsx("h1", {
            className: "mt-1 text-[2rem] font-bold leading-tight",
            children: "Example profiles",
          }),
          l.jsx("p", {
            className: "mt-1 max-w-3xl text-muted",
            children:
              "Explore a filled-in BudgetWise workspace without changing or mixing it with your information. A banner will clearly identify example mode.",
          }),
        ],
      }),
      l.jsx(Cr, {
        title: "Choose a financial situation to explore",
        aside: "Separate from your workspace",
        children: l.jsx("div", {
          className: "grid gap-4 md:grid-cols-3",
          children:
            r == null
              ? void 0
              : r.personas.map((o) => {
                  const s = `demo-${o.id}`,
                    a = r.active === s;
                  return l.jsxs(
                    "article",
                    {
                      className: ke(
                        "flex flex-col rounded-2xl border p-5",
                        a
                          ? "border-forest/50 bg-forest-soft/40"
                          : "border-line",
                      ),
                      children: [
                        l.jsxs("div", {
                          className: "flex items-center gap-3",
                          children: [
                            l.jsx("span", {
                              className:
                                "grid h-12 w-12 place-items-center rounded-full bg-sunken text-2xl",
                              children: o.emoji,
                            }),
                            l.jsxs("div", {
                              children: [
                                l.jsx("h2", {
                                  className:
                                    "font-display text-lg font-bold leading-tight",
                                  children: o.name,
                                }),
                                l.jsx("p", {
                                  className: "text-sm text-muted",
                                  children: o.tagline,
                                }),
                              ],
                            }),
                          ],
                        }),
                        l.jsx("p", {
                          className:
                            "mt-4 flex-1 text-[0.93rem] leading-relaxed text-muted",
                          children: o.description,
                        }),
                        l.jsx("button", {
                          onClick: () => void i(s),
                          disabled: a,
                          className: ke(
                            "mt-5",
                            a ? "btn-quiet" : "btn-primary",
                          ),
                          children: a
                            ? l.jsxs(l.Fragment, {
                                children: [
                                  l.jsx(Jt, { size: 17 }),
                                  " Viewing example",
                                ],
                              })
                            : `View ${o.name}'s example`,
                        }),
                      ],
                    },
                    o.id,
                  );
                }),
        }),
      }),
    ],
  });
}
const On = [
  {
    q: "How much money is in your checking account right now?",
    ex: "About $410",
    hint: "Setup question: the user's current account balance",
  },
  {
    q: "How do you get paid?",
    ex: "Every 2 weeks, around $600 but it changes. Next payday is Friday.",
    hint: "Setup question: the user's pay schedule (how often, about how much, next payday)",
  },
  {
    q: "What bills do you pay?",
    ex: "Rent $725 on the 1st, phone $45 on the 12th, Spotify $11.99 on the 20th",
    hint: "Setup question: list of recurring bills; save each one with set_bill",
  },
  {
    q: "About how much do you spend on everyday things in a normal week?",
    ex: "Food, gas, going out. Maybe $150",
    hint: "Setup question: typical weekly everyday spending; use set_typical_weekly_spending",
  },
  {
    q: "Are you saving for anything?",
    ex: "A laptop, $1,200 by March. I have $200 so far.",
    hint: "Setup question: a savings goal (optional)",
  },
];
function y5() {
  const e = Jn(),
    t = lt(),
    [n] = Bv(),
    { reset: r } = Pi(),
    { data: i } = Ge({ queryKey: ["accounts"], queryFn: de.accounts }),
    o = i == null ? void 0 : i.accounts.find((P) => P.id === i.active),
    s = n.get("new") === "1" || (o == null ? void 0 : o.kind) === "demo",
    [a, u] = w.useState("My money"),
    [c, d] = w.useState(!1),
    [f, h] = w.useState(0),
    [p, v] = w.useState([]),
    [g, b] = w.useState(""),
    [m, x] = w.useState(!1),
    y = w.useRef(null);
  w.useEffect(() => {
    var P;
    (P = y.current) == null ||
      P.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [p, f]);
  const k = async () => {
      (await de.newAccount(a.trim() || "My money"),
        r(),
        await t.invalidateQueries(),
        d(!0));
    },
    N = async () => {
      const P = g.trim();
      if (!P || m) return;
      x(!0);
      const T = await Jw(P, { contextHint: On[f].hint });
      (x(!1),
        v((I) => [...I, { step: f, answer: P, result: T }]),
        b(""),
        T.saved && h((I) => I + 1),
        await t.invalidateQueries());
    },
    C = () => h((P) => P + 1),
    j = f >= On.length;
  return s && !c
    ? l.jsxs("div", {
        className: "mx-auto max-w-xl space-y-6 pt-4",
        children: [
          l.jsx(Zd, {}),
          l.jsxs("div", {
            children: [
              l.jsx("h1", {
                className: "text-[2rem] font-bold leading-tight",
                children: "Start without a bank file",
              }),
              l.jsx("p", {
                className: "mt-2 text-muted",
                children:
                  "Answer a few optional questions in your own words. Skip anything, add it later, or use a bank CSV whenever you're ready.",
              }),
            ],
          }),
          l.jsxs("label", {
            className: "block",
            children: [
              l.jsx("span", {
                className: "mb-1.5 block font-medium",
                children: "What should we call this account?",
              }),
              l.jsx("input", {
                className: "field",
                value: a,
                onChange: (P) => u(P.target.value),
                maxLength: 40,
                autoFocus: !0,
              }),
            ],
          }),
          l.jsxs("button", {
            onClick: k,
            className: "btn-primary",
            children: ["Start setup ", l.jsx(Bl, { size: 18 })],
          }),
        ],
      })
    : l.jsxs("div", {
        className:
          "mx-auto flex min-h-[calc(100vh-11rem)] max-w-2xl flex-col lg:min-h-[calc(100vh-5rem)]",
        children: [
          l.jsxs("div", {
            children: [
              l.jsxs("h1", {
                className: "text-[1.9rem] font-bold leading-tight",
                children: [
                  "Set up ",
                  (o == null ? void 0 : o.name) ?? "your account",
                ],
              }),
              l.jsx("div", {
                className: "mt-3 flex gap-1.5",
                "aria-label": `Question ${Math.min(f + 1, On.length)} of ${On.length}`,
                children: On.map((P, T) =>
                  l.jsx(
                    "span",
                    {
                      className: ke(
                        "h-1.5 flex-1 rounded-full",
                        T < f
                          ? "bg-forest"
                          : T === f
                            ? "bg-forest/40"
                            : "bg-sunken",
                      ),
                    },
                    T,
                  ),
                ),
              }),
            ],
          }),
          l.jsxs("div", {
            className: "flex-1 space-y-6 py-8",
            children: [
              p.map((P, T) =>
                l.jsxs(
                  "div",
                  {
                    className: "space-y-3",
                    children: [
                      l.jsx("p", {
                        className: "font-display text-[1.1rem] font-bold",
                        children: On[P.step].q,
                      }),
                      l.jsx("div", {
                        className: "flex justify-end",
                        children: l.jsx("p", {
                          className:
                            "max-w-[85%] rounded-2xl rounded-br-md bg-forest px-4 py-2.5 text-white dark:text-canvas",
                          children: P.answer,
                        }),
                      }),
                      P.result.text &&
                        l.jsx("p", {
                          className: "num text-muted",
                          children: P.result.text.replace(/\*\*/g, ""),
                        }),
                      P.result.saved &&
                        l.jsx(Zw, { s: P.result.saved, compact: !0 }),
                    ],
                  },
                  T,
                ),
              ),
              j
                ? l.jsxs("div", {
                    className:
                      "rounded-3xl border border-forest/30 bg-forest-soft/40 p-6 animate-rise",
                    children: [
                      l.jsxs("p", {
                        className:
                          "flex items-center gap-2 font-display text-[1.3rem] font-bold",
                        children: [
                          l.jsx(Jt, { className: "text-forest" }),
                          " You're ready",
                        ],
                      }),
                      l.jsx("p", {
                        className: "mt-2 text-muted",
                        children:
                          "Keep adding things whenever they happen—or later. For example: “Yesterday I spent about $40 on gas and groceries.”",
                      }),
                      l.jsxs("button", {
                        onClick: () => e("/"),
                        className: "btn-primary mt-4",
                        children: [
                          "See what's safe to spend ",
                          l.jsx(Bl, { size: 18 }),
                        ],
                      }),
                    ],
                  })
                : l.jsxs(
                    "div",
                    {
                      className: "space-y-3 animate-rise",
                      children: [
                        !p.some((P) => P.step === f) &&
                          l.jsx("p", {
                            className: "font-display text-[1.25rem] font-bold",
                            children: On[f].q,
                          }),
                        l.jsxs("p", {
                          className: "text-[0.9rem] text-muted",
                          children: ["For example: “", On[f].ex, "”"],
                        }),
                      ],
                    },
                    f,
                  ),
              l.jsx("div", { ref: y }),
            ],
          }),
          !j &&
            l.jsx("form", {
              onSubmit: (P) => {
                (P.preventDefault(), N());
              },
              className:
                "sticky bottom-20 z-10 rounded-2xl border border-line bg-surface p-2 shadow-lift lg:bottom-6",
              children: l.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  l.jsx("input", {
                    value: g,
                    onChange: (P) => b(P.target.value),
                    placeholder: "Type your answer…",
                    autoFocus: !0,
                    className:
                      "h-11 flex-1 bg-transparent px-3 text-[1rem] outline-none placeholder:text-faint",
                    "aria-label": "Your answer",
                  }),
                  l.jsx("button", {
                    type: "button",
                    onClick: C,
                    className: "btn-ghost px-3 text-[0.9rem]",
                    children: f === On.length - 1 ? "No, I'm done" : "Skip",
                  }),
                  l.jsx("button", {
                    type: "submit",
                    disabled: m || !g.trim(),
                    className: "btn-primary h-11 px-4",
                    children: m
                      ? l.jsx(zr, { size: 18, className: "animate-spin" })
                      : "Save",
                  }),
                ],
              }),
            }),
        ],
      });
}
function x5() {
  return l.jsx(A_, {
    children: l.jsx(v2, {
      children: l.jsxs(nn, {
        element: l.jsx(xR, {}),
        children: [
          l.jsx(nn, { index: !0, element: l.jsx(iy, {}) }),
          l.jsx(nn, { path: "spending", element: l.jsx(o5, {}) }),
          l.jsx(nn, { path: "plan", element: l.jsx(f5, {}) }),
          l.jsx(nn, {
            path: "goals",
            element: l.jsx(km, { to: "/plan", replace: !0 }),
          }),
          l.jsx(nn, {
            path: "ask",
            element: l.jsx(km, { to: "/", replace: !0 }),
          }),
          l.jsx(nn, { path: "accounts", element: l.jsx(m5, {}) }),
          l.jsx(nn, { path: "examples", element: l.jsx(g5, {}) }),
          l.jsx(nn, { path: "setup", element: l.jsx(y5, {}) }),
          l.jsx(nn, { path: "*", element: l.jsx(iy, {}) }),
        ],
      }),
    }),
  });
}
const v5 = new G2({
  defaultOptions: {
    queries: { staleTime: 3e4, refetchOnWindowFocus: !1, retry: 1 },
  },
});
Tc.createRoot(document.getElementById("root")).render(
  l.jsx(B.StrictMode, {
    children: l.jsx(J2, {
      client: v5,
      children: l.jsxs(P2, {
        children: [
          l.jsx(x5, {}),
          l.jsx(OC, {
            position: "bottom-center",
            richColors: !0,
            closeButton: !0,
          }),
        ],
      }),
    }),
  }),
);
