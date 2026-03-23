/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CarDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [car, setCar] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [added, setAdded] = useState(false);

  /* ================= REVIEW FORM ================= */
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  /* ================= FETCH CAR ================= */
  const fetchCar = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/inventory/public/${id}`
      );

      if (!res.ok) throw new Error("Car not found");

      const data = await res.json();
      setCar(data);
    } catch (err) {
      console.log("Car fetch error:", err);
      setCar(null);
    }
  };

  /* ================= FETCH REVIEWS ================= */
  const fetchReviews = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/review/${id}`
      );

      if (!res.ok) return;

      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.log("Review fetch error:", err);
    }
  };

  /* ================= INIT ================= */
  useEffect(() => {
    const init = async () => {
      await fetchCar();
      await fetchReviews();
      setLoading(false);
    };

    if (id) init();
  }, [id]);

  /* ================= ADD TO CART ================= */
  const addToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login first");
      return;
    }

    if (added) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            carId: car._id,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Already in cart");
        return;
      }

      setAdded(true);

      window.dispatchEvent(new Event("cartUpdated"));

      setTimeout(() => {
        router.push("/cart");
      }, 700);
    } catch (err) {
      console.log(err);
      alert("Add to cart failed");
    }
  };

  /* ================= SUBMIT REVIEW ================= */
  const submitReview = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login first");
      return;
    }

    if (!comment.trim()) {
      alert("Write comment");
      return;
    }

    try {
      setReviewLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            carId: id,
            rating,
            comment,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Review failed");
        return;
      }

      setComment("");
      setRating(5);

      await fetchCar();
      await fetchReviews();
    } catch (err) {
      console.log("Review submit error:", err);
    } finally {
      setReviewLoading(false);
    }
  };

  /* ================= STAR RENDER ================= */
  const renderStars = (value: number) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={
          i < value ? "text-yellow-400 text-xl" : "text-purple-200 text-xl"
        }
      >
        ★
      </span>
    ));
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl bg-gradient-to-br from-indigo-100 via-purple-100 to-fuchsia-100">
        Loading car...
      </div>
    );
  }

  if (!car) {
    return <div className="p-10">Car not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-fuchsia-100 p-6">

      {/* ✅ SINGLE MAIN CONTAINER */}
      <div
        className="
        max-w-6xl mx-auto
        bg-gradient-to-br from-indigo-100/70 via-purple-100/70 to-fuchsia-100/70
        backdrop-blur-xl
        border border-white/40
        rounded-2xl shadow-xl
        p-6 md:p-10
      "
      >

        {/* ================= TOP ================= */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* IMAGE */}
          <div className="flex justify-center">
           <img
  src={car.image?.startsWith("http") 
    ? car.image 
    : `${process.env.NEXT_PUBLIC_API_URL}${car.image}`}
              className="w-full max-h-96 object-contain"
              alt={car.name}
            />
          </div>

          {/* DETAILS */}
          <div>

            <h1 className="text-4xl font-bold text-indigo-900">
              {car.name}
            </h1>

            <p className="text-purple-700 mt-1">
              {car.brand} • {car.model}
            </p>

            {/* ⭐ STAR RATING */}
            <div className="flex items-center gap-2 mt-2">

              {renderStars(
                Math.round(Number(car.rating) || 0)
              )}

              <span className="text-sm font-semibold text-indigo-800">
                {Number(car.rating || 0).toFixed(1)}
              </span>

              <span className="text-purple-700 text-sm">
                ({reviews.length} reviews)
              </span>

            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-indigo-900">

              <p><b>Fuel:</b> {car.fuel}</p>
              <p><b>Gear:</b> {car.gear}</p>
              <p><b>Class:</b> {car.class || "SUV"}</p>

              <p>
                <b>Price:</b>{" "}
                <span className="text-fuchsia-700 font-bold">
                  ₹{car.price}/day
                </span>
              </p>

            </div>

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="mt-4 md:hidden text-purple-700 underline"
            >
              {showDetails ? "Hide details" : "See all details"}
            </button>

          </div>
        </div>

        {/* ================= ABOUT + FEATURES ================= */}
        <div className={`mt-10 ${showDetails ? "block" : "hidden"} md:block`}>

          <h2 className="text-2xl font-bold mb-3 text-indigo-900">
            About this car
          </h2>

          <p className="text-purple-900 leading-relaxed mb-6">
            {car.about ||
              `${car.name} is a premium and comfortable car.`}
          </p>

          <h3 className="text-lg font-semibold mb-3 text-indigo-900">
            Key Features
          </h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">

            {(car.features?.length
              ? car.features
              : [
                  "Air Conditioning",
                  "Power Steering",
                  "Music System",
                  "ABS & Airbags",
                  "Comfort Seats",
                  "4x4 Drive",
                  "360° Camera",
                  "JBL Speaker",
                ]
            ).map((f: string) => (

              <div
                key={f}
                className="bg-gradient-to-r from-indigo-100 to-purple-100
                text-indigo-800 px-4 py-2 rounded-xl text-sm font-medium shadow"
              >
                ✔ {f}
              </div>

            ))}

          </div>
        </div>

        {/* ================= REVIEWS ================= */}
        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-4 text-indigo-900">
            Customer Reviews
          </h2>

          {/* ADD REVIEW */}
          <div className="bg-white/50 backdrop-blur p-4 rounded-xl mb-6 border border-white/40">

            <h3 className="font-semibold mb-2 text-purple-800">
              Write Review
            </h3>

            {/* ⭐ STAR INPUT */}
            <div className="flex gap-1 mb-2 cursor-pointer">
              {[1,2,3,4,5].map(n => (
                <span
                  key={n}
                  onClick={() => setRating(n)}
                  className={
                    n <= rating
                      ? "text-yellow-400 text-2xl"
                      : "text-purple-200 text-2xl"
                  }
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className="w-full bg-white/60 border border-white/40 rounded p-2 mb-2"
              rows={3}
            />

            <button
              onClick={submitReview}
              disabled={reviewLoading}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded shadow"
            >
              {reviewLoading ? "Posting..." : "Submit Review"}
            </button>

          </div>

          {/* REVIEW LIST */}
          <div className="space-y-4">

            {reviews.length === 0 && (
              <p className="text-purple-700">
                No reviews yet
              </p>
            )}

            {reviews.map((r) => (

              <div
                key={r._id}
                className="border rounded-xl p-4 bg-white/60 backdrop-blur shadow-sm"
              >

                <div className="flex justify-between mb-1">

                  <b className="text-indigo-900">
                    {r.user?.name || "User"}
                  </b>

                  <div>
                    {renderStars(r.rating)}
                  </div>

                </div>

                <p className="text-purple-900 text-sm">
                  {r.comment}
                </p>

                <p className="text-xs text-indigo-500 mt-1">
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-end">

          <button
            onClick={addToCart}
            disabled={added}
            className={`px-8 py-3 rounded-2xl font-semibold w-full md:w-auto
            ${
              added
                ? "bg-green-600 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-700 to-purple-700 text-white"
            }`}
          >
            {added ? "Added to Cart ✓" : "Add to Cart"}
          </button>

          <button
            onClick={() => router.push(`/dashboard/${car._id}/book`)}
            className="bg-gradient-to-r from-purple-700 to-fuchsia-700
            text-white px-10 py-3 rounded-2xl font-semibold shadow-lg w-full md:w-auto"
          >
            Book this car
          </button>

        </div>

      </div>
    </div>
  );
}