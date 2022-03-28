import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as testActions from "../store/actions/test";

function HomePage() {
  const {
    tests_loading: loading,
    tests_error: error,
    tests,
  } = useSelector((state) => state.tests);

  const dispatch = useDispatch();

  const loadTests = useCallback(async () => {
    await dispatch(testActions.setTests());
  }, [dispatch]);

  useEffect(() => {
    loadTests();
  }, [loadTests]);

  if (loading) return <div>loading...</div>;

  if (error.is_occured) return <div>{error.msg}</div>;

  if (tests) {
    return (
      <div>
        {tests.map((item) => {
          const { id, title } = item;
          return (
            <div key={id}>
              <h3>{title}</h3>
            </div>
          );
        })}
      </div>
    );
  }
}

export default HomePage;
